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
              description: 'Número de rastreamento do pedido (documentId)',
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
                          documentId: { type: 'string', description: 'ID único do documento' },
                          status: { 
                            type: 'string',
                            enum: ['pending', 'confirmed', 'preparing', 'ready_for_delivery', 'out_for_delivery', 'delivered', 'cancelled', 'refunded'],
                            description: 'Status atual do pedido'
                          },
                          total: { type: 'number', description: 'Valor total do pedido' },
                          subtotal: { type: 'number', description: 'Subtotal do pedido' },
                          deliveryFee: { type: 'number', description: 'Taxa de entrega' },
                          discount: { type: 'number', description: 'Desconto aplicado' },
                          paymentMethod: { 
                            type: 'string', 
                            enum: ['credit_card', 'debit_card', 'pix', 'cash', 'online_payment'],
                            description: 'Método de pagamento'
                          },
                          paymentStatus: {
                            type: 'string',
                            enum: ['pending', 'authorized', 'paid', 'refunded', 'voided', 'error'],
                            description: 'Status do pagamento'
                          },
                          items: { type: 'object', description: 'Itens do pedido' },
                          metadata: { type: 'object', description: 'Metadados adicionais' },
                          customer: {
                            type: 'object',
                            nullable: true,
                            properties: {
                              documentId: { type: 'string', description: 'ID do cliente' },
                              phone: { type: 'string', description: 'Telefone do cliente' }
                            }
                          },
                          deliveryDriver: {
                            type: 'object',
                            nullable: true,
                            properties: {
                              documentId: { type: 'string', description: 'ID do entregador' },
                              name: { type: 'string', description: 'Nome do entregador' },
                              phone: { type: 'string', description: 'Telefone do entregador' },
                              vehicleType: { type: 'string', description: 'Tipo de veículo' }
                            }
                          },
                          createdAt: { type: 'string', format: 'date-time', description: 'Data de criação' },
                          updatedAt: { type: 'string', format: 'date-time', description: 'Data de atualização' },
                          publishedAt: { type: 'string', format: 'date-time', description: 'Data de publicação' }
                        }
                      }
                    }
                  }
                }
              }
            },
            404: {
              description: 'Pedido não encontrado',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      data: { type: 'null' },
                      error: {
                        type: 'object',
                        properties: {
                          status: { type: 'integer', example: 404 },
                          name: { type: 'string', example: 'NotFoundError' },
                          message: { type: 'string', example: 'Pedido não encontrado' }
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
      path: '/orders/public',
      handler: 'order.findPublic',
      config: {
        auth: false,
        swagger: {
          tags: ['Order'],
          description: 'Buscar todos os pedidos públicos',
          summary: 'Lista pedidos disponíveis publicamente',
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
              description: 'Lista de pedidos retornada com sucesso',
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
                            status: { 
                              type: 'string',
                              enum: ['pending', 'confirmed', 'preparing', 'ready_for_delivery', 'out_for_delivery', 'delivered', 'cancelled', 'refunded']
                            },
                            total: { type: 'number' },
                            subtotal: { type: 'number' },
                            deliveryFee: { type: 'number' },
                            discount: { type: 'number' },
                            paymentMethod: { type: 'string' },
                            paymentStatus: { type: 'string' },
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
      path: '/orders/public/:documentId',
      handler: 'order.findOnePublic',
      config: {
        auth: false,
        swagger: {
          tags: ['Order'],
          description: 'Buscar um pedido específico',
          summary: 'Retorna detalhes de um pedido pelo Document ID',
          parameters: [
            {
              name: 'documentId',
              in: 'path',
              description: 'Document ID do pedido',
              required: true,
              schema: { type: 'string' }
            }
          ],
          responses: {
            200: {
              description: 'Pedido encontrado com sucesso',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      data: {
                        type: 'object',
                        properties: {
                          documentId: { type: 'string' },
                          status: { type: 'string' },
                          total: { type: 'number' },
                          subtotal: { type: 'number' },
                          deliveryFee: { type: 'number' },
                          discount: { type: 'number' },
                          paymentMethod: { type: 'string' },
                          paymentStatus: { type: 'string' },
                          items: { type: 'object' },
                          metadata: { type: 'object' },
                          createdAt: { type: 'string', format: 'date-time' },
                          updatedAt: { type: 'string', format: 'date-time' },
                          publishedAt: { type: 'string', format: 'date-time' },
                          customer: {
                            type: 'object',
                            nullable: true,
                            properties: {
                              documentId: { type: 'string' },
                              phone: { type: 'string' }
                            }
                          },
                          deliveryDriver: {
                            type: 'object',
                            nullable: true,
                            properties: {
                              documentId: { type: 'string' },
                              name: { type: 'string' },
                              phone: { type: 'string' },
                              vehicleType: { type: 'string' }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            404: {
              description: 'Pedido não encontrado'
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