import { factories } from '@strapi/strapi';

// Tipos para os filtros de produtos
interface CategoryFilter {
  documentId?: string;
}

interface ProductFilters {
  category?: CategoryFilter;
  isAvailable?: boolean;
}

interface Query {
  page?: string | number;
  pageSize?: string | number;
  filters?: ProductFilters;
  sort?: string;
}

export default factories.createCoreService('api::product.product', ({ strapi }) => ({
  /**
   * Handler para buscar produtos públicos
   * @param query 
   * @returns 
   */
  async findPublic(query: Query) {
    const page = typeof query.page === 'number' ? query.page : parseInt(query.page || '1', 10) || 1;
    const pageSize = Math.min(
      typeof query.pageSize === 'number' ? query.pageSize : parseInt(query.pageSize || '25', 10) || 25,
      100
    );
    const filters = query.filters || {};
    const offset = (page - 1) * pageSize;
    
    // Construir condições de filtro e parâmetros
    const whereConditions: string[] = [];
    const queryParams: any[] = [];
    
    // Condição base
    whereConditions.push('p.published_at IS NOT NULL');
    
    // Filtro por categoria
    if (filters?.category?.documentId) {
      whereConditions.push('c.document_id = ?');
      queryParams.push(filters.category.documentId);
    }
    
    // Filtro por disponibilidade
    if (typeof filters.isAvailable !== 'undefined') {
      whereConditions.push('p.is_available = ?');
      queryParams.push(filters.isAvailable);
    }
    
    // Construir a cláusula WHERE
    const whereClause = whereConditions.length > 0 
      ? `WHERE ${whereConditions.join(' AND ')}` 
      : '';
    
    /**
     * Query para buscar produtos com imagens
     */
    const productsQuery = `
      SELECT 
        p.id,
        p.document_id,
        p.name,
        p.description,
        p.price,
        p.slug,
        p.is_available,
        p.is_featured,
        p.preparation_time,
        p.created_at,
        p.updated_at,
        p.published_at,
        c.id as category_id,
        c.name as category_name,
        c.slug as category_slug,
        c.document_id as category_document_id,
        COALESCE(
          (
            SELECT json_agg(
              json_build_object(
                'documentId', f.document_id,
                'url', CONCAT('/uploads/', f.hash, f.ext),
                'name', f.name,
                'ext', f.ext,
                'mime', f.mime,
                'size', f.size
              )
            )
            FROM files_related_mph frm
            JOIN files f ON f.id = frm.file_id
            WHERE frm.related_id = p.id 
              AND frm.related_type = 'api::product.product' 
              AND frm.field = 'images'
          ),
          '[]'::json
        ) as images
      FROM products p
      LEFT JOIN categories c ON p.category = c.id
      ${whereClause}
      ORDER BY p.created_at DESC
      LIMIT ? OFFSET ?
    `;

    /**
     * Query para contar total
     */
    const countQuery = `
      SELECT COUNT(*) as total
      FROM products p
      ${whereClause}
    `;

    console.log("productsQuery", productsQuery);
    console.log("countQuery", countQuery);

    // Executar as queries com os parâmetros
    const [products, countResult] = await Promise.all([
      strapi.db.connection.raw(productsQuery, [...queryParams, pageSize, offset]),
      strapi.db.connection.raw(countQuery, queryParams)
    ]);

    const total = parseInt(countResult.rows[0].total);
    const pageCount = Math.ceil(total / pageSize);

    // Formatando os dados conforme padrão Strapi
    const formattedProducts = products.rows.map(product => ({
      id: product.id,
      documentId: product.document_id || `doc_${product.id}`,
      name: product.name,
      description: product.description,
      price: parseFloat(product.price),
      slug: product.slug,
      isAvailable: product.is_available,
      isFeatured: product.is_featured,
      preparationTime: product.preparation_time,
      images: product.images || [],
      createdAt: product.created_at,
      updatedAt: product.updated_at,
      publishedAt: product.published_at,
      category: product.category_id ? {
        id: product.category_id,
        documentId: product.category_document_id,
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

  // Método otimizado para buscar um produto público específico
  async findOnePublic(id: number) {
    // Query otimizada buscando todos os campos necessários
    const query = `
      SELECT 
        p.id,
        p.document_id,
        p.name,
        p.description,
        p.price,
        p.slug,
        p.is_available,
        p.is_featured,
        p.preparation_time,
        p.created_at,
        p.updated_at,
        p.published_at,
        c.id as category_id,
        c.name as category_name,
        c.slug as category_slug,
        c.document_id as category_document_id,
        COALESCE(
          (
            SELECT json_agg(
              json_build_object(
                'documentId', f.document_id,
                'url', CONCAT('/uploads/', f.hash, f.ext),
                'name', f.name,
                'ext', f.ext,
                'mime', f.mime,
                'size', f.size
              )
            )
            FROM files_related_mph frm
            JOIN files f ON f.id = frm.file_id
            WHERE frm.related_id = p.id 
              AND frm.related_type = 'api::product.product' 
              AND frm.field = 'images'
          ),
          '[]'::json
        ) as images
      FROM products p
      LEFT JOIN categories c ON p.category = c.id
      WHERE p.id = ? AND p.published_at IS NOT NULL
      GROUP BY p.id, c.id, c.name, c.slug, c.document_id
      LIMIT 1
    `;

    try {
      const result = await strapi.db.connection.raw(query, [id]);
      
      if (!result.rows?.length) {
        return null;
      }

      const product = result.rows[0];
      
      // Formatação otimizada do resultado
      return {
        data: {
          id: product.id,
          documentId: product.document_id || `doc_${product.id}`,
          name: product.name,
          description: product.description,
          price: parseFloat(product.price),
          slug: product.slug,
          isAvailable: product.is_available,
          isFeatured: product.is_featured,
          preparationTime: product.preparation_time,
          images: product.images || [],
          createdAt: product.created_at,
          updatedAt: product.updated_at,
          publishedAt: product.published_at,
          category: product.category_id ? {
            id: product.category_id,
            documentId: product.category_document_id,
            name: product.category_name,
            slug: product.category_slug
          } : null
        }
      };
    } catch (error) {
      strapi.log.error('Erro ao buscar produto:', error);
      return null;
    }
  },

  // Método para buscar produtos por categoria usando SQL RAW
  async findByCategory(categoryId: number, params: any = {}) {
    const page = parseInt(params.page) || 1;
    const pageSize = Math.min(parseInt(params.pageSize) || 25, 100);
    const offset = (page - 1) * pageSize;

    // Query para buscar produtos da categoria com imagens
    const productsQuery = `
      SELECT 
        p.id,
        p.document_id,
        p.name,
        p.description,
        p.price,
        p.slug,
        p.is_available,
        p.is_featured,
        p.preparation_time,
        p.created_at,
        p.updated_at,
        p.published_at,
        c.id as category_id,
        c.name as category_name,
        c.slug as category_slug,
        c.document_id as category_document_id,
        COALESCE(
          (
            SELECT json_agg(
              json_build_object(
                'documentId', f.document_id,
                'url', CONCAT('/uploads/', f.hash, f.ext),
                'name', f.name,
                'ext', f.ext,
                'mime', f.mime,
                'size', f.size
              )
            )
            FROM files_related_mph frm
            JOIN files f ON f.id = frm.file_id
            WHERE frm.related_id = p.id 
              AND frm.related_type = 'api::product.product' 
              AND frm.field = 'images'
          ),
          '[]'::json
        ) as images
      FROM products p
      LEFT JOIN categories c ON p.category = c.id
      WHERE p.category = ? AND p.published_at IS NOT NULL
      GROUP BY p.id, c.id, c.name, c.slug, c.document_id
      ORDER BY p.created_at DESC
      LIMIT ? OFFSET ?
    `;

    // Query para contar total da categoria
    const countQuery = `
      SELECT COUNT(p.id) as total
      FROM products p
      WHERE p.category = ? AND p.published_at IS NOT NULL
    `;

    const [products, countResult] = await Promise.all([
      strapi.db.connection.raw(productsQuery, [categoryId, pageSize, offset]),
      strapi.db.connection.raw(countQuery, [categoryId])
    ]);

    const total = parseInt(countResult.rows[0].total);
    const pageCount = Math.ceil(total / pageSize);

    // Formatar os resultados
    const formattedProducts = products.rows.map(product => ({
      id: product.id,
      documentId: product.document_id || `doc_${product.id}`,
      name: product.name,
      description: product.description,
      price: parseFloat(product.price),
      slug: product.slug,
      isAvailable: product.is_available,
      isFeatured: product.is_featured,
      preparationTime: product.preparation_time,
      images: product.images || [],
      createdAt: product.created_at,
      updatedAt: product.updated_at,
      publishedAt: product.published_at,
      category: {
        id: product.category_id,
        documentId: product.category_document_id || `doc_${product.category_id}`,
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
