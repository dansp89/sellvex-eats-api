import { factories } from '@strapi/strapi';
import { QueryType } from '~types/app';

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
        p.document_id,
        p.amount,
        p.method,
        p.status,
        p.transaction_id,
        p.created_at,
        p.updated_at,
        p.published_at,
        c.id as customer_id,
        c.document_id as customer_document_id,
        c.phone as customer_phone
      FROM payments p
      LEFT JOIN customers c ON p.customer = c.id
      WHERE c.id = ? AND p.published_at IS NOT NULL
      ORDER BY p.created_at DESC
      LIMIT ? OFFSET ?
    `;

    // Query para contar total
    const countQuery = `
      SELECT COUNT(*) as total
      FROM payments p
      LEFT JOIN customers c ON p.customer = c.id
      WHERE c.id = ? AND p.published_at IS NOT NULL
    `;

    const [payments, countResult] = await Promise.all([
      strapi.db.connection.raw(paymentsQuery, [userIdForQuery, pageSize, offset]),
      strapi.db.connection.raw(countQuery, [userIdForQuery])
    ]);

    const total = parseInt(countResult.rows[0].total);
    const pageCount = Math.ceil(total / pageSize);

    // Formatando os dados conforme padrão Strapi
    const formattedPayments = payments.rows.map(payment => ({
      documentId: payment.document_id || `doc_${payment.id}`,
      amount: parseFloat(payment.amount),
      method: payment.method,
      status: payment.status,
      transactionId: payment.transaction_id,
      createdAt: payment.created_at,
      updatedAt: payment.updated_at,
      publishedAt: payment.published_at,
      customer: payment.customer_id ? {
        documentId: payment.customer_document_id,
        phone: payment.customer_phone
      } : null
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
  },

  // Método para buscar um pagamento específico por documentId
  async findOnePublic(documentId: string) {
    const query = `
      SELECT 
        p.id,
        p.document_id,
        p.amount,
        p.method,
        p.status,
        p.transaction_id,
        p.created_at,
        p.updated_at,
        p.published_at,
        c.id as customer_id,
        c.document_id as customer_document_id,
        c.phone as customer_phone
      FROM payments p
      LEFT JOIN customers c ON p.customer = c.id
      WHERE p.document_id = ? AND p.published_at IS NOT NULL
    `;

    const result = await strapi.db.connection.raw(query, [documentId]);
    
    if (!result.rows || result.rows.length === 0) {
      return null;
    }

    const payment = result.rows[0];

    return {
      data: {
        documentId: payment.document_id,
        amount: parseFloat(payment.amount),
        method: payment.method,
        status: payment.status,
        transactionId: payment.transaction_id,
        createdAt: payment.created_at,
        updatedAt: payment.updated_at,
        publishedAt: payment.published_at,
        customer: payment.customer_id ? {
          documentId: payment.customer_document_id,
          phone: payment.customer_phone
        } : null
      }
    };
  },

  // Método para buscar pagamentos públicos usando SQL RAW
  async findPublic(query: QueryType) {
    const page = typeof query.page === 'number' ? query.page : parseInt(query.page || '1', 10) || 1;
    const pageSize = Math.min(
      typeof query.pageSize === 'number' ? query.pageSize : parseInt(query.pageSize || '25', 10) || 25,
      100
    );
    const offset = (page - 1) * pageSize;

    // Query para buscar pagamentos
    const paymentsQuery = `
      SELECT 
        p.id,
        p.document_id,
        p.amount,
        p.method,
        p.status,
        p.transaction_id,
        p.created_at,
        p.updated_at,
        p.published_at,
        c.id as customer_id,
        c.document_id as customer_document_id,
        c.phone as customer_phone
      FROM payments p
      LEFT JOIN customers c ON p.customer = c.id
      WHERE p.published_at IS NOT NULL
      ORDER BY p.created_at DESC
      LIMIT ? OFFSET ?
    `;

    // Query para contar total
    const countQuery = `
      SELECT COUNT(*) as total
      FROM payments p
      WHERE p.published_at IS NOT NULL
    `;

    const [payments, countResult] = await Promise.all([
      strapi.db.connection.raw(paymentsQuery, [pageSize, offset]),
      strapi.db.connection.raw(countQuery)
    ]);

    const total = parseInt(countResult.rows[0].total);
    const pageCount = Math.ceil(total / pageSize);

    // Formatando os dados conforme padrão Strapi
    const formattedPayments = payments.rows.map(payment => ({
      documentId: payment.document_id || `doc_${payment.id}`,
      amount: parseFloat(payment.amount),
      method: payment.method,
      status: payment.status,
      transactionId: payment.transaction_id,
      createdAt: payment.created_at,
      updatedAt: payment.updated_at,
      publishedAt: payment.published_at,
      customer: payment.customer_id ? {
        documentId: payment.customer_document_id,
        phone: payment.customer_phone
      } : null
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
