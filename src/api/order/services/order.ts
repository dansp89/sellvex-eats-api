import { factories } from '@strapi/strapi';
import { QueryType } from '~types/app';

export default factories.createCoreService('api::order.order', ({ strapi }) => ({
  // Método para buscar detalhes do pedido para cliente usando SQL RAW
  async findOrderForUser(orderId: number, userId: number) {
    // Primeiro verificar se o cliente tem acesso ao pedido
    const accessQuery = `
      SELECT o.id
      FROM orders o
      WHERE o.id = ? AND o.user_id = ? AND o.published_at IS NOT NULL
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
      WHERE o.id = ? AND o.published_at IS NOT NULL
    `;

    const result = await strapi.db.connection.raw(query, [orderId]);
    
    if (!result.rows || result.rows.length === 0) {
      return null;
    }

    const order = result.rows[0];

    return {
      data: {
        documentId: order.document_id || `doc_${order.id}`,
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
      WHERE o.id = ? AND dd.user_id = ? AND o.published_at IS NOT NULL
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
        u.username as user_username,
        u.email as user_email,
        u.phone as user_phone
      FROM orders o
      LEFT JOIN up_users u ON o.user_id = u.id
      WHERE o.id = ? AND o.published_at IS NOT NULL
    `;

    const result = await strapi.db.connection.raw(query, [orderId]);
    
    if (!result.rows || result.rows.length === 0) {
      return null;
    }

    const order = result.rows[0];

    return {
      data: {
        documentId: order.document_id || `doc_${order.id}`,
        orderNumber: order.order_number,
        status: order.status,
        total: parseFloat(order.total),
        deliveryAddress: order.delivery_address,
        deliveryFee: parseFloat(order.delivery_fee || 0),
        notes: order.notes,
        createdAt: order.created_at,
        updatedAt: order.updated_at,
        publishedAt: order.published_at,
        user: {
          username: order.user_username,
          email: order.user_email,
          phone: order.user_phone
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
      WHERE o.id = ? AND dd.user_id = ? AND o.published_at IS NOT NULL
    `;
    
    const accessResult = await strapi.db.connection.raw(accessQuery, [orderId, userId]);
    
    if (!accessResult.rows || accessResult.rows.length === 0) {
      return null;
    }

    // Atualizar status do pedido
    const updateQuery = `
      UPDATE orders 
      SET status = ?, updated_at = NOW()
      WHERE id = ?
      RETURNING id, order_number, status, total, updated_at
    `;

    const result = await strapi.db.connection.raw(updateQuery, [newStatus, orderId]);
    
    if (!result.rows || result.rows.length === 0) {
      return null;
    }

    const order = result.rows[0];

    return {
      data: {
        documentId: order.document_id || `doc_${order.id}`,
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
      SELECT id FROM delivery_drivers WHERE user_id = ? AND published_at IS NOT NULL
    `;
    const driverResult = await strapi.db.connection.raw(driverQuery, [userId]);
    
    if (!driverResult.rows || driverResult.rows.length === 0) {
      return null;
    }

    const driverId = driverResult.rows[0].id;

    // Verificar se o pedido está disponível
    const orderQuery = `
      SELECT id, status FROM orders 
      WHERE id = ? AND delivery_driver_id IS NULL AND status IN ('confirmed', 'preparing') AND published_at IS NOT NULL
    `;
    
    const orderResult = await strapi.db.connection.raw(orderQuery, [orderId]);
    
    if (!orderResult.rows || orderResult.rows.length === 0) {
      return null;
    }

    // Aceitar o pedido
    const acceptQuery = `
      UPDATE orders 
      SET delivery_driver_id = ?, status = 'out_for_delivery', updated_at = NOW()
      WHERE id = ?
      RETURNING id, order_number, status, total, updated_at
    `;

    const result = await strapi.db.connection.raw(acceptQuery, [driverId, orderId]);
    
    if (!result.rows || result.rows.length === 0) {
      return null;
    }

    const order = result.rows[0];

    return {
      data: {
        documentId: order.document_id || `doc_${order.id}`,
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
        o.document_id,
        o.status,
        o.total,
        o.subtotal,
        o.delivery_fee,
        o.discount,
        o.payment_method,
        o.payment_status,
        o.items,
        o.metadata,
        o.created_at,
        o.updated_at,
        o.published_at,
        c.id as customer_id,
        c.document_id as customer_document_id,
        c.phone as customer_phone,
        dd.id as driver_id,
        dd.document_id as driver_document_id,
        dd.name as driver_name,
        dd.phone as driver_phone,
        dd.vehicle_type as driver_vehicle_type
      FROM orders o
      LEFT JOIN customers c ON o.customer = c.id
      LEFT JOIN delivery_drivers dd ON o.delivery_driver = dd.id
      WHERE o.document_id = ? AND o.published_at IS NOT NULL
    `;

    const result = await strapi.db.connection.raw(query, [trackingNumber]);
    
    if (!result.rows || result.rows.length === 0) {
      return null;
    }

    const order = result.rows[0];

    return {
      data: {
        documentId: order.document_id || `doc_${order.id}`,
        status: order.status,
        total: parseFloat(order.total),
        subtotal: parseFloat(order.subtotal),
        deliveryFee: parseFloat(order.delivery_fee || 0),
        discount: parseFloat(order.discount || 0),
        paymentMethod: order.payment_method,
        paymentStatus: order.payment_status,
        items: order.items,
        metadata: order.metadata,
        createdAt: order.created_at,
        updatedAt: order.updated_at,
        publishedAt: order.published_at,
        customer: order.customer_id ? {
          documentId: order.customer_document_id,
          phone: order.customer_phone
        } : null,
        deliveryDriver: order.driver_id ? {
          documentId: order.driver_document_id,
          name: order.driver_name,
          phone: order.driver_phone,
          vehicleType: order.driver_vehicle_type
        } : null
      }
    };
  },

  // Método para buscar pedido por documentId usando SQL RAW
  async findOnePublic(documentId: string) {
    const query = `
      SELECT 
        o.id,
        o.document_id,
        o.status,
        o.total,
        o.subtotal,
        o.delivery_fee,
        o.discount,
        o.payment_method,
        o.payment_status,
        o.items,
        o.metadata,
        o.created_at,
        o.updated_at,
        o.published_at,
        c.id as customer_id,
        c.document_id as customer_document_id,
        c.phone as customer_phone,
        dd.id as driver_id,
        dd.document_id as driver_document_id,
        dd.name as driver_name,
        dd.phone as driver_phone,
        dd.vehicle_type as driver_vehicle_type
      FROM orders o
      LEFT JOIN customers c ON o.customer = c.id
      LEFT JOIN delivery_drivers dd ON o.delivery_driver = dd.id
      WHERE o.document_id = ? AND o.published_at IS NOT NULL
    `;

    const result = await strapi.db.connection.raw(query, [documentId]);
    
    if (!result.rows || result.rows.length === 0) {
      return null;
    }

    const order = result.rows[0];

    return {
      data: {
        documentId: order.document_id || `doc_${order.id}`,
        status: order.status,
        total: parseFloat(order.total),
        subtotal: parseFloat(order.subtotal),
        deliveryFee: parseFloat(order.delivery_fee || 0),
        discount: parseFloat(order.discount || 0),
        paymentMethod: order.payment_method,
        paymentStatus: order.payment_status,
        items: order.items,
        metadata: order.metadata,
        createdAt: order.created_at,
        updatedAt: order.updated_at,
        publishedAt: order.published_at,
        customer: order.customer_id ? {
          documentId: order.customer_document_id,
          phone: order.customer_phone
        } : null,
        deliveryDriver: order.driver_id ? {
          documentId: order.driver_document_id,
          name: order.driver_name,
          phone: order.driver_phone,
          vehicleType: order.driver_vehicle_type
        } : null
      }
    };
  },

  // Método para buscar pedidos públicos usando SQL RAW
  async findPublic(query: QueryType) {
    const page = typeof query.page === 'number' ? query.page : parseInt(query.page || '1', 10) || 1;
    const pageSize = Math.min(
      typeof query.pageSize === 'number' ? query.pageSize : parseInt(query.pageSize || '25', 10) || 25,
      100
    );
    const offset = (page - 1) * pageSize;

    // Query para buscar pedidos
    const ordersQuery = `
      SELECT 
        o.id,
        o.document_id,
        o.status,
        o.total,
        o.subtotal,
        o.delivery_fee,
        o.discount,
        o.payment_method,
        o.payment_status,
        o.items,
        o.metadata,
        o.created_at,
        o.updated_at,
        o.published_at,
        c.id as customer_id,
        c.document_id as customer_document_id,
        c.phone as customer_phone,
        dd.id as driver_id,
        dd.document_id as driver_document_id,
        dd.name as driver_name,
        dd.phone as driver_phone,
        dd.vehicle_type as driver_vehicle_type
      FROM orders o
      LEFT JOIN customers c ON o.customer = c.id
      LEFT JOIN delivery_drivers dd ON o.delivery_driver = dd.id
      WHERE o.published_at IS NOT NULL
      ORDER BY o.created_at DESC
      LIMIT ? OFFSET ?
    `;

    // Query para contar total
    const countQuery = `
      SELECT COUNT(*) as total
      FROM orders o
      WHERE o.published_at IS NOT NULL
    `;

    const [orders, countResult] = await Promise.all([
      strapi.db.connection.raw(ordersQuery, [pageSize, offset]),
      strapi.db.connection.raw(countQuery)
    ]);

    const total = parseInt(countResult.rows[0].total);
    const pageCount = Math.ceil(total / pageSize);

    // Formatando os dados conforme padrão Strapi
    const formattedOrders = orders.rows.map(order => ({
      documentId: order.document_id || `doc_${order.id}`,
      status: order.status,
      total: parseFloat(order.total),
      subtotal: parseFloat(order.subtotal),
      deliveryFee: parseFloat(order.delivery_fee || 0),
      discount: parseFloat(order.discount || 0),
      paymentMethod: order.payment_method,
      paymentStatus: order.payment_status,
      items: order.items,
      metadata: order.metadata,
      createdAt: order.created_at,
      updatedAt: order.updated_at,
      publishedAt: order.published_at,
      customer: order.customer_id ? {
        documentId: order.customer_document_id,
        phone: order.customer_phone
      } : null,
      deliveryDriver: order.driver_id ? {
        documentId: order.driver_document_id,
        name: order.driver_name,
        phone: order.driver_phone,
        vehicleType: order.driver_vehicle_type
      } : null
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
