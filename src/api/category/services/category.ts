import { factories } from '@strapi/strapi';
import { QueryType } from '~types/app';

export default factories.createCoreService('api::category.category', ({ strapi }) => ({
  /**
   * Método para buscar categorias públicas
   * @param query 
   * @returns 
   */
  async findPublic(query: QueryType) {
    const { page = '1', pageSize = '25' } = query;
    const pageNumber = parseInt(page, 10);
    const pageSizeNumber = parseInt(pageSize, 10);
    const offset = (pageNumber - 1) * pageSizeNumber;
    
    try {
      // Raw SQL query to get categories with product count
      const categoriesQuery = `
        SELECT 
          c.id,
          c.document_id,
          c.name,
          c.slug,
          c.description,
          c.created_at,
          c.updated_at,
          c.published_at,
          COUNT(p.id) as product_count,
          json_build_object(
            'id', f.id,
            'documentId', f.document_id,
            'url', CONCAT('/uploads/', f.hash, f.ext),
            'name', f.name,
            'ext', f.ext,
            'mime', f.mime,
            'size', f.size
          ) as image
        FROM categories c
        LEFT JOIN products_category_lnk pcl ON c.id = pcl.category_id
        LEFT JOIN products p ON pcl.product_id = p.id AND p.published_at IS NOT NULL
        LEFT JOIN files_related_mph frm ON frm.related_id = c.id 
          AND frm.related_type = 'api::category.category' 
          AND frm.field = 'image'
        LEFT JOIN files f ON f.id = frm.file_id
        WHERE c.published_at IS NOT NULL
        GROUP BY c.id, c.document_id, c.name, c.slug, c.description, c.created_at, c.updated_at, c.published_at, f.id, f.hash, f.ext, f.name, f.mime, f.size
        ORDER BY c.created_at DESC
        LIMIT ? OFFSET ?
      `;

      // Count query for pagination
      const countQuery = `
        SELECT COUNT(*) as total
        FROM categories c
        WHERE c.published_at IS NOT NULL
      `;

      // Execute queries
      const [categories, countResult] = await Promise.all([
        strapi.db.connection.raw(categoriesQuery, [pageSizeNumber, offset]),
        strapi.db.connection.raw(countQuery)
      ]);

      const total = parseInt(countResult.rows[0].total, 10);
      const pageCount = Math.ceil(total / pageSizeNumber);

      // Format the response
      const formattedData = {
        data: categories.rows.map(category => ({
          // id: category.id,
          documentId: category.document_id,
          name: category.name,
          slug: category.slug,
          description: category.description,
          createdAt: category.created_at,
          updatedAt: category.updated_at,
          publishedAt: category.published_at,
          productCount: parseInt(category.product_count, 10),
          image: category?.image?.id ? (() => {
            const { id, ...imageWithoutId } = category.image;
            return imageWithoutId;
          })() : null,
        })),
        meta: {
          pagination: {
            page: pageNumber,
            pageSize: pageSizeNumber,
            pageCount,
            total
          }
        }
      };

      return formattedData;
    } catch (error) {
      console.error('Erro ao buscar categorias públicas:', error);
      throw error;
    }
  },

  /**
   * Método para buscar uma categoria pública específica usando SQL RAW
   * @param documentId 
   * @returns 
   */
  async findOnePublic(documentId: string) {
    const query = `
      SELECT 
        c.id,
        c.document_id,
        c.name,
        c.slug,
        c.description,
        c.created_at,
        c.updated_at,
        c.published_at,
        COUNT(p.id) as product_count,
        json_build_object(
          'id', f.id,
          'documentId', f.document_id,
          'url', CONCAT('/uploads/', f.hash, f.ext),
          'name', f.name,
          'ext', f.ext,
          'mime', f.mime,
          'size', f.size
        ) as image
      FROM categories c
      LEFT JOIN products_category_lnk pcl ON c.id = pcl.category_id
      LEFT JOIN products p ON pcl.product_id = p.id AND p.published_at IS NOT NULL
      LEFT JOIN files_related_mph frm ON frm.related_id = c.id 
        AND frm.related_type = 'api::category.category' 
        AND frm.field = 'image'
      LEFT JOIN files f ON f.id = frm.file_id
      WHERE c.document_id = ? AND c.published_at IS NOT NULL
      GROUP BY c.id, c.document_id, c.name, c.slug, c.description, c.created_at, c.updated_at, c.published_at, f.id, f.hash, f.ext, f.name, f.mime, f.size
    `;

    const result = await strapi.db.connection.raw(query, [documentId]);

    if (!result.rows || result.rows.length === 0) {
      return null;
    }

    const category = result.rows[0];
    
    const formattedCategory = {
      documentId: category.document_id,
      name: category.name,
      slug: category.slug,
      description: category.description,
      createdAt: category.created_at,
      updatedAt: category.updated_at,
      publishedAt: category.published_at,
      productCount: parseInt(category.product_count, 10),
      image: category?.image?.id ? (() => {
        const { id, ...imageWithoutId } = category.image;
        return imageWithoutId;
      })() : null
    };

    return {
      data: formattedCategory
    };
  },

  /**
   * Método para buscar uma categoria pelo slug usando SQL RAW
   * @param slug 
   * @returns 
   */
  async findBySlug(slug: string) {
    const query = `
      SELECT 
        c.id,
        c.document_id,
        c.name,
        c.slug,
        c.description,
        c.created_at,
        c.updated_at,
        c.published_at,
        COUNT(p.id) as product_count,
        json_build_object(
          'id', f.id,
          'documentId', f.document_id,
          'url', CONCAT('/uploads/', f.hash, f.ext),
          'name', f.name,
          'ext', f.ext,
          'mime', f.mime,
          'size', f.size
        ) as image
      FROM categories c
      LEFT JOIN products_category_lnk pcl ON c.id = pcl.category_id
      LEFT JOIN products p ON pcl.product_id = p.id AND p.published_at IS NOT NULL
      LEFT JOIN files_related_mph frm ON frm.related_id = c.id 
        AND frm.related_type = 'api::category.category' 
        AND frm.field = 'image'
      LEFT JOIN files f ON f.id = frm.file_id
      WHERE c.slug = ? AND c.published_at IS NOT NULL
      GROUP BY c.id, c.document_id, c.name, c.slug, c.description, c.created_at, c.updated_at, c.published_at, f.id, f.hash, f.ext, f.name, f.mime, f.size
    `;

    const result = await strapi.db.connection.raw(query, [slug]);

    if (!result.rows || result.rows.length === 0) {
      return null;
    }

    const category = result.rows[0];

    const formattedCategory = {
      documentId: category.document_id,
      name: category.name,
      slug: category.slug,
      description: category.description,
      createdAt: category.created_at,
      updatedAt: category.updated_at,
      publishedAt: category.published_at,
      productCount: parseInt(category.product_count, 10),
      image: category?.image?.id ? (() => {
        const { id, ...imageWithoutId } = category.image;
        return imageWithoutId;
      })() : null
    };

    return {
      data: formattedCategory
    };
  }
}));
