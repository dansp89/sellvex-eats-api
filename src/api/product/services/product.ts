import { factories } from '@strapi/strapi';
import { QueryType } from '~types/app';

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
      whereConditions.push('p.is_active = ?');
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
        p.is_active,
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
      LEFT JOIN products_category_lnk pcl ON p.id = pcl.product_id
      LEFT JOIN categories c ON pcl.category_id = c.id
      ${whereClause}
      ORDER BY p.created_at DESC
      LIMIT ? OFFSET ?
    `;

    /**
     * Query para contar total
     */
    const countQuery = `
      SELECT COUNT(DISTINCT p.id) as total
      FROM products p
      LEFT JOIN products_category_lnk pcl ON p.id = pcl.product_id
      LEFT JOIN categories c ON pcl.category_id = c.id
      ${whereClause}
    `;

    // Executar as queries com os parâmetros
    const [products, countResult] = await Promise.all([
      strapi.db.connection.raw(productsQuery, [...queryParams, pageSize, offset]),
      strapi.db.connection.raw(countQuery, queryParams)
    ]);

    const total = parseInt(countResult.rows[0].total);
    const pageCount = Math.ceil(total / pageSize);

    // Formatando os dados conforme padrão Strapi
    const formattedProducts = products.rows.map(product => ({
      documentId: product.document_id || `doc_${product.id}`,
      name: product.name,
      description: product.description,
      price: parseFloat(product.price),
      slug: product.slug,
      isAvailable: product.is_active,
      isFeatured: product.is_featured,
      preparationTime: product.preparation_time,
      images: product.images || [],
      createdAt: product.created_at,
      updatedAt: product.updated_at,
      publishedAt: product.published_at,
      category: product.category_id ? {
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
  async findOnePublic(documentId: string) {
    // Query otimizada buscando todos os campos necessários
    const query = `
      SELECT 
        p.id,
        p.document_id,
        p.name,
        p.description,
        p.price,
        p.slug,
        p.is_active,
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
      LEFT JOIN products_category_lnk pcl ON p.id = pcl.product_id
      LEFT JOIN categories c ON pcl.category_id = c.id
      WHERE p.document_id = ? AND p.published_at IS NOT NULL
      GROUP BY p.id, c.id, c.name, c.slug, c.document_id
      LIMIT 1
    `;

    try {
      const result = await strapi.db.connection.raw(query, [documentId]);
      if (!result.rows?.length) return null;
      const product = result.rows[0];
      
      // Formatação otimizada do resultado
      return {
        data: {
          documentId: product.document_id || `doc_${product.id}`,
          name: product.name,
          description: product.description,
          price: parseFloat(product.price),
          slug: product.slug,
          isAvailable: product.is_active,
          isFeatured: product.is_featured,
          preparationTime: product.preparation_time,
          images: product?.images?.map((image) => ({
            documentId: image.documentId,
            url: image.url,
            name: image.name,
            ext: image.ext,
            mime: image.mime,
            size: image.size
          })),
          createdAt: product.created_at,
          updatedAt: product.updated_at,
          publishedAt: product.published_at,
          category: product.category_id ? {
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
  async findByCategory(documentId: string, query: QueryType) {
    const page = typeof query.page === 'number' ? query.page : parseInt(query.page || '1', 10) || 1;
    const pageSize = Math.min(
      typeof query.pageSize === 'number' ? query.pageSize : parseInt(query.pageSize || '25', 10) || 25,
      100
    );
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
        p.is_active,
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
      LEFT JOIN products_category_lnk pcl ON p.id = pcl.product_id
      LEFT JOIN categories c ON pcl.category_id = c.id
      WHERE c.document_id = ? AND p.published_at IS NOT NULL
      GROUP BY p.id, c.id, c.name, c.slug, c.document_id
      ORDER BY p.created_at DESC
      LIMIT ? OFFSET ?
    `;

    // Query para contar total da categoria
    const countQuery = `
      SELECT COUNT(DISTINCT p.id) as total
      FROM products p
      LEFT JOIN products_category_lnk pcl ON p.id = pcl.product_id
      LEFT JOIN categories c ON pcl.category_id = c.id
      WHERE c.document_id = ? AND p.published_at IS NOT NULL
    `;

    const [products, countResult] = await Promise.all([
      strapi.db.connection.raw(productsQuery, [documentId, pageSize, offset]),
      strapi.db.connection.raw(countQuery, [documentId])
    ]);

    const total = parseInt(countResult.rows[0].total);
    const pageCount = Math.ceil(total / pageSize);

    // Formatar os resultados
    const formattedProducts = products.rows.map(product => ({
      documentId: product.document_id || `doc_${product.id}`,
      name: product.name,
      description: product.description,
      price: parseFloat(product.price),
      slug: product.slug,
      isAvailable: product.is_active,
      isFeatured: product.is_featured,
      preparationTime: product.preparation_time,
      images: product.images || [],
      createdAt: product.created_at,
      updatedAt: product.updated_at,
      publishedAt: product.published_at,
      category: {
        documentId: product.category_document_id,
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
