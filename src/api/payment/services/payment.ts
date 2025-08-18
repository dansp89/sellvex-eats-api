import { factories } from '@strapi/strapi';

export default factories.createCoreService('api::payment.payment', ({ strapi }) => ({
  // Método para buscar pagamentos do cliente usando SQL RAW
  async findUserPayments(userId: number, params: any = {}) {
    const page = parseInt(params.page) || 1;
    const pageSize = Math.min(parseInt(params.pageSize) || 25, 100);
    const offset = (page - 1) * pageSize;

    // Agora o user_id é usado diretamente
    const userIdForQuery = userId;

    // Query para buscar pagamentos
    const paymentsQuery = `
      SELECT 
        p.id,
        p.amount,
        p.method,
        p.status,
        p.transaction_id,
        p.created_at,
        p.updated_at,
        p.published_at
      FROM payments p
      WHERE p.user_id = $1 AND p.published_at IS NOT NULL
      ORDER BY p.created_at DESC
      LIMIT $2 OFFSET $3
    `;

    // Query para contar total
    const countQuery = `
      SELECT COUNT(*) as total
      FROM payments p
      WHERE p.user_id = $1 AND p.published_at IS NOT NULL
    `;

    const [payments, countResult] = await Promise.all([
      strapi.db.connection.raw(paymentsQuery, [userIdForQuery, pageSize, offset]),
      strapi.db.connection.raw(countQuery, [userIdForQuery])
    ]);

    const total = parseInt(countResult.rows[0].total);
    const pageCount = Math.ceil(total / pageSize);

    // Formatando os dados conforme padrão Strapi
    const formattedPayments = payments.rows.map(payment => ({
      id: payment.id,
      documentId: `doc_${payment.id}`,
      amount: parseFloat(payment.amount),
      method: payment.method,
      status: payment.status,
      transactionId: payment.transaction_id,
      createdAt: payment.created_at,
      updatedAt: payment.updated_at,
      publishedAt: payment.published_at
    }));

    return {
      data: formattedPayments,
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
