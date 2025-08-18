export default {
  routes: [
    {
      method: 'GET',
      path: '/orders/public/tracking/:trackingNumber',
      handler: 'order.trackOrder',
      config: {
        auth: false,
        swagger: {
          tags: ['Order'],
          description: 'Rastrear um pedido pelo número de rastreamento',
          summary: 'Retorna o status e detalhes de um pedido',
          parameters: [
            {
              name: 'trackingNumber',
              in: 'path',
              description: 'Número de rastreamento do pedido',
              required: true,
              schema: { type: 'string' }
            }
          ],
          responses: {
            200: {
              description: 'Detalhes do pedido retornados com sucesso',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      data: {
                        type: 'object',
                        properties: {
                          id: { type: 'integer' },
                          orderNumber: { type: 'string' },
                          status: { 
                            type: 'string',
                            enum: ['pending', 'confirmed', 'preparing', 'ready', 'out_for_delivery', 'delivered', 'cancelled']
                          },
                          total: { type: 'number' },
                          deliveryAddress: { type: 'string' },
                          user: {
                            type: 'object',
                            properties: {
                              firstName: { type: 'string' },
                              lastName: { type: 'string' },
                              phone: { type: 'string' }
                            }
                          },
                          deliveryDriver: {
                            type: 'object',
                            nullable: true,
                            properties: {
                              firstName: { type: 'string' },
                              lastName: { type: 'string' },
                              phone: { type: 'string' },
                              vehicleType: { type: 'string' }
                            }
                          },
                          createdAt: { type: 'string', format: 'date-time' },
                          updatedAt: { type: 'string', format: 'date-time' }
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
      path: '/orders/user/:id',
      handler: 'order.findOrderForUser',
      config: {
        auth: {},
        swagger: {
          tags: ['Order'],
          description: 'Buscar detalhes de um pedido específico do cliente',
          summary: 'Retorna detalhes completos de um pedido',
          parameters: [
            {
              name: 'id',
              in: 'path',
              description: 'ID do pedido',
              required: true,
              schema: { type: 'integer' }
            }
          ],
          responses: {
            200: {
              description: 'Detalhes do pedido retornados com sucesso'
            }
          }
        }
      }
    },
    {
      method: 'GET',
      path: '/orders/driver/:id',
      handler: 'order.findOrderForDriver',
      config: {
        auth: {},
        swagger: {
          tags: ['Order'],
          description: 'Buscar detalhes de um pedido específico do entregador',
          summary: 'Retorna detalhes completos de um pedido para entregador',
          parameters: [
            {
              name: 'id',
              in: 'path',
              description: 'ID do pedido',
              required: true,
              schema: { type: 'integer' }
            }
          ],
          responses: {
            200: {
              description: 'Detalhes do pedido retornados com sucesso'
            }
          }
        }
      }
    },
    {
      method: 'PUT',
      path: '/orders/driver/:id/status',
      handler: 'order.updateOrderStatus',
      config: {
        auth: {},
        swagger: {
          tags: ['Order'],
          description: 'Atualizar status de um pedido',
          summary: 'Permite ao entregador atualizar o status do pedido',
          parameters: [
            {
              name: 'id',
              in: 'path',
              description: 'ID do pedido',
              required: true,
              schema: { type: 'integer' }
            }
          ],
          requestBody: {
            description: 'Novo status do pedido',
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: {
                      type: 'string',
                      enum: ['out_for_delivery', 'delivered'],
                      description: 'Novo status do pedido'
                    }
                  },
                  required: ['status']
                }
              }
            }
          },
          responses: {
            200: {
              description: 'Status atualizado com sucesso'
            }
          }
        }
      }
    },
    {
      method: 'POST',
      path: '/orders/driver/:id/accept',
      handler: 'order.acceptOrder',
      config: {
        auth: {},
        swagger: {
          tags: ['Order'],
          description: 'Aceitar um pedido para entrega',
          summary: 'Permite ao entregador aceitar um pedido disponível',
          parameters: [
            {
              name: 'id',
              in: 'path',
              description: 'ID do pedido',
              required: true,
              schema: { type: 'integer' }
            }
          ],
          responses: {
            200: {
              description: 'Pedido aceito com sucesso'
            }
          }
        }
      }
    }
  ]
};