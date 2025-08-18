export default {
  routes: [
    {
      method: 'GET',
      path: '/notifications/public',
      handler: 'notification.findPublic',
      config: {
        auth: false,
        swagger: {
          tags: ['Notification'],
          security: [],
          description: 'Buscar todas as notificações públicas',
          summary: 'Lista notificações disponíveis publicamente',
          parameters: [
            {
              name: 'page',
              in: 'query',
              description: 'Número da página',
              required: false,
              schema: { type: 'integer', minimum: 1 }
            },
            {
              name: 'pageSize',
              in: 'query',
              description: 'Quantidade de itens por página',
              required: false,
              schema: { type: 'integer', minimum: 1, maximum: 100 }
            }
          ],
          responses: {
            200: {
              description: 'Lista de notificações retornada com sucesso',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      data: {
                        type: 'array',
                        items: {
                          type: 'object',
                          properties: {
                            documentId: { type: 'string', description: 'ID único do documento' },
                            title: { type: 'string', description: 'Título da notificação' },
                            message: { type: 'string', description: 'Mensagem da notificação' },
                            type: { 
                              type: 'string', 
                              enum: ['order_update', 'system', 'delivery'],
                              description: 'Tipo da notificação'
                            },
                            isRead: { type: 'boolean', description: 'Se foi lida' },
                            createdAt: { type: 'string', format: 'date-time' },
                            updatedAt: { type: 'string', format: 'date-time' },
                            publishedAt: { type: 'string', format: 'date-time' }
                          }
                        }
                      },
                      meta: {
                        type: 'object',
                        properties: {
                          pagination: {
                            type: 'object',
                            properties: {
                              page: { type: 'integer' },
                              pageSize: { type: 'integer' },
                              pageCount: { type: 'integer' },
                              total: { type: 'integer' }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    {
      method: 'GET',
      path: '/notifications/public/:documentId',
      handler: 'notification.findOnePublic',
      config: {
        auth: false,
        swagger: {
          tags: ['Notification'],
          security: [],
          description: 'Buscar uma notificação específica',
          summary: 'Retorna detalhes de uma notificação pelo Document ID',
          parameters: [
            {
              name: 'documentId',
              in: 'path',
              description: 'Document ID da notificação',
              required: true,
              schema: { type: 'string' }
            }
          ],
          responses: {
            200: {
              description: 'Notificação encontrada com sucesso',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      data: {
                        type: 'object',
                        properties: {
                          documentId: { type: 'string' },
                          title: { type: 'string' },
                          message: { type: 'string' },
                          type: { type: 'string' },
                          isRead: { type: 'boolean' },
                          createdAt: { type: 'string', format: 'date-time' },
                          updatedAt: { type: 'string', format: 'date-time' },
                          publishedAt: { type: 'string', format: 'date-time' }
                        }
                      }
                    }
                  }
                }
              }
            },
            404: {
              description: 'Notificação não encontrada'
            }
          }
        }
      }
    },
    {
      method: 'GET',
      path: '/notifications/user',
      handler: 'notification.findUserNotifications',
      config: {
        auth: {},
        swagger: {
          tags: ['Notification'],
          security: [],
          description: 'Buscar notificações do usuário autenticado',
          summary: 'Lista todas as notificações do usuário',
          parameters: [
            {
              name: 'page',
              in: 'query',
              description: 'Número da página',
              required: false,
              schema: { type: 'integer', minimum: 1 }
            },
            {
              name: 'pageSize',
              in: 'query',
              description: 'Quantidade de itens por página',
              required: false,
              schema: { type: 'integer', minimum: 1, maximum: 100 }
            }
          ],
          responses: {
            200: {
              description: 'Lista de notificações do usuário retornada com sucesso',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      data: {
                        type: 'array',
                        items: {
                          type: 'object',
                          properties: {
                            documentId: { type: 'string' },
                            title: { type: 'string' },
                            message: { type: 'string' },
                            type: { type: 'string' },
                            isRead: { type: 'boolean' },
                            createdAt: { type: 'string', format: 'date-time' },
                            updatedAt: { type: 'string', format: 'date-time' },
                            publishedAt: { type: 'string', format: 'date-time' }
                          }
                        }
                      },
                      meta: {
                        type: 'object',
                        properties: {
                          pagination: {
                            type: 'object',
                            properties: {
                              page: { type: 'integer' },
                              pageSize: { type: 'integer' },
                              pageCount: { type: 'integer' },
                              total: { type: 'integer' }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    {
      method: 'PUT',
      path: '/notifications/:documentId/read',
      handler: 'notification.markAsReadByDocumentId',
      config: {
        auth: {},
        swagger: {
          tags: ['Notification'],
          security: [],
          description: 'Marcar notificação como lida',
          summary: 'Marca uma notificação específica como lida',
          parameters: [
            {
              name: 'documentId',
              in: 'path',
              description: 'Document ID da notificação',
              required: true,
              schema: { type: 'string' }
            }
          ],
          responses: {
            200: {
              description: 'Notificação marcada como lida com sucesso',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      data: {
                        type: 'object',
                        properties: {
                          documentId: { type: 'string' },
                          title: { type: 'string' },
                          message: { type: 'string' },
                          type: { type: 'string' },
                          isRead: { type: 'boolean', example: true },
                          updatedAt: { type: 'string', format: 'date-time' }
                        }
                      }
                    }
                  }
                }
              }
            },
            404: {
              description: 'Notificação não encontrada'
            }
          }
        }
      }
    }
  ]
};