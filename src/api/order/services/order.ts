import { factories } from '@strapi/strapi';

export default factories.createCoreService('api::order.order', ({ strapi }) => ({
  // Método para buscar detalhes do pedido para cliente usando SQL RAW
  async findOrderForCustomer(orderId: number, userId: number) {
    // Primeiro verificar se o cliente tem acesso ao pedido
    const accessQuery = `
      SELECT o.id
      FROM orders o
      JOIN customers c ON o.customer_id = c.id
      WHERE o.id = $1 AND c.user_id = $2 AND o.published_at IS NOT NULL
    `;
    
    const accessResult = await strapi.db.connection.raw(accessQuery, [orderId, userId]);
    
    if (!accessResult.rows || accessResult.rows.length === 0) {
      return null;
    }

    // Query completa para buscar detalhes do pedido
    const query = `
      SELECT 
        o.id,
        o.order_number,
        o.status,
        o.total,
        o.delivery_address,
        o.delivery_fee,
        o.notes,
        o.created_at,
        o.updated_at,
        o.published_at,
        dd.first_name as driver_first_name,
        dd.last_name as driver_last_name,
        dd.phone as driver_phone,
        dd.vehicle_type as driver_vehicle_type
      FROM orders o
      LEFT JOIN delivery_drivers dd ON o.delivery_driver_id = dd.id
      WHERE o.id = $1 AND o.published_at IS NOT NULL
    `;

    const result = await strapi.db.connection.raw(query, [orderId]);
    
    if (!result.rows || result.rows.length === 0) {
      return null;
    }

    const order = result.rows[0];

    return {
      data: {
        id: order.id,
        documentId: `doc_${order.id}`,
        orderNumber: order.order_number,
        status: order.status,
        total: parseFloat(order.total),
        deliveryAddress: order.delivery_address,
        deliveryFee: parseFloat(order.delivery_fee || 0),
        notes: order.notes,
        createdAt: order.created_at,
        updatedAt: order.updated_at,
        publishedAt: order.published_at,
        deliveryDriver: order.driver_first_name ? {
          firstName: order.driver_first_name,
          lastName: order.driver_last_name,
          phone: order.driver_phone,
          vehicleType: order.driver_vehicle_type
        } : null
      }
    };
  },

  // Método para buscar detalhes do pedido para entregador usando SQL RAW
  async findOrderForDriver(orderId: number, userId: number) {
    // Primeiro verificar se o entregador tem acesso ao pedido
    const accessQuery = `
      SELECT o.id
      FROM orders o
      JOIN delivery_drivers dd ON o.delivery_driver_id = dd.id
      WHERE o.id = $1 AND dd.user_id = $2 AND o.published_at IS NOT NULL
    `;
    
    const accessResult = await strapi.db.connection.raw(accessQuery, [orderId, userId]);
    
    if (!accessResult.rows || accessResult.rows.length === 0) {
      return null;
    }

    // Query completa para buscar detalhes do pedido
    const query = `
      SELECT 
        o.id,
        o.order_number,
        o.status,
        o.total,
        o.delivery_address,
        o.delivery_fee,
        o.notes,
        o.created_at,
        o.updated_at,
        o.published_at,
        c.first_name as customer_first_name,
        c.last_name as customer_last_name,
        c.phone as customer_phone
      FROM orders o
      LEFT JOIN customers c ON o.customer_id = c.id
      WHERE o.id = $1 AND o.published_at IS NOT NULL
    `;

    const result = await strapi.db.connection.raw(query, [orderId]);
    
    if (!result.rows || result.rows.length === 0) {
      return null;
    }

    const order = result.rows[0];

    return {
      data: {
        id: order.id,
        documentId: `doc_${order.id}`,
        orderNumber: order.order_number,
        status: order.status,
        total: parseFloat(order.total),
        deliveryAddress: order.delivery_address,
        deliveryFee: parseFloat(order.delivery_fee || 0),
        notes: order.notes,
        createdAt: order.created_at,
        updatedAt: order.updated_at,
        publishedAt: order.published_at,
        customer: {
          firstName: order.customer_first_name,
          lastName: order.customer_last_name,
          phone: order.customer_phone
        }
      }
    };
  },

  // Método para atualizar status do pedido pelo entregador usando SQL RAW
  async updateOrderStatus(orderId: number, userId: number, newStatus: string) {
    // Primeiro verificar se o entregador tem acesso ao pedido
    const accessQuery = `
      SELECT o.id, dd.id as driver_id
      FROM orders o
      JOIN delivery_drivers dd ON o.delivery_driver_id = dd.id
      WHERE o.id = $1 AND dd.user_id = $2 AND o.published_at IS NOT NULL
    `;
    
    const accessResult = await strapi.db.connection.raw(accessQuery, [orderId, userId]);
    
    if (!accessResult.rows || accessResult.rows.length === 0) {
      return null;
    }

    // Atualizar status do pedido
    const updateQuery = `
      UPDATE orders 
      SET status = $1, updated_at = NOW()
      WHERE id = $2
      RETURNING id, order_number, status, total, updated_at
    `;

    const result = await strapi.db.connection.raw(updateQuery, [newStatus, orderId]);
    
    if (!result.rows || result.rows.length === 0) {
      return null;
    }

    const order = result.rows[0];

    return {
      data: {
        id: order.id,
        documentId: `doc_${order.id}`,
        orderNumber: order.order_number,
        status: order.status,
        total: parseFloat(order.total),
        updatedAt: order.updated_at
      }
    };
  },

  // Método para aceitar pedido pelo entregador usando SQL RAW
  async acceptOrder(orderId: number, userId: number) {
    // Primeiro buscar o driver_id pelo user_id
    const driverQuery = `
      SELECT id FROM delivery_drivers WHERE user_id = $1 AND published_at IS NOT NULL
    `;
    const driverResult = await strapi.db.connection.raw(driverQuery, [userId]);
    
    if (!driverResult.rows || driverResult.rows.length === 0) {
      return null;
    }

    const driverId = driverResult.rows[0].id;

    // Verificar se o pedido está disponível
    const orderQuery = `
      SELECT id, status FROM orders 
      WHERE id = $1 AND delivery_driver_id IS NULL AND status IN ('confirmed', 'preparing') AND published_at IS NOT NULL
    `;
    
    const orderResult = await strapi.db.connection.raw(orderQuery, [orderId]);
    
    if (!orderResult.rows || orderResult.rows.length === 0) {
      return null;
    }

    // Aceitar o pedido
    const acceptQuery = `
      UPDATE orders 
      SET delivery_driver_id = $1, status = 'out_for_delivery', updated_at = NOW()
      WHERE id = $2
      RETURNING id, order_number, status, total, updated_at
    `;

    const result = await strapi.db.connection.raw(acceptQuery, [driverId, orderId]);
    
    if (!result.rows || result.rows.length === 0) {
      return null;
    }

    const order = result.rows[0];

    return {
      data: {
        id: order.id,
        documentId: `doc_${order.id}`,
        orderNumber: order.order_number,
        status: order.status,
        total: parseFloat(order.total),
        updatedAt: order.updated_at
      }
    };
  },

  // Método para rastrear pedido pelo número usando SQL RAW (público)
  async trackOrder(trackingNumber: string) {
    const query = `
      SELECT 
        o.id,
        o.order_number,
        o.status,
        o.total,
        o.delivery_address,
        o.delivery_fee,
        o.created_at,
        o.updated_at,
        o.published_at,
        c.first_name as customer_first_name,
        c.last_name as customer_last_name,
        c.phone as customer_phone,
        dd.first_name as driver_first_name,
        dd.last_name as driver_last_name,
        dd.phone as driver_phone,
        dd.vehicle_type as driver_vehicle_type
      FROM orders o
      LEFT JOIN customers c ON o.customer_id = c.id
      LEFT JOIN delivery_drivers dd ON o.delivery_driver_id = dd.id
      WHERE o.order_number = $1 AND o.published_at IS NOT NULL
    `;

    const result = await strapi.db.connection.raw(query, [trackingNumber]);
    
    if (!result.rows || result.rows.length === 0) {
      return null;
    }

    const order = result.rows[0];

    return {
      data: {
        id: order.id,
        documentId: `doc_${order.id}`,
        orderNumber: order.order_number,
        status: order.status,
        total: parseFloat(order.total),
        deliveryAddress: order.delivery_address,
        deliveryFee: parseFloat(order.delivery_fee || 0),
        createdAt: order.created_at,
        updatedAt: order.updated_at,
        publishedAt: order.published_at,
        customer: {
          firstName: order.customer_first_name,
          lastName: order.customer_last_name,
          phone: order.customer_phone
        },
        deliveryDriver: order.driver_first_name ? {
          firstName: order.driver_first_name,
          lastName: order.driver_last_name,
          phone: order.driver_phone,
          vehicleType: order.driver_vehicle_type
        } : null
      }
    };
  }
}));
