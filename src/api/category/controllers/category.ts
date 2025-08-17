import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::category.category', ({ strapi }) => ({
  // Handler para buscar categorias públicas
  async findPublic(ctx) {
    try {
      const result = await strapi.service('api::category.category').findPublic(ctx.query);
      return ctx.send(result);
    } catch (error) {
      return ctx.badRequest('Erro ao buscar categorias', { error: error.message });
    }
  },

  // Handler para buscar uma categoria pública específica
  async findOnePublic(ctx) {
    try {
      const { id } = ctx.params;
      const result = await strapi.service('api::category.category').findOnePublic(parseInt(id));
      
      if (!result) {
        return ctx.notFound('Categoria não encontrada');
      }
      
      return ctx.send(result);
    } catch (error) {
      return ctx.badRequest('Erro ao buscar categoria', { error: error.message });
    }
  },

  // Handler para buscar uma categoria pelo slug
  async findBySlug(ctx) {
    try {
      const { slug } = ctx.params;
      const result = await strapi.service('api::category.category').findBySlug(slug);
      
      if (!result) {
        return ctx.notFound('Categoria não encontrada');
      }
      
      return ctx.send(result);
    } catch (error) {
      return ctx.badRequest('Erro ao buscar categoria', { error: error.message });
    }
  }
}));
