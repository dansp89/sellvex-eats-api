export default {
  routes: [
    {
      method: 'GET',
      path: '/payments/public',
      handler: 'payment.findPublic',
      config: {
        auth: false,
        swagger: {
          tags: ['Payment'],
          description: 'Buscar todos os pagamentos públicos',
          summary: 'Lista pagamentos disponíveis publicamente',
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
              description: 'Lista de pagamentos retornada com sucesso',
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
                            amount: { type: 'number', description: 'Valor do pagamento' },
                            method: { 
                              type: 'string', 
                              enum: ['credit_card', 'debit_card', 'pix', 'cash'],
                              description: 'Método de pagamento'
                            },
                            status: { 
                              type: 'string', 
                              enum: ['pending', 'completed', 'failed', 'refunded'],
                              description: 'Status do pagamento'
                            },
                            transactionId: { type: 'string', description: 'ID da transação' },
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
                            }
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
      path: '/payments/public/:documentId',
      handler: 'payment.findOnePublic',
      config: {
        auth: false,
        swagger: {
          tags: ['Payment'],
          description: 'Buscar um pagamento específico',
          summary: 'Retorna detalhes de um pagamento pelo Document ID',
          parameters: [
            {
              name: 'documentId',
              in: 'path',
              description: 'Document ID do pagamento',
              required: true,
              schema: { type: 'string' }
            }
          ],
          responses: {
            200: {
              description: 'Pagamento encontrado com sucesso',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      data: {
                        type: 'object',
                        properties: {
                          documentId: { type: 'string' },
                          amount: { type: 'number' },
                          method: { type: 'string' },
                          status: { type: 'string' },
                          transactionId: { type: 'string' },
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
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            404: {
              description: 'Pagamento não encontrado'
            }
          }
        }
      }
    },
    {
      method: 'GET',
      path: '/payments/user',
      handler: 'payment.findUserPayments',
      config: {
        auth: {},
        swagger: {
          tags: ['Payment'],
          description: 'Buscar pagamentos do usuário autenticado',
          summary: 'Lista todos os pagamentos do usuário',
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
              description: 'Lista de pagamentos do usuário retornada com sucesso',
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
                            amount: { type: 'number' },
                            method: { type: 'string' },
                            status: { type: 'string' },
                            transactionId: { type: 'string' },
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