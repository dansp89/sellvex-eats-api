export default {
  routes: [
    {
      method: 'GET',
      path: '/users/profile',
      handler: 'user.findProfile',
      config: {
        auth: {},
        swagger: {
          tags: ['User'],
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
        auth: {},
        swagger: {
          tags: ['User'],
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
    }
  ]
};
