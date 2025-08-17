import { factories } from '@strapi/strapi';

export default factories.createCoreService('api::category.category', ({ strapi }) => ({
  // Método para buscar categorias públicas com contagem de produtos usando SQL RAW
  async findPublic(params: any = {}) {
    const page = parseInt(params.page) || 1;
    const pageSize = Math.min(parseInt(params.pageSize) || 25, 100);
    const offset = (page - 1) * pageSize;
    
    // Query para buscar categorias com contagem de produtos
    const categoriesQuery = `
      SELECT 
        c.id,
        c.name,
        c.slug,
        c.description,
        c.created_at,
        c.updated_at,
        c.published_at,
        COUNT(p.id) as product_count
      FROM categories c
      LEFT JOIN products p ON c.id = p.category_id AND p.published_at IS NOT NULL
      WHERE c.published_at IS NOT NULL
      GROUP BY c.id, c.name, c.slug, c.description, c.created_at, c.updated_at, c.published_at
      ORDER BY c.created_at DESC
      LIMIT $1 OFFSET $2
    `;

    // Query para contar total de categorias
    const countQuery = `
      SELECT COUNT(*) as total
      FROM categories c
      WHERE c.published_at IS NOT NULL
    `;

    const [categories, countResult] = await Promise.all([
      strapi.db.connection.raw(categoriesQuery, [pageSize, offset]),
      strapi.db.connection.raw(countQuery)
    ]);

    const total = parseInt(countResult.rows[0].total);
    const pageCount = Math.ceil(total / pageSize);

    // Formatando os dados conforme padrão Strapi
    const formattedCategories = categories.rows.map(category => ({
      id: category.id,
      documentId: `doc_${category.id}`,
      name: category.name,
      slug: category.slug,
      description: category.description,
      createdAt: category.created_at,
      updatedAt: category.updated_at,
      publishedAt: category.published_at,
      productCount: parseInt(category.product_count)
    }));

    return {
      data: formattedCategories,
      meta: {
        pagination: {
          page,
          pageSize,
          pageCount,
          total
        }
      }
    };
  },

  // Método para buscar uma categoria pública específica usando SQL RAW
  async findOnePublic(id: number) {
    const query = `
      SELECT 
        c.id,
        c.name,
        c.slug,
        c.description,
        c.created_at,
        c.updated_at,
        c.published_at,
        COUNT(p.id) as product_count
      FROM categories c
      LEFT JOIN products p ON c.id = p.category_id AND p.published_at IS NOT NULL
      WHERE c.id = $1 AND c.published_at IS NOT NULL
      GROUP BY c.id, c.name, c.slug, c.description, c.created_at, c.updated_at, c.published_at
    `;

    const result = await strapi.db.connection.raw(query, [id]);
    
    if (!result.rows || result.rows.length === 0) {
      return null;
    }

    const category = result.rows[0];

    return {
      data: {
        id: category.id,
        documentId: `doc_${category.id}`,
        name: category.name,
        slug: category.slug,
        description: category.description,
        createdAt: category.created_at,
        updatedAt: category.updated_at,
        publishedAt: category.published_at,
        productCount: parseInt(category.product_count)
      }
    };
  },

  // Método para buscar uma categoria pelo slug usando SQL RAW
  async findBySlug(slug: string) {
    const query = `
      SELECT 
        c.id,
        c.name,
        c.slug,
        c.description,
        c.created_at,
        c.updated_at,
        c.published_at,
        COUNT(p.id) as product_count
      FROM categories c
      LEFT JOIN products p ON c.id = p.category_id AND p.published_at IS NOT NULL
      WHERE c.slug = $1 AND c.published_at IS NOT NULL
      GROUP BY c.id, c.name, c.slug, c.description, c.created_at, c.updated_at, c.published_at
    `;

    const result = await strapi.db.connection.raw(query, [slug]);
    
    if (!result.rows || result.rows.length === 0) {
      return null;
    }

    const category = result.rows[0];

    return {
      data: {
        id: category.id,
        documentId: `doc_${category.id}`,
        name: category.name,
        slug: category.slug,
        description: category.description,
        createdAt: category.created_at,
        updatedAt: category.updated_at,
        publishedAt: category.published_at,
        productCount: parseInt(category.product_count)
      }
    };
  }
}));
