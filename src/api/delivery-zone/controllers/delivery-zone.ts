import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::delivery-zone.delivery-zone', ({ strapi }) => ({
  // Handler para buscar zonas de entrega públicas
  async findPublic(ctx) {
    try {
      const result = await strapi.service('api::delivery-zone.delivery-zone').findPublic(ctx.query);
      return ctx.send(result);
    } catch (error) {
      return ctx.badRequest('Erro ao buscar zonas de entrega', { error: error.message });
    }
  },

  // Handler para buscar uma zona de entrega específica
  async findOnePublic(ctx) {
    try {
      const { documentId } = ctx.params;
      const result = await strapi.service('api::delivery-zone.delivery-zone').findOnePublic(documentId);
      
      if (!result) {
        return ctx.notFound('Zona de entrega não encontrada');
      }
      
      return ctx.send(result);
    } catch (error) {
      return ctx.badRequest('Erro ao buscar zona de entrega', { error: error.message });
    }
  }
}));
