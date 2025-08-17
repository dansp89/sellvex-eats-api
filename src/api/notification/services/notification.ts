import { factories } from '@strapi/strapi';

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
        n.title,
        n.message,
        n.type,
        n.is_read,
        n.created_at,
        n.updated_at,
        n.published_at
      FROM notifications n
      WHERE n.user_id = $1 AND n.published_at IS NOT NULL
      ORDER BY n.created_at DESC
      LIMIT $2 OFFSET $3
    `;

    // Query para contar total de notificações
    const countQuery = `
      SELECT COUNT(*) as total
      FROM notifications n
      WHERE n.user_id = $1 AND n.published_at IS NOT NULL
    `;

    const [notifications, countResult] = await Promise.all([
      strapi.db.connection.raw(notificationsQuery, [userId, pageSize, offset]),
      strapi.db.connection.raw(countQuery, [userId])
    ]);

    const total = parseInt(countResult.rows[0].total);
    const pageCount = Math.ceil(total / pageSize);

    // Formatando os dados conforme padrão Strapi
    const formattedNotifications = notifications.rows.map(notification => ({
      id: notification.id,
      documentId: `doc_${notification.id}`,
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

  // Método para marcar notificação como lida usando SQL RAW
  async markAsRead(notificationId: number, userId: number) {
    const updateQuery = `
      UPDATE notifications 
      SET is_read = true, updated_at = NOW()
      WHERE id = $1 AND user_id = $2
      RETURNING id, title, message, type, is_read, updated_at
    `;

    const result = await strapi.db.connection.raw(updateQuery, [notificationId, userId]);
    
    if (!result.rows || result.rows.length === 0) {
      return null;
    }

    const notification = result.rows[0];

    return {
      data: {
        id: notification.id,
        documentId: `doc_${notification.id}`,
        title: notification.title,
        message: notification.message,
        type: notification.type,
        isRead: notification.is_read,
        updatedAt: notification.updated_at
      }
    };
  }
}));
