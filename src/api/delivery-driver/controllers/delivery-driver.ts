import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::delivery-driver.delivery-driver', ({ strapi }) => ({
  // Handler para buscar todos os entregadores públicos
  async findPublic(ctx) {
    try {
      const result = await strapi.service('api::delivery-driver.delivery-driver').findPublic(ctx.query);
      return ctx.send(result);
    } catch (error) {
      return ctx.badRequest('Erro ao buscar entregadores', { error: error.message });
    }
  },

  // Handler para buscar um entregador específico
  async findOnePublic(ctx) {
    try {
      const { documentId } = ctx.params;
      const result = await strapi.service('api::delivery-driver.delivery-driver').findOnePublic(documentId);
      
      if (!result) {
        return ctx.notFound('Entregador não encontrado');
      }
      
      return ctx.send(result);
    } catch (error) {
      return ctx.badRequest('Erro ao buscar entregador', { error: error.message });
    }
  },

  // Handler para buscar perfil do entregador autenticado
  async findProfile(ctx) {
    try {
      if (!ctx.state.user) {
        return ctx.unauthorized('Token de autenticação necessário');
      }

      const result = await strapi.service('api::delivery-driver.delivery-driver').findProfile(ctx.state.user.id);
      
      if (!result) {
        return ctx.notFound('Perfil de entregador não encontrado');
      }
      
      return ctx.send(result);
    } catch (error) {
      return ctx.badRequest('Erro ao buscar perfil', { error: error.message });
    }
  },

  // Handler para buscar pedidos disponíveis para entrega
  async findAvailableOrders(ctx) {
    try {
      if (!ctx.state.user) {
        return ctx.unauthorized('Token de autenticação necessário');
      }

      const result = await strapi.service('api::delivery-driver.delivery-driver').findAvailableOrders(ctx.query);
      return ctx.send(result);
    } catch (error) {
      return ctx.badRequest('Erro ao buscar pedidos disponíveis', { error: error.message });
    }
  },

  // Handler para buscar entregas do entregador autenticado
  async findMyDeliveries(ctx) {
    try {
      if (!ctx.state.user) {
        return ctx.unauthorized('Token de autenticação necessário');
      }

      const result = await strapi.service('api::delivery-driver.delivery-driver').findMyDeliveries(ctx.state.user.id, ctx.query);
      return ctx.send(result);
    } catch (error) {
      return ctx.badRequest('Erro ao buscar entregas', { error: error.message });
    }
  }
}));
