import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::ingredient.ingredient', ({ strapi }) => ({
  // Handler para buscar ingredientes públicos
  async findPublic(ctx) {
    try {
      const result = await strapi.service('api::ingredient.ingredient').findPublic(ctx.query);
      return ctx.send(result);
    } catch (error) {
      return ctx.badRequest('Erro ao buscar ingredientes', { error: error.message });
    }
  }
}));
