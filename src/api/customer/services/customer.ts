import { factories } from '@strapi/strapi';

export default factories.createCoreService('api::customer.customer', ({ strapi }) => ({
  // Método para buscar perfil do cliente autenticado usando SQL RAW
  async findProfile(userId: number) {
    const query = `
      SELECT 
        c.id,
        c.first_name,
        c.last_name,
        c.email,
        c.phone,
        c.birth_date,
        c.created_at,
        c.updated_at,
        c.published_at
      FROM customers c
      WHERE c.user_id = $1 AND c.published_at IS NOT NULL
    `;

    const result = await strapi.db.connection.raw(query, [userId]);
    
    if (!result.rows || result.rows.length === 0) {
      return null;
    }

    const customer = result.rows[0];

    return {
      data: {
        id: customer.id,
        documentId: `doc_${customer.id}`,
        firstName: customer.first_name,
        lastName: customer.last_name,
        email: customer.email,
        phone: customer.phone,
        birthDate: customer.birth_date,
        createdAt: customer.created_at,
        updatedAt: customer.updated_at,
        publishedAt: customer.published_at
      }
    };
  },

  // Método para buscar pedidos do cliente usando SQL RAW
  async findOrders(userId: number, params: any = {}) {
    const page = parseInt(params.page) || 1;
    const pageSize = Math.min(parseInt(params.pageSize) || 25, 100);
    const offset = (page - 1) * pageSize;

    // Primeiro buscar o customer_id pelo user_id
    const customerQuery = `
      SELECT id FROM customers WHERE user_id = $1 AND published_at IS NOT NULL
    `;
    const customerResult = await strapi.db.connection.raw(customerQuery, [userId]);
    
    if (!customerResult.rows || customerResult.rows.length === 0) {
      return {
        data: [],
        meta: { pagination: { page, pageSize, pageCount: 0, total: 0 } }
      };
    }

    const customerId = customerResult.rows[0].id;

    // Query para buscar pedidos do cliente
    const ordersQuery = `
      SELECT 
        o.id,
        o.order_number,
        o.status,
        o.total,
        o.created_at,
        o.updated_at,
        o.published_at
      FROM orders o
      WHERE o.customer_id = $1 AND o.published_at IS NOT NULL
      ORDER BY o.created_at DESC
      LIMIT $2 OFFSET $3
    `;

    // Query para contar total de pedidos
    const countQuery = `
      SELECT COUNT(*) as total
      FROM orders o
      WHERE o.customer_id = $1 AND o.published_at IS NOT NULL
    `;

    const [orders, countResult] = await Promise.all([
      strapi.db.connection.raw(ordersQuery, [customerId, pageSize, offset]),
      strapi.db.connection.raw(countQuery, [customerId])
    ]);

    const total = parseInt(countResult.rows[0].total);
    const pageCount = Math.ceil(total / pageSize);

    // Formatando os dados conforme padrão Strapi
    const formattedOrders = orders.rows.map(order => ({
      id: order.id,
      documentId: `doc_${order.id}`,
      orderNumber: order.order_number,
      status: order.status,
      total: parseFloat(order.total),
      createdAt: order.created_at,
      updatedAt: order.updated_at,
      publishedAt: order.published_at
    }));

    return {
      data: formattedOrders,
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
