import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::product.product', ({ strapi }) => ({
  // Controller para buscar produtos públicos
  async findPublic(ctx) {
    try {
      const { query } = ctx;
      const service = strapi.service('api::product.product');
      const result = await service.findPublic(query);
      
      return ctx.send(result);
    } catch (error) {
      return ctx.badRequest('Erro ao buscar produtos', { error: error.message });
    }
  },

  // Controller para buscar um produto público específico
  async findOnePublic(ctx) {
    try {
      const { id } = ctx.params;
      const { query } = ctx;
      const service = strapi.service('api::product.product');
      const result = await service.findOnePublic(id, query);
      
      if (!result) {
        return ctx.notFound('Produto não encontrado');
      }
      
      return ctx.send(result);
    } catch (error) {
      return ctx.badRequest('Erro ao buscar produto', { error: error.message });
    }
  },

  // Controller para buscar produtos por categoria
  async findByCategory(ctx) {
    try {
      const { categoryId } = ctx.params;
      const { query } = ctx;
      const service = strapi.service('api::product.product');
      const result = await service.findByCategory(categoryId, query);
      
      return ctx.send(result);
    } catch (error) {
      return ctx.badRequest('Erro ao buscar produtos da categoria', { error: error.message });
    }
  }
}));
