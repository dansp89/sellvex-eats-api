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
  }
}));
