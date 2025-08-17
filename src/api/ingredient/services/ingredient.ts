import { factories } from '@strapi/strapi';

export default factories.createCoreService('api::ingredient.ingredient', ({ strapi }) => ({
  // Método para buscar ingredientes públicos usando SQL RAW
  async findPublic(params: any = {}) {
    const page = parseInt(params.page) || 1;
    const pageSize = Math.min(parseInt(params.pageSize) || 25, 100);
    const offset = (page - 1) * pageSize;
    
    // Query para buscar ingredientes
    const ingredientsQuery = `
      SELECT 
        i.id,
        i.name,
        i.description,
        i.allergen_info,
        i.created_at,
        i.updated_at,
        i.published_at
      FROM ingredients i
      WHERE i.published_at IS NOT NULL
      ORDER BY i.name ASC
      LIMIT $1 OFFSET $2
    `;

    // Query para contar total
    const countQuery = `
      SELECT COUNT(*) as total
      FROM ingredients i
      WHERE i.published_at IS NOT NULL
    `;

    const [ingredients, countResult] = await Promise.all([
      strapi.db.connection.raw(ingredientsQuery, [pageSize, offset]),
      strapi.db.connection.raw(countQuery)
    ]);

    const total = parseInt(countResult.rows[0].total);
    const pageCount = Math.ceil(total / pageSize);

    // Formatando os dados conforme padrão Strapi
    const formattedIngredients = ingredients.rows.map(ingredient => ({
      id: ingredient.id,
      documentId: `doc_${ingredient.id}`,
      name: ingredient.name,
      description: ingredient.description,
      allergenInfo: ingredient.allergen_info,
      createdAt: ingredient.created_at,
      updatedAt: ingredient.updated_at,
      publishedAt: ingredient.published_at
    }));

    return {
      data: formattedIngredients,
      meta: {
        pagination: {
          page,
          pageSize,
          pageCount,
          total
        }
      }
    };
  }
}));
