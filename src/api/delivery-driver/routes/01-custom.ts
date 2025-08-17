export default {
  routes: [
    {
      method: 'GET',
      path: '/delivery-drivers/profile',
      handler: 'delivery-driver.findProfile',
      config: {
        auth: {},
        swagger: {
          tags: ['Delivery-driver'],
          description: 'Buscar perfil do entregador autenticado',
          summary: 'Retorna dados do perfil do entregador',
          responses: {
            200: {
              description: 'Perfil do entregador retornado com sucesso'
            }
          }
        }
      }
    },
    {
      method: 'GET',
      path: '/delivery-drivers/orders/available',
      handler: 'delivery-driver.findAvailableOrders',
      config: {
        auth: {},
        swagger: {
          tags: ['Delivery-driver'],
          description: 'Buscar pedidos disponíveis para entrega',
          summary: 'Lista pedidos que podem ser aceitos pelo entregador',
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
              description: 'Lista de pedidos disponíveis retornada com sucesso'
            }
          }
        }
      }
    },
    {
      method: 'GET',
      path: '/delivery-drivers/deliveries',
      handler: 'delivery-driver.findMyDeliveries',
      config: {
        auth: {},
        swagger: {
          tags: ['Delivery-driver'],
          description: 'Buscar entregas do entregador autenticado',
          summary: 'Lista todas as entregas do entregador',
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
              description: 'Lista de entregas retornada com sucesso'
            }
          }
        }
      }
    }
  ]
};