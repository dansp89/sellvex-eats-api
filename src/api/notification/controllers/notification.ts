import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::notification.notification', ({ strapi }) => ({
  // Handler para buscar notificações do usuário autenticado
  async findUserNotifications(ctx) {
    try {
      if (!ctx.state.user) {
        return ctx.unauthorized('Token de autenticação necessário');
      }

      const result = await strapi.service('api::notification.notification').findUserNotifications(ctx.state.user.id, ctx.query);
      return ctx.send(result);
    } catch (error) {
      return ctx.badRequest('Erro ao buscar notificações', { error: error.message });
    }
  },

  // Handler para marcar notificação como lida
  async markAsRead(ctx) {
    try {
      if (!ctx.state.user) {
        return ctx.unauthorized('Token de autenticação necessário');
      }

      const { id } = ctx.params;
      const result = await strapi.service('api::notification.notification').markAsRead(parseInt(id), ctx.state.user.id);
      
      if (!result) {
        return ctx.notFound('Notificação não encontrada ou você não tem acesso a ela');
      }
      
      return ctx.send(result);
    } catch (error) {
      return ctx.badRequest('Erro ao marcar notificação como lida', { error: error.message });
    }
  }
}));
