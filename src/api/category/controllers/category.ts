import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::category.category', ({ strapi }) => ({
  /**
   * Handler para buscar categorias públicas
   * @param ctx 
   * @returns 
   */
  async findPublic(ctx) {
    const query = ctx.query;
    try {
      const result = await strapi.service('api::category.category').findPublic(query);
      return ctx.send(result);
    } catch (error) {
      return ctx.badRequest('Erro ao buscar categorias', { error: error.message });
    }
  },

  /**
   * Handler para buscar uma categoria pública específica
   * @param ctx 
   * @returns 
   */
  async findOnePublic(ctx) {
    try {
      const { documentId } = ctx.params;
      if(!documentId) return ctx.badRequest('Document ID obrigatório');
      const result = await strapi.service('api::category.category').findOnePublic(documentId);
      if (!result) return ctx.notFound('Categoria não encontrada');
      return ctx.send(result);
    } catch (error) {
      return ctx.badRequest('Erro ao buscar categoria', { error: error.message });
    }
  },

  /**
   * Handler para buscar uma categoria pelo slug
   * @param ctx 
   * @returns 
   */
  async findBySlug(ctx) {
    try {
      const { slug } = ctx.params;
      if(!slug) return ctx.badRequest('Slug obrigatório');
      const result = await strapi.service('api::category.category').findBySlug(slug);
      if (!result) return ctx.notFound('Categoria não encontrada');
      return ctx.send(result);
    } catch (error) {
      return ctx.badRequest('Erro ao buscar categoria', { error: error.message });
    }
  }
}));
