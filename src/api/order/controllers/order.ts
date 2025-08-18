import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::order.order', ({ strapi }) => ({
  // Handler para buscar todos os pedidos públicos
  async findPublic(ctx) {
    try {
      const result = await strapi.service('api::order.order').findPublic(ctx.query);
      return ctx.send(result);
    } catch (error) {
      return ctx.badRequest('Erro ao buscar pedidos', { error: error.message });
    }
  },

  // Handler para buscar um pedido específico
  async findOnePublic(ctx) {
    try {
      const { documentId } = ctx.params;
      const result = await strapi.service('api::order.order').findOnePublic(documentId);
      
      if (!result) {
        return ctx.notFound('Pedido não encontrado');
      }
      
      return ctx.send(result);
    } catch (error) {
      return ctx.badRequest('Erro ao buscar pedido', { error: error.message });
    }
  },

  // Handler para buscar detalhes do pedido para cliente
  async findOrderForUser(ctx) {
    try {
      if (!ctx.state.user) {
        return ctx.unauthorized('Token de autenticação necessário');
      }

      const { id } = ctx.params;
      const result = await strapi.service('api::order.order').findOrderForUser(parseInt(id), ctx.state.user.id);
      
      if (!result) {
        return ctx.notFound('Pedido não encontrado ou você não tem acesso a ele');
      }
      
      return ctx.send(result);
    } catch (error) {
      return ctx.badRequest('Erro ao buscar pedido', { error: error.message });
    }
  },

  // Handler para buscar detalhes do pedido para entregador
  async findOrderForDriver(ctx) {
    try {
      if (!ctx.state.user) {
        return ctx.unauthorized('Token de autenticação necessário');
      }

      const { id } = ctx.params;
      const result = await strapi.service('api::order.order').findOrderForDriver(parseInt(id), ctx.state.user.id);
      
      if (!result) {
        return ctx.notFound('Pedido não encontrado ou você não tem acesso a ele');
      }
      
      return ctx.send(result);
    } catch (error) {
      return ctx.badRequest('Erro ao buscar pedido', { error: error.message });
    }
  },

  // Handler para atualizar status do pedido pelo entregador
  async updateOrderStatus(ctx) {
    try {
      if (!ctx.state.user) {
        return ctx.unauthorized('Token de autenticação necessário');
      }

      const { id } = ctx.params;
      const { status } = ctx.request.body;

      if (!status) {
        return ctx.badRequest('Status é obrigatório');
      }

      const result = await strapi.service('api::order.order').updateOrderStatus(parseInt(id), ctx.state.user.id, status);
      
      if (!result) {
        return ctx.notFound('Pedido não encontrado ou você não tem acesso a ele');
      }
      
      return ctx.send(result);
    } catch (error) {
      return ctx.badRequest('Erro ao atualizar status do pedido', { error: error.message });
    }
  },

  // Handler para aceitar pedido pelo entregador
  async acceptOrder(ctx) {
    try {
      if (!ctx.state.user) {
        return ctx.unauthorized('Token de autenticação necessário');
      }

      const { id } = ctx.params;
      const result = await strapi.service('api::order.order').acceptOrder(parseInt(id), ctx.state.user.id);
      
      if (!result) {
        return ctx.notFound('Pedido não encontrado ou não está disponível para aceitar');
      }
      
      return ctx.send(result);
    } catch (error) {
      return ctx.badRequest('Erro ao aceitar pedido', { error: error.message });
    }
  },

  // Handler para rastrear pedido pelo número (público)
  async trackOrder(ctx) {
    try {
      const { trackingNumber } = ctx.params;
      const result = await strapi.service('api::order.order').trackOrder(trackingNumber);
      
      if (!result) {
        return ctx.notFound('Pedido não encontrado');
      }
      
      return ctx.send(result);
    } catch (error) {
      return ctx.badRequest('Erro ao rastrear pedido', { error: error.message });
    }
  }
}));
