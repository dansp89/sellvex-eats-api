export default {
  routes: [
    {
      method: 'GET',
      path: '/customers/profile',
      handler: 'customer.findProfile',
      config: {
        auth: {},
        swagger: {
          tags: ['Customer'],
          description: 'Buscar perfil do cliente autenticado',
          summary: 'Retorna dados do perfil do cliente',
          responses: {
            200: {
              description: 'Perfil do cliente retornado com sucesso'
            }
          }
        }
      }
    },
    {
      method: 'GET',
      path: '/customers/orders',
      handler: 'customer.findOrders',
      config: {
        auth: {},
        swagger: {
          tags: ['Customer'],
          description: 'Buscar pedidos do cliente autenticado',
          summary: 'Lista todos os pedidos do cliente',
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