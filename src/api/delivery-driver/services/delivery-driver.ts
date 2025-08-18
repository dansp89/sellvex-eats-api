import { factories } from '@strapi/strapi';
import { QueryType } from '~types/app';

export default factories.createCoreService('api::delivery-driver.delivery-driver', ({ strapi }) => ({
  // Método para buscar perfil do entregador autenticado usando SQL RAW
  async findProfile(userId: number) {
    const query = `
      SELECT 
        d.id,
        d.document_id,
        d.name,
        d.phone,
        d.vehicle_type,
        d.is_active,
        d.created_at,
        d.updated_at,
        d.published_at
      FROM delivery_drivers d
      WHERE d.user_id = ? AND d.published_at IS NOT NULL
    `;

    const result = await strapi.db.connection.raw(query, [userId]);
    
    if (!result.rows || result.rows.length === 0) {
      return null;
    }

    const driver = result.rows[0];

    return {
      data: {
        documentId: driver.document_id || `doc_${driver.id}`,
        name: driver.name,
        phone: driver.phone,
        vehicleType: driver.vehicle_type,
        isActive: driver.is_active,
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
        c.phone as customer_phone
      FROM orders o
      LEFT JOIN customers c ON o.customer = c.id
      WHERE o.status IN ('confirmed', 'preparing', 'ready_for_delivery') 
        AND o.delivery_driver IS NULL 
        AND o.published_at IS NOT NULL
      ORDER BY o.created_at ASC
      LIMIT ? OFFSET ?
    `;

    // Query para contar total de pedidos disponíveis
    const countQuery = `
      SELECT COUNT(*) as total
      FROM orders o
      WHERE o.status IN ('confirmed', 'preparing', 'ready_for_delivery') 
        AND o.delivery_driver IS NULL 
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
  },

  // Método para buscar entregas do entregador usando SQL RAW
  async findMyDeliveries(userId: number, params: any = {}) {
    const page = parseInt(params.page) || 1;
    const pageSize = Math.min(parseInt(params.pageSize) || 25, 100);
    const offset = (page - 1) * pageSize;

    // Primeiro buscar o driver_id pelo user_id
    const driverQuery = `
      SELECT id FROM delivery_drivers WHERE user_id = ? AND published_at IS NOT NULL
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
        c.phone as customer_phone
      FROM orders o
      LEFT JOIN customers c ON o.customer = c.id
      WHERE o.delivery_driver = ? AND o.published_at IS NOT NULL
      ORDER BY o.created_at DESC
      LIMIT ? OFFSET ?
    `;

    // Query para contar total de entregas
    const countQuery = `
      SELECT COUNT(*) as total
      FROM orders o
      WHERE o.delivery_driver = ? AND o.published_at IS NOT NULL
    `;

    const [deliveries, countResult] = await Promise.all([
      strapi.db.connection.raw(deliveriesQuery, [driverId, pageSize, offset]),
      strapi.db.connection.raw(countQuery, [driverId])
    ]);

    const total = parseInt(countResult.rows[0].total);
    const pageCount = Math.ceil(total / pageSize);

    // Formatando os dados conforme padrão Strapi
    const formattedDeliveries = deliveries.rows.map(delivery => ({
      documentId: delivery.document_id || `doc_${delivery.id}`,
      status: delivery.status,
      total: parseFloat(delivery.total),
      subtotal: parseFloat(delivery.subtotal),
      deliveryFee: parseFloat(delivery.delivery_fee || 0),
      discount: parseFloat(delivery.discount || 0),
      paymentMethod: delivery.payment_method,
      paymentStatus: delivery.payment_status,
      items: delivery.items,
      metadata: delivery.metadata,
      createdAt: delivery.created_at,
      updatedAt: delivery.updated_at,
      publishedAt: delivery.published_at,
      customer: delivery.customer_id ? {
        documentId: delivery.customer_document_id,
        phone: delivery.customer_phone
      } : null
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
  },

  // Método para buscar entregador público por documentId usando SQL RAW
  async findOnePublic(documentId: string) {
    const query = `
      SELECT 
        d.id,
        d.document_id,
        d.name,
        d.phone,
        d.vehicle_type,
        d.is_active,
        d.created_at,
        d.updated_at,
        d.published_at
      FROM delivery_drivers d
      WHERE d.document_id = ? AND d.published_at IS NOT NULL AND d.is_active = true
    `;

    const result = await strapi.db.connection.raw(query, [documentId]);
    
    if (!result.rows || result.rows.length === 0) {
      return null;
    }

    const driver = result.rows[0];

    return {
      data: {
        documentId: driver.document_id,
        name: driver.name,
        phone: driver.phone,
        vehicleType: driver.vehicle_type,
        isActive: driver.is_active,
        createdAt: driver.created_at,
        updatedAt: driver.updated_at,
        publishedAt: driver.published_at
      }
    };
  },

  // Método para buscar entregadores públicos usando SQL RAW
  async findPublic(query: QueryType) {
    const page = typeof query.page === 'number' ? query.page : parseInt(query.page || '1', 10) || 1;
    const pageSize = Math.min(
      typeof query.pageSize === 'number' ? query.pageSize : parseInt(query.pageSize || '25', 10) || 25,
      100
    );
    const offset = (page - 1) * pageSize;

    // Query para buscar entregadores
    const driversQuery = `
      SELECT 
        d.id,
        d.document_id,
        d.name,
        d.phone,
        d.vehicle_type,
        d.is_active,
        d.created_at,
        d.updated_at,
        d.published_at
      FROM delivery_drivers d
      WHERE d.published_at IS NOT NULL AND d.is_active = true
      ORDER BY d.created_at DESC
      LIMIT ? OFFSET ?
    `;

    // Query para contar total
    const countQuery = `
      SELECT COUNT(*) as total
      FROM delivery_drivers d
      WHERE d.published_at IS NOT NULL AND d.is_active = true
    `;

    const [drivers, countResult] = await Promise.all([
      strapi.db.connection.raw(driversQuery, [pageSize, offset]),
      strapi.db.connection.raw(countQuery)
    ]);

    const total = parseInt(countResult.rows[0].total);
    const pageCount = Math.ceil(total / pageSize);

    // Formatando os dados conforme padrão Strapi
    const formattedDrivers = drivers.rows.map(driver => ({
      documentId: driver.document_id || `doc_${driver.id}`,
      name: driver.name,
      phone: driver.phone,
      vehicleType: driver.vehicle_type,
      isActive: driver.is_active,
      createdAt: driver.created_at,
      updatedAt: driver.updated_at,
      publishedAt: driver.published_at
    }));

    return {
      data: formattedDrivers,
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
