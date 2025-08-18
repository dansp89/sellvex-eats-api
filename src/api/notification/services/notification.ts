import { factories } from '@strapi/strapi';
import { QueryType } from '~types/app';

export default factories.createCoreService('api::notification.notification', ({ strapi }) => ({
  // Método para buscar notificações do usuário usando SQL RAW
  async findUserNotifications(userId: number, params: any = {}) {
    const page = parseInt(params.page) || 1;
    const pageSize = Math.min(parseInt(params.pageSize) || 25, 100);
    const offset = (page - 1) * pageSize;

    // Query para buscar notificações do usuário
    const notificationsQuery = `
      SELECT 
        n.id,
        n.document_id,
        n.title,
        n.message,
        n.type,
        n.is_read,
        n.created_at,
        n.updated_at,
        n.published_at
      FROM notifications n
      WHERE (n.customer = ? OR n.delivery_driver = ?) AND n.published_at IS NOT NULL
      ORDER BY n.created_at DESC
      LIMIT ? OFFSET ?
    `;

    // Query para contar total de notificações
    const countQuery = `
      SELECT COUNT(*) as total
      FROM notifications n
      WHERE (n.customer = ? OR n.delivery_driver = ?) AND n.published_at IS NOT NULL
    `;

    const [notifications, countResult] = await Promise.all([
      strapi.db.connection.raw(notificationsQuery, [userId, pageSize, offset]),
      strapi.db.connection.raw(countQuery, [userId])
    ]);

    const total = parseInt(countResult.rows[0].total);
    const pageCount = Math.ceil(total / pageSize);

    // Formatando os dados conforme padrão Strapi
    const formattedNotifications = notifications.rows.map(notification => ({
      documentId: notification.document_id || `doc_${notification.id}`,
      title: notification.title,
      message: notification.message,
      type: notification.type,
      isRead: notification.is_read,
      createdAt: notification.created_at,
      updatedAt: notification.updated_at,
      publishedAt: notification.published_at
    }));

    return {
      data: formattedNotifications,
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

  // Método para marcar notificação como lida usando documentId
  async markAsReadByDocumentId(documentId: string, userId: number) {
    const updateQuery = `
      UPDATE notifications 
      SET is_read = true, updated_at = NOW()
      WHERE document_id = ? AND (customer = ? OR delivery_driver = ?)
      RETURNING id, document_id, title, message, type, is_read, updated_at
    `;

    const result = await strapi.db.connection.raw(updateQuery, [documentId, userId]);
    
    if (!result.rows || result.rows.length === 0) {
      return null;
    }

    const notification = result.rows[0];

    return {
      data: {
        documentId: notification.document_id,
        title: notification.title,
        message: notification.message,
        type: notification.type,
        isRead: notification.is_read,
        updatedAt: notification.updated_at
      }
    };
  },

  // Método para buscar uma notificação específica por documentId
  async findOnePublic(documentId: string) {
    const query = `
      SELECT 
        n.id,
        n.document_id,
        n.title,
        n.message,
        n.type,
        n.is_read,
        n.created_at,
        n.updated_at,
        n.published_at
      FROM notifications n
      WHERE n.document_id = ? AND n.published_at IS NOT NULL
    `;

    const result = await strapi.db.connection.raw(query, [documentId]);
    
    if (!result.rows || result.rows.length === 0) {
      return null;
    }

    const notification = result.rows[0];

    return {
      data: {
        documentId: notification.document_id,
        title: notification.title,
        message: notification.message,
        type: notification.type,
        isRead: notification.is_read,
        createdAt: notification.created_at,
        updatedAt: notification.updated_at,
        publishedAt: notification.published_at
      }
    };
  },

  // Método para buscar notificações públicas usando SQL RAW
  async findPublic(query: QueryType) {
    const page = typeof query.page === 'number' ? query.page : parseInt(query.page || '1', 10) || 1;
    const pageSize = Math.min(
      typeof query.pageSize === 'number' ? query.pageSize : parseInt(query.pageSize || '25', 10) || 25,
      100
    );
    const offset = (page - 1) * pageSize;

    // Query para buscar notificações
    const notificationsQuery = `
      SELECT 
        n.id,
        n.document_id,
        n.title,
        n.message,
        n.type,
        n.is_read,
        n.created_at,
        n.updated_at,
        n.published_at
      FROM notifications n
      WHERE n.published_at IS NOT NULL
      ORDER BY n.created_at DESC
      LIMIT ? OFFSET ?
    `;

    // Query para contar total
    const countQuery = `
      SELECT COUNT(*) as total
      FROM notifications n
      WHERE n.published_at IS NOT NULL
    `;

    const [notifications, countResult] = await Promise.all([
      strapi.db.connection.raw(notificationsQuery, [pageSize, offset]),
      strapi.db.connection.raw(countQuery)
    ]);

    const total = parseInt(countResult.rows[0].total);
    const pageCount = Math.ceil(total / pageSize);

    // Formatando os dados conforme padrão Strapi
    const formattedNotifications = notifications.rows.map(notification => ({
      documentId: notification.document_id || `doc_${notification.id}`,
      title: notification.title,
      message: notification.message,
      type: notification.type,
      isRead: notification.is_read,
      createdAt: notification.created_at,
      updatedAt: notification.updated_at,
      publishedAt: notification.published_at
    }));

    return {
      data: formattedNotifications,
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
