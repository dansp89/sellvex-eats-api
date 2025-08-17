export default {
  routes: [
    {
      method: 'GET',
      path: '/notifications/user',
      handler: 'notification.findUserNotifications',
      config: {
        auth: {},
        swagger: {
          tags: ['Notification'],
          description: 'Buscar notificações do usuário autenticado',
          summary: 'Lista todas as notificações do usuário',
          responses: {
            200: {
              description: 'Lista de notificações retornada com sucesso'
            }
          }
        }
      }
    },
    {
      method: 'PUT',
      path: '/notifications/user/:id/read',
      handler: 'notification.markAsRead',
      config: {
        auth: {},
        swagger: {
          tags: ['Notification'],
          description: 'Marcar notificação como lida',
          summary: 'Marca uma notificação específica como lida',
          parameters: [
            {
              name: 'id',
              in: 'path',
              description: 'ID da notificação',
              required: true,
              schema: { type: 'integer' }
            }
          ],
          responses: {
            200: {
              description: 'Notificação marcada como lida com sucesso'
            }
          }
        }
      }
    }
  ]
};