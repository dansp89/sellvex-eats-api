import { factories } from '@strapi/strapi';

export default factories.createCoreService('api::review.review', ({ strapi }) => ({
  // Método para buscar avaliações públicas usando SQL RAW
  async findPublic(params: any = {}) {
    const page = parseInt(params.page) || 1;
    const pageSize = Math.min(parseInt(params.pageSize) || 25, 100);
    const offset = (page - 1) * pageSize;
    
    // Query para buscar avaliações
    const reviewsQuery = `
      SELECT 
        r.id,
        r.rating,
        r.comment,
        r.created_at,
        r.updated_at,
        r.published_at
      FROM reviews r
      WHERE r.published_at IS NOT NULL
      ORDER BY r.created_at DESC
      LIMIT $1 OFFSET $2
    `;

    // Query para contar total
    const countQuery = `
      SELECT COUNT(*) as total
      FROM reviews r
      WHERE r.published_at IS NOT NULL
    `;

    const [reviews, countResult] = await Promise.all([
      strapi.db.connection.raw(reviewsQuery, [pageSize, offset]),
      strapi.db.connection.raw(countQuery)
    ]);

    const total = parseInt(countResult.rows[0].total);
    const pageCount = Math.ceil(total / pageSize);

    // Formatando os dados conforme padrão Strapi
    const formattedReviews = reviews.rows.map(review => ({
      id: review.id,
      documentId: `doc_${review.id}`,
      rating: parseInt(review.rating),
      comment: review.comment,
      createdAt: review.created_at,
      updatedAt: review.updated_at,
      publishedAt: review.published_at
    }));

    return {
      data: formattedReviews,
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
