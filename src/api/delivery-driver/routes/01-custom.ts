export default {
  routes: [
    {
      method: 'GET',
      path: '/delivery-drivers/public',
      handler: 'delivery-driver.findPublic',
      config: {
        auth: false,
        swagger: {
          tags: ['Delivery-driver'],
          description: 'Buscar todos os entregadores públicos',
          summary: 'Lista entregadores disponíveis publicamente',
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
              description: 'Lista de entregadores retornada com sucesso',
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
                            name: { type: 'string', description: 'Nome do entregador' },
                            phone: { type: 'string', description: 'Telefone do entregador' },
                            vehicleType: { 
                              type: 'string', 
                              enum: ['motorcycle', 'bicycle', 'car'],
                              description: 'Tipo de veículo'
                            },
                            isActive: { type: 'boolean', description: 'Se está ativo' },
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
      path: '/delivery-drivers/public/:documentId',
      handler: 'delivery-driver.findOnePublic',
      config: {
        auth: false,
        swagger: {
          tags: ['Delivery-driver'],
          description: 'Buscar um entregador específico',
          summary: 'Retorna detalhes de um entregador pelo Document ID',
          parameters: [
            {
              name: 'documentId',
              in: 'path',
              description: 'Document ID do entregador',
              required: true,
              schema: { type: 'string' }
            }
          ],
          responses: {
            200: {
              description: 'Entregador encontrado com sucesso',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      data: {
                        type: 'object',
                        properties: {
                          documentId: { type: 'string' },
                          name: { type: 'string' },
                          phone: { type: 'string' },
                          vehicleType: { type: 'string' },
                          isActive: { type: 'boolean' },
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
              description: 'Entregador não encontrado'
            }
          }
        }
      }
    },
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
              description: 'Perfil do entregador retornado com sucesso',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      data: {
                        type: 'object',
                        properties: {
                          documentId: { type: 'string' },
                          name: { type: 'string' },
                          phone: { type: 'string' },
                          vehicleType: { type: 'string' },
                          isActive: { type: 'boolean' },
                          createdAt: { type: 'string', format: 'date-time' },
                          updatedAt: { type: 'string', format: 'date-time' },
                          publishedAt: { type: 'string', format: 'date-time' }
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
              description: 'Lista de pedidos disponíveis retornada com sucesso',
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
                            status: { type: 'string' },
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
              description: 'Lista de entregas retornada com sucesso',
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
                            status: { type: 'string' },
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
    }
  ]
};