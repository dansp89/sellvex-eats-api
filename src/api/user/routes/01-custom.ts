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
    },
    {
      method: 'GET',
      path: '/users/check/:field/:value',
      handler: 'user.checkFieldExists',
      config: {
        tags: ['Users-Permissions - Users & Roles'],
        swagger: {
          tags: ['Users-Permissions - Users & Roles'],
          summary: 'Verifica se um valor já existe em um campo específico',
          description: 'Verifica a existência de um valor nos campos: email, cpf, phone ou username',
          parameters: [
            {
              name: 'field',
              in: 'path',
              required: true,
              schema: { 
                type: 'string',
                enum: ['email', 'cpf', 'phone', 'username'],
                example: 'email'
              },
              description: 'Nome do campo a ser verificado',
            },
            {
              name: 'value',
              in: 'path',
              required: true,
              schema: { 
                type: 'string',
                example: 'usuario@exemplo.com'
              },
              description: 'Valor a ser verificado',
            }
          ],
          responses: {
            200: {
              description: 'Sucesso',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      exists: { 
                        type: 'boolean',
                        example: true,
                        description: 'Indica se o valor já existe no campo especificado'
                      },
                      type: {
                        type: 'enum',
                        enum: ['email', 'cpf', 'phone', 'username'],
                        example: 'email',
                        description: 'Tipo do campo verificado'
                      },
                      value: {
                        type: 'string',
                        example: 'usuario@exemplo.com',
                        description: 'Valor verificado'
                      },
                      isLogged: {
                        type: 'boolean',
                        example: true,
                        description: 'Indica se o usuário está autenticado'
                      },
                      isMe: {
                        type: 'boolean',
                        example: true,
                        description: 'Indica se o usuário está autenticado e o valor verificado pertence ao usuário'
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
  ]
};
