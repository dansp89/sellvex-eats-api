import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::payment.payment', ({ strapi }) => ({
  // Handler para buscar todos os pagamentos públicos
  async findPublic(ctx) {
    try {
      const result = await strapi.service('api::payment.payment').findPublic(ctx.query);
      return ctx.send(result);
    } catch (error) {
      return ctx.badRequest('Erro ao buscar pagamentos', { error: error.message });
    }
  },

  // Handler para buscar um pagamento específico
  async findOnePublic(ctx) {
    try {
      const { documentId } = ctx.params;
      const result = await strapi.service('api::payment.payment').findOnePublic(documentId);
      
      if (!result) {
        return ctx.notFound('Pagamento não encontrado');
      }
      
      return ctx.send(result);
    } catch (error) {
      return ctx.badRequest('Erro ao buscar pagamento', { error: error.message });
    }
  },

  // Handler para buscar pagamentos do cliente autenticado
  async findUserPayments(ctx) {
    try {
      if (!ctx.state.user) {
        return ctx.unauthorized('Token de autenticação necessário');
      }

      const result = await strapi.service('api::payment.payment').findUserPayments(ctx.state.user.id, ctx.query);
      return ctx.send(result);
    } catch (error) {
      return ctx.badRequest('Erro ao buscar pagamentos', { error: error.message });
    }
  }
}));
