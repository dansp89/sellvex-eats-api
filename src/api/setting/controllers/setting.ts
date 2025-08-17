import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::setting.setting', ({ strapi }) => ({
  // Handler para buscar configurações públicas
  async findPublic(ctx) {
    try {
      const result = await strapi.service('api::setting.setting').findPublic();
      return ctx.send(result);
    } catch (error) {
      return ctx.badRequest('Erro ao buscar configurações', { error: error.message });
    }
  }
}));
