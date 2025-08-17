import { factories } from '@strapi/strapi';

export default factories.createCoreService('api::product.product', ({ strapi }) => ({
  // Método para buscar produtos públicos (sem auth) usando SQL RAW
  async findPublic(params: any = {}) {
    const page = parseInt(params.page) || 1;
    const pageSize = Math.min(parseInt(params.pageSize) || 25, 100);
    const offset = (page - 1) * pageSize;
    
    // Query para buscar produtos com categoria
    const productsQuery = `
      SELECT 
        p.id,
        p.name,
        p.description,
        p.price,
        p.slug,
        p.created_at,
        p.updated_at,
        p.published_at,
        c.id as category_id,
        c.name as category_name,
        c.slug as category_slug
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      WHERE p.published_at IS NOT NULL
      ORDER BY p.created_at DESC
      LIMIT $1 OFFSET $2
    `;

    // Query para contar total
    const countQuery = `
      SELECT COUNT(*) as total
      FROM products p
      WHERE p.published_at IS NOT NULL
    `;

    const [products, countResult] = await Promise.all([
      strapi.db.connection.raw(productsQuery, [pageSize, offset]),
      strapi.db.connection.raw(countQuery)
    ]);

    const total = parseInt(countResult.rows[0].total);
    const pageCount = Math.ceil(total / pageSize);

    // Formatando os dados conforme padrão Strapi
    const formattedProducts = products.rows.map(product => ({
      id: product.id,
      documentId: `doc_${product.id}`,
      name: product.name,
      description: product.description,
      price: parseFloat(product.price),
      slug: product.slug,
      createdAt: product.created_at,
      updatedAt: product.updated_at,
      publishedAt: product.published_at,
      category: product.category_id ? {
        id: product.category_id,
        documentId: `doc_${product.category_id}`,
        name: product.category_name,
        slug: product.category_slug
      } : null
    }));

    return {
      data: formattedProducts,
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

  // Método para buscar um produto público específico usando SQL RAW
  async findOnePublic(id: number) {
    const query = `
      SELECT 
        p.id,
        p.name,
        p.description,
        p.price,
        p.slug,
        p.created_at,
        p.updated_at,
        p.published_at,
        c.id as category_id,
        c.name as category_name,
        c.slug as category_slug
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      WHERE p.id = $1 AND p.published_at IS NOT NULL
    `;

    const result = await strapi.db.connection.raw(query, [id]);
    
    if (!result.rows || result.rows.length === 0) {
      return null;
    }

    const product = result.rows[0];

    return {
      data: {
        id: product.id,
        documentId: `doc_${product.id}`,
        name: product.name,
        description: product.description,
        price: parseFloat(product.price),
        slug: product.slug,
        createdAt: product.created_at,
        updatedAt: product.updated_at,
        publishedAt: product.published_at,
        category: product.category_id ? {
          id: product.category_id,
          documentId: `doc_${product.category_id}`,
          name: product.category_name,
          slug: product.category_slug
        } : null
      }
    };
  },

  // Método para buscar produtos por categoria usando SQL RAW
  async findByCategory(categoryId: number, params: any = {}) {
    const page = parseInt(params.page) || 1;
    const pageSize = Math.min(parseInt(params.pageSize) || 25, 100);
    const offset = (page - 1) * pageSize;

    // Query para buscar produtos da categoria
    const productsQuery = `
      SELECT 
        p.id,
        p.name,
        p.description,
        p.price,
        p.slug,
        p.created_at,
        p.updated_at,
        p.published_at,
        c.id as category_id,
        c.name as category_name,
        c.slug as category_slug
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      WHERE p.category_id = $1 AND p.published_at IS NOT NULL
      ORDER BY p.created_at DESC
      LIMIT $2 OFFSET $3
    `;

    // Query para contar total da categoria
    const countQuery = `
      SELECT COUNT(*) as total
      FROM products p
      WHERE p.category_id = $1 AND p.published_at IS NOT NULL
    `;

    const [products, countResult] = await Promise.all([
      strapi.db.connection.raw(productsQuery, [categoryId, pageSize, offset]),
      strapi.db.connection.raw(countQuery, [categoryId])
    ]);

    const total = parseInt(countResult.rows[0].total);
    const pageCount = Math.ceil(total / pageSize);

    // Formatando os dados conforme padrão Strapi
    const formattedProducts = products.rows.map(product => ({
      id: product.id,
      documentId: `doc_${product.id}`,
      name: product.name,
      description: product.description,
      price: parseFloat(product.price),
      slug: product.slug,
      createdAt: product.created_at,
      updatedAt: product.updated_at,
      publishedAt: product.published_at,
      category: {
        id: product.category_id,
        documentId: `doc_${product.category_id}`,
        name: product.category_name,
        slug: product.category_slug
      }
    }));

    return {
      data: formattedProducts,
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
