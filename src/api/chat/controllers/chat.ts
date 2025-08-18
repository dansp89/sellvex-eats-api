import { factories } from '@strapi/strapi';
import { QueryType } from '~types/app';

export default factories.createCoreController('api::chat.chat', ({ strapi }) => ({
  // Enviar mensagem
  async sendMessage(ctx) {
    try {
      if (!ctx.state.user) {
        return ctx.unauthorized('Token de autenticação necessário');
      }

      const { message, receiverId, orderId, attachments } = ctx.request.body;
      
      if (!message || !receiverId) {
        return ctx.badRequest('Mensagem e destinatário são obrigatórios');
      }

      const result = await strapi.service('api::chat.chat').sendMessage({
        senderId: ctx.state.user.id,
        receiverId,
        orderId,
        message,
        attachments
      });

      return ctx.send(result);
    } catch (error) {
      return ctx.badRequest('Erro ao enviar mensagem', { error: error.message });
    }
  },

  // Buscar conversa
  async getConversation(ctx) {
    try {
      if (!ctx.state.user) {
        return ctx.unauthorized('Token de autenticação necessário');
      }

      const { userId, orderId } = ctx.params;
      const { page = '1', pageSize = '20' } = ctx.query as QueryType;

      const result = await strapi.service('api::chat.chat').getConversation({
        currentUserId: ctx.state.user.id,
        otherUserId: userId,
        orderId,
        page: parseInt(page),
        pageSize: parseInt(pageSize)
      });

      return ctx.send(result);
    } catch (error) {
      return ctx.badRequest('Erro ao buscar conversa', { error: error.message });
    }
  },

  // Marcar mensagens como lidas
  async markAsRead(ctx) {
    try {
      if (!ctx.state.user) {
        return ctx.unauthorized('Token de autenticação necessário');
      }

      const { messageIds } = ctx.request.body;
      
      if (!messageIds || !Array.isArray(messageIds)) {
        return ctx.badRequest('IDs das mensagens são obrigatórios');
      }

      const result = await strapi.service('api::chat.chat').markAsRead({
        userId: ctx.state.user.id,
        messageIds
      });

      return ctx.send({ success: result });
    } catch (error) {
      return ctx.badRequest('Erro ao marcar mensagens como lidas', { error: error.message });
    }
  },

  // Buscar conversas recentes
  async getRecentConversations(ctx) {
    try {
      if (!ctx.state.user) {
        return ctx.unauthorized('Token de autenticação necessário');
      }

      const { page = '1', pageSize = '10' } = ctx.query as QueryType;

      const result = await strapi.service('api::chat.chat').getRecentConversations({
        userId: ctx.state.user.id,
        page: parseInt(page),
        pageSize: parseInt(pageSize)
      });

      return ctx.send(result);
    } catch (error) {
      return ctx.badRequest('Erro ao buscar conversas recentes', { error: error.message });
    }
  }
}));
