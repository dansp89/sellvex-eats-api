import { factories } from '@strapi/strapi';

export default factories.createCoreController('plugin::users-permissions.user', ({ strapi }) => ({
  // Handler para buscar perfil do usuário autenticado (migrado de user)
  async findProfile(ctx) {
    try {
      if (!ctx.state.user) {
        return ctx.unauthorized('Token de autenticação necessário');
      }

      const result = await strapi.service('plugin::users-permissions.user').findProfile(ctx.state.user.id);

      if (!result) {
        return ctx.notFound('Perfil de usuário não encontrado');
      }

      return ctx.send(result);
    } catch (error) {
      return ctx.badRequest('Erro ao buscar perfil', { error: error.message });
    }
  },

  // Handler para buscar pedidos do usuário autenticado (migrado de user)
  async findOrders(ctx) {
    try {
      if (!ctx.state.user) {
        return ctx.unauthorized('Token de autenticação necessário');
      }

      const result = await strapi.service('plugin::users-permissions.user').findOrders(ctx.state.user.id, ctx.query);
      return ctx.send(result);
    } catch (error) {
      return ctx.badRequest('Erro ao buscar pedidos', { error: error.message });
    }
  },

  /**
   * Método para verificar se o usuário está autenticado
   * @param ctx 
   * @returns 
   */
  async isLoggedIn(ctx) {
    const { user } = ctx.state;
    try {
      if (!user) {
        return ctx.send({ authenticated: false, documentId: null, role: null });
      }

      return ctx.send({ authenticated: true, documentId: user?.documentId, role: user?.role?.type });
    } catch (error) {
      console.error('Erro ao verificar autenticação', { error: error.message });
      return ctx.send({ authenticated: false, documentId: null, role: null });
    }
  },

  /**
   * Método genérico para verificar se um valor já existe em um campo
   * @param ctx - Contexto da requisição
   * @param field - Nome do campo a ser verificado (email, cpf, phone, username)
   * @returns {Promise<Object>} Resultado da busca
   */
  async checkFieldExists(ctx) {
    const { field, value } = ctx.params;
    const validFields = ['email', 'cpf', 'phone', 'username'];
    const { user } = ctx.state;

    if (!validFields.includes(field)) {
      return ctx.badRequest('Campo inválido', { 
        error: `O campo deve ser um dos seguintes: ${validFields.join(', ')}` 
      });
    }

    // Clean and validate the input value based on field type
    let cleanedValue = value?.toString().trim() || '';
    
    try {
      switch (field) {
        case 'username':
          // Remove special characters, keep only letters, numbers, dots, underscores and hyphens
          cleanedValue = cleanedValue.replace(/[^\w.-]/g, '').toLowerCase();
          // Ensure username starts with a letter
          if (!/^[a-z]/.test(cleanedValue)) {
            return ctx.badRequest('O nome de usuário deve começar com uma letra');
          }
          break;
          
        case 'email':
          // Basic email cleaning - remove spaces and convert to lowercase
          cleanedValue = cleanedValue.replace(/\s+/g, '').toLowerCase();
          // Simple email format validation
          if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanedValue)) {
            return ctx.badRequest('Formato de e-mail inválido');
          }
          break;
          
        case 'cpf':
          // Keep only numbers
          cleanedValue = cleanedValue.replace(/\D/g, '');
          // Validate CPF length
          if (cleanedValue.length !== 11) {
            return ctx.badRequest('CPF deve conter 11 dígitos');
          }
          break;
          
        case 'phone':
          // Keep only numbers
          cleanedValue = cleanedValue.replace(/\D/g, '');
          // Validate phone length (10 or 11 digits)
          if (cleanedValue.length !== 10 && cleanedValue.length !== 11) {
            return ctx.badRequest('Telefone deve conter 10 ou 11 dígitos');
          }
          break;
      }
      
      if (!cleanedValue) {
        return ctx.badRequest('Valor inválido após limpeza');
      }
      
      // Update the value in the request with the cleaned value
      ctx.params.value = cleanedValue;
      
      const result = await strapi.db.connection.raw(
        `SELECT id, document_id, ?? FROM up_users WHERE ?? = ?`, 
        [field, field, cleanedValue]
      );

      console.log("checkFieldExists:result", result);
      const loggedin = user?.id ? true : false;
      const resultData = {  
        exists: result.rows.length > 0,
        type: field,
        value: cleanedValue,
        isLogged: loggedin,
        isMe: user?.id === result.rows?.find((row) => row.id === user?.id)?.id  && loggedin
      };

      console.log("checkFieldExists:resultData", resultData);
      return ctx.send(resultData);
    } catch (error) {
      return ctx.badRequest(`Erro ao verificar ${field}`, { 
        error: error.message 
      });
    }
  },
}));
