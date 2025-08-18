import { factories } from '@strapi/strapi';

export default factories.createCoreService('api::delivery-driver.delivery-driver', ({ strapi }) => ({
  // Método para buscar perfil do entregador autenticado usando SQL RAW
  async findProfile(userId: number) {
    const query = `
      SELECT 
        d.id,
        d.first_name,
        d.last_name,
        d.email,
        d.phone,
        d.vehicle_type,
        d.license_plate,
        d.is_available,
        d.created_at,
        d.updated_at,
        d.published_at
      FROM delivery_drivers d
      WHERE d.user_id = $1 AND d.published_at IS NOT NULL
    `;

    const result = await strapi.db.connection.raw(query, [userId]);
    
    if (!result.rows || result.rows.length === 0) {
      return null;
    }

    const driver = result.rows[0];

    return {
      data: {
        id: driver.id,
        documentId: `doc_${driver.id}`,
        firstName: driver.first_name,
        lastName: driver.last_name,
        email: driver.email,
        phone: driver.phone,
        vehicleType: driver.vehicle_type,
        licensePlate: driver.license_plate,
        isAvailable: driver.is_available,
        createdAt: driver.created_at,
        updatedAt: driver.updated_at,
        publishedAt: driver.published_at
      }
    };
  },

  // Método para buscar pedidos disponíveis para entrega usando SQL RAW
  async findAvailableOrders(params: any = {}) {
    const page = parseInt(params.page) || 1;
    const pageSize = Math.min(parseInt(params.pageSize) || 25, 100);
    const offset = (page - 1) * pageSize;

    // Query para buscar pedidos disponíveis para entrega
    const ordersQuery = `
      SELECT 
        o.id,
        o.order_number,
        o.status,
        o.total,
        o.delivery_address,
        o.created_at,
        o.updated_at,
        o.published_at,
        u.username as user_username,
        u.email as user_email,
        u.phone as user_phone
      FROM orders o
      LEFT JOIN up_users u ON o.user_id = u.id
      WHERE o.status IN ('confirmed', 'preparing') 
        AND o.delivery_driver_id IS NULL 
        AND o.published_at IS NOT NULL
      ORDER BY o.created_at ASC
      LIMIT $1 OFFSET $2
    `;

    // Query para contar total de pedidos disponíveis
    const countQuery = `
      SELECT COUNT(*) as total
      FROM orders o
      WHERE o.status IN ('confirmed', 'preparing') 
        AND o.delivery_driver_id IS NULL 
        AND o.published_at IS NOT NULL
    `;

    const [orders, countResult] = await Promise.all([
      strapi.db.connection.raw(ordersQuery, [pageSize, offset]),
      strapi.db.connection.raw(countQuery)
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
      deliveryAddress: order.delivery_address,
      createdAt: order.created_at,
      updatedAt: order.updated_at,
      publishedAt: order.published_at,
      user: {
        username: order.user_username,
        email: order.user_email,
        phone: order.user_phone
      }
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
  },

  // Método para buscar entregas do entregador usando SQL RAW
  async findMyDeliveries(userId: number, params: any = {}) {
    const page = parseInt(params.page) || 1;
    const pageSize = Math.min(parseInt(params.pageSize) || 25, 100);
    const offset = (page - 1) * pageSize;

    // Primeiro buscar o driver_id pelo user_id
    const driverQuery = `
      SELECT id FROM delivery_drivers WHERE user_id = $1 AND published_at IS NOT NULL
    `;
    const driverResult = await strapi.db.connection.raw(driverQuery, [userId]);
    
    if (!driverResult.rows || driverResult.rows.length === 0) {
      return {
        data: [],
        meta: { pagination: { page, pageSize, pageCount: 0, total: 0 } }
      };
    }

    const driverId = driverResult.rows[0].id;

    // Query para buscar entregas do entregador
    const deliveriesQuery = `
      SELECT 
        o.id,
        o.order_number,
        o.status,
        o.total,
        o.delivery_address,
        o.created_at,
        o.updated_at,
        o.published_at,
        u.username as user_username,
        u.email as user_email,
        u.phone as user_phone
      FROM orders o
      LEFT JOIN up_users u ON o.user_id = u.id
      WHERE o.delivery_driver_id = $1 AND o.published_at IS NOT NULL
      ORDER BY o.created_at DESC
      LIMIT $2 OFFSET $3
    `;

    // Query para contar total de entregas
    const countQuery = `
      SELECT COUNT(*) as total
      FROM orders o
      WHERE o.delivery_driver_id = $1 AND o.published_at IS NOT NULL
    `;

    const [deliveries, countResult] = await Promise.all([
      strapi.db.connection.raw(deliveriesQuery, [driverId, pageSize, offset]),
      strapi.db.connection.raw(countQuery, [driverId])
    ]);

    const total = parseInt(countResult.rows[0].total);
    const pageCount = Math.ceil(total / pageSize);

    // Formatando os dados conforme padrão Strapi
    const formattedDeliveries = deliveries.rows.map(delivery => ({
      id: delivery.id,
      documentId: `doc_${delivery.id}`,
      orderNumber: delivery.order_number,
      status: delivery.status,
      total: parseFloat(delivery.total),
      deliveryAddress: delivery.delivery_address,
      createdAt: delivery.created_at,
      updatedAt: delivery.updated_at,
      publishedAt: delivery.published_at,
      user: {
        firstName: delivery.user_first_name,
        lastName: delivery.user_last_name,
        phone: delivery.user_phone
      }
    }));

    return {
      data: formattedDeliveries,
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
