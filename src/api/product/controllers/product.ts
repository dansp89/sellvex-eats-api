import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::product.product', ({ strapi }) => ({
  // Controller para buscar produtos públicos
  async findPublic(ctx) {
    try {
      const { query } = ctx;
      const products = await strapi.service('api::product.product').findPublic(query);
      
      return ctx.send(products);
    } catch (error) {
      console.error('product::findPublic',error);
      return ctx.badRequest('Erro ao buscar produtos', { error: error.message });
    }
  },

  // Controller para buscar um produto público específico
  async findOnePublic(ctx) {
    try {
      const { documentId } = ctx.params;
      const product = await strapi.service('api::product.product').findOnePublic(documentId);
      if (!product) return ctx.notFound('Produto não encontrado');
      return ctx.send(product);
    } catch (error) {
      console.error('product::findOnePublic',error);
      return ctx.badRequest('Erro ao buscar produto', { error: error.message });
    }
  },

  // Controller para buscar produtos por categoria
  async findByCategory(ctx) {
    try {
      const { documentId } = ctx.params;
      const { query } = ctx;
      const products = await strapi.service('api::product.product').findByCategory(documentId, query);      
      return ctx.send(products);
    } catch (error) {
      console.error('product::findByCategory',error);
      return ctx.badRequest('Erro ao buscar produtos da categoria', { error: error.message });
    }
  }
}));
