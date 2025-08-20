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
   * Método para deslogar o usuário destruindo o token do banco de dados
   * @param ctx 
   * @returns 
   */
  async logout(ctx) {
    try {
      // Get the token from Authorization header
      const token = ctx.request.header.authorization?.replace('Bearer ', '');
      
      // Clear the JWT cookie
      ctx.cookies.set('jwt', null, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        maxAge: 0, // Expire immediately
        sameSite: 'strict'
      });

      // Clear the Authorization header
      delete ctx.request.header.authorization;
      
      // Invalidate the token (if you have a token blacklist system)
      // await strapi.service('plugin::users-permissions.jwt').addToBlacklist(token);
      
      return { 
        success: true,
        message: 'Successfully logged out',
        authenticated: false,
        documentId: null,
        role: null 
      };
      
    } catch (error) {
      console.error('Erro ao deslogar', error);
      return ctx.badRequest('Failed to logout', { 
        success: false,
        message: error.message,
        authenticated: false, 
        documentId: null, 
        role: null 
      });
    }
  }
}));
