export default {
  routes: [
    // Enviar mensagem
    {
      method: 'POST',
      path: '/chat/messages',
      handler: 'chat.sendMessage',
      config: {
        auth: {},
        swagger: {
          tags: ['Chat'],
          description: 'Enviar uma nova mensagem de chat',
          summary: 'Enviar mensagem',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: { type: 'string' },
                    receiverId: { type: 'integer' },
                    orderId: { type: 'integer', nullable: true },
                    attachments: {
                      type: 'array',
                      items: {
                        type: 'object',
                        properties: {
                          name: { type: 'string' },
                          url: { type: 'string' },
                          mime: { type: 'string' },
                          size: { type: 'number' }
                        }
                      }
                    }
                  },
                  required: ['message', 'receiverId']
                }
              }
            }
          },
          responses: {
            200: {
              description: 'Mensagem enviada com sucesso'
            },
            400: {
              description: 'Dados inválidos'
            },
            401: {
              description: 'Não autorizado'
            }
          }
        }
      }
    },

    // Buscar conversa entre dois usuários
    {
      method: 'GET',
      path: '/chat/conversation/:userId',
      handler: 'chat.getConversation',
      config: {
        auth: {},
        swagger: {
          tags: ['Chat'],
          description: 'Buscar conversa entre o usuário autenticado e outro usuário',
          summary: 'Buscar conversa',
          parameters: [
            {
              name: 'userId',
              in: 'path',
              description: 'ID do outro usuário',
              required: true,
              schema: { type: 'integer' }
            },
            {
              name: 'orderId',
              in: 'query',
              description: 'ID do pedido (opcional)',
              required: false,
              schema: { type: 'integer' }
            },
            {
              name: 'page',
              in: 'query',
              description: 'Número da página',
              required: false,
              schema: { type: 'integer', default: 1 }
            },
            {
              name: 'pageSize',
              in: 'query',
              description: 'Itens por página',
              required: false,
              schema: { type: 'integer', default: 20 }
            }
          ],
          responses: {
            200: {
              description: 'Conversa retornada com sucesso'
            },
            401: {
              description: 'Não autorizado'
            }
          }
        }
      }
    },

    // Marcar mensagens como lidas
    {
      method: 'PUT',
      path: '/chat/messages/read',
      handler: 'chat.markAsRead',
      config: {
        auth: {},
        swagger: {
          tags: ['Chat'],
          description: 'Marcar mensagens como lidas',
          summary: 'Marcar mensagens como lidas',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    messageIds: {
                      type: 'array',
                      items: { type: 'integer' }
                    }
                  },
                  required: ['messageIds']
                }
              }
            }
          },
          responses: {
            200: {
              description: 'Mensagens marcadas como lidas com sucesso'
            },
            400: {
              description: 'IDs de mensagens inválidos'
            },
            401: {
              description: 'Não autorizado'
            }
          }
        }
      }
    },

    // Buscar conversas recentes
    {
      method: 'GET',
      path: '/chat/conversations',
      handler: 'chat.getRecentConversations',
      config: {
        auth: {},
        swagger: {
          tags: ['Chat'],
          description: 'Buscar conversas recentes do usuário autenticado',
          summary: 'Buscar conversas recentes',
          parameters: [
            {
              name: 'page',
              in: 'query',
              description: 'Número da página',
              required: false,
              schema: { type: 'integer', default: 1 }
            },
            {
              name: 'pageSize',
              in: 'query',
              description: 'Itens por página',
              required: false,
              schema: { type: 'integer', default: 10 }
            }
          ],
          responses: {
            200: {
              description: 'Conversas recentes retornadas com sucesso'
            },
            401: {
              description: 'Não autorizado'
            }
          }
        }
      }
    }
  ]
};
