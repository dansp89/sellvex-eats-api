export default {
  routes: [
    {
      method: 'GET',
      path: '/users/profile',
      handler: 'user.findProfile',
      config: {
        tags: ['Users-Permissions - Users & Roles'],
        swagger: {
          tags: ['Users-Permissions - Users & Roles'],
          description: 'Buscar perfil do usuário autenticado',
          summary: 'Retorna dados do perfil do usuário',
          responses: {
            200: {
              description: 'Perfil do usuário retornado com sucesso'
            }
          }
        }
      }
    },
    {
      method: 'GET',
      path: '/users/orders',
      handler: 'user.findOrders',
      config: {
        tags: ['Users-Permissions - Users & Roles'],
        swagger: {
          tags: ['Users-Permissions - Users & Roles'],
          description: 'Buscar pedidos do usuário autenticado',
          summary: 'Lista todos os pedidos do usuário',
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
              description: 'Lista de pedidos retornada com sucesso'
            }
          }
        }
      }
    },
    {
      method: 'GET',
      path: '/users/isLoggedIn',
      handler: 'user.isLoggedIn',
      config: {
        tags: ['Users-Permissions - Users & Roles'],
        swagger: {
          tags: ['Users-Permissions - Users & Roles'],
          description: 'Verificar se o usuário está autenticado',
          summary: 'Retorna se o usuário está autenticado',
          responses: {
            200: {
              description: 'Usuário autenticado',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      authenticated: { type: 'boolean' },
                      documentId: { type: 'string' },
                      role: { type: 'string' }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  ]
};
