import { factories } from '@strapi/strapi';

export default factories.createCoreService('plugin::users-permissions.user', ({ strapi }) => ({
  /**
   * Método para buscar perfil do usuário autenticado usando SQL RAW (migrado de user)
   * @param userId 
   * @returns 
   */
  async findProfile(userId: number) {
    const query = `
      SELECT 
        u.id,
        u.username,
        u.email,
        u.phone,
        u.birth,
        u.loyalty_points,
        u.total_spent,
        u.total_orders,
        u.preferences,
        u.created_at,
        u.updated_at,
        u.published_at
      FROM up_users u
      WHERE u.id = $1 AND u.published_at IS NOT NULL
    `;

    const result = await strapi.db.connection.raw(query, [userId]);
    
    if (!result.rows || result.rows.length === 0) {
      return null;
    }

    const user = result.rows[0];

    return {
      data: {
        id: user.id,
        documentId: `doc_${user.id}`,
        username: user.username,
        email: user.email,
        phone: user.phone,
        birth: user.birth,
        loyaltyPoints: user.loyalty_points,
        totalSpent: user.total_spent,
        totalOrders: user.total_orders,
        preferences: user.preferences,
        createdAt: user.created_at,
        updatedAt: user.updated_at,
        publishedAt: user.published_at
      }
    };
  },

  /**
   * Método para buscar pedidos do usuário usando SQL RAW (migrado de user)
   * @param userId 
   * @param params 
   * @returns 
   */
  async findOrders(userId: number, params: any = {}) {
    const page = parseInt(params.page) || 1;
    const pageSize = Math.min(parseInt(params.pageSize) || 25, 100);
    const offset = (page - 1) * pageSize;

    // Query para buscar pedidos do usuário (agora diretamente pelo user_id)
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
      WHERE o.user_id = $1 AND o.published_at IS NOT NULL
      ORDER BY o.created_at DESC
      LIMIT $2 OFFSET $3
    `;

    // Query para contar total de pedidos
    const countQuery = `
      SELECT COUNT(*) as total
      FROM orders o
      WHERE o.user_id = $1 AND o.published_at IS NOT NULL
    `;

    const [orders, countResult] = await Promise.all([
      strapi.db.connection.raw(ordersQuery, [userId, pageSize, offset]),
      strapi.db.connection.raw(countQuery, [userId])
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
