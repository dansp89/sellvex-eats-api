import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::review.review', ({ strapi }) => ({
  // Handler para buscar avaliações públicas
  async findPublic(ctx) {
    try {
      const result = await strapi.service('api::review.review').findPublic(ctx.query);
      return ctx.send(result);
    } catch (error) {
      return ctx.badRequest('Erro ao buscar avaliações', { error: error.message });
    }
  }
}));
