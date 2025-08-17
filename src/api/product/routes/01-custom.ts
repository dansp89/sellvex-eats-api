export default {
  routes: [
    {
      method: 'GET',
      path: '/products/public',
      handler: 'product.findPublic',
      config: {
        auth: false,
        swagger: {
          tags: ['Product'],
          description: 'Buscar todos os produtos públicos',
          summary: 'Lista produtos disponíveis publicamente',
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
            },
            {
              name: 'sort',
              in: 'query',
              description: 'Campo para ordenação (ex: name:asc, price:desc)',
              required: false,
              schema: { type: 'string' }
            },
            {
              name: 'filters[category][id]',
              in: 'query',
              description: 'Filtrar por ID da categoria',
              required: false,
              schema: { type: 'integer' }
            },
            {
              name: 'filters[isAvailable]',
              in: 'query',
              description: 'Filtrar por disponibilidade',
              required: false,
              schema: { type: 'boolean' }
            }
          ],
          responses: {
            200: {
              description: 'Lista de produtos retornada com sucesso',
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
                            id: { type: 'integer' },
                            name: { type: 'string' },
                            description: { type: 'string' },
                            price: { type: 'number' },
                            isAvailable: { type: 'boolean' },
                            slug: { type: 'string' },
                            createdAt: { type: 'string', format: 'date-time' },
                            image: {
                              type: 'object',
                              properties: {
                                id: { type: 'integer' },
                                url: { type: 'string' },
                                alternativeText: { type: 'string' }
                              }
                            },
                            category: {
                              type: 'object',
                              properties: {
                                id: { type: 'integer' },
                                name: { type: 'string' },
                                slug: { type: 'string' }
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
            },
          }
        }
      }
    },
    {
      method: 'GET',
      path: '/products/public/:id',
      handler: 'product.findOnePublic',
      config: {
        auth: false,
        swagger: {
          tags: ['Product'],
          description: 'Buscar um produto específico',
          summary: 'Retorna detalhes de um produto pelo ID',
          parameters: [
            {
              name: 'id',
              in: 'path',
              description: 'ID do produto',
              required: true,
              schema: { type: 'integer' }
            }
          ],
          responses: {
            200: {
              description: 'Produto encontrado com sucesso',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      data: {
                        type: 'object',
                        properties: {
                          id: { type: 'integer' },
                          name: { type: 'string' },
                          description: { type: 'string' },
                          price: { type: 'number' },
                          isAvailable: { type: 'boolean' },
                          slug: { type: 'string' },
                          createdAt: { type: 'string', format: 'date-time' },
                          updatedAt: { type: 'string', format: 'date-time' },
                          publishedAt: { type: 'string', format: 'date-time' },
                          image: {
                            type: 'object',
                            properties: {
                              id: { type: 'integer' },
                              url: { type: 'string' },
                              alternativeText: { type: 'string' },
                              caption: { type: 'string' },
                              width: { type: 'integer' },
                              height: { type: 'integer' }
                            }
                          },
                          category: {
                            type: 'object',
                            properties: {
                              id: { type: 'integer' },
                              name: { type: 'string' },
                              slug: { type: 'string' }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
          }
        }
      }
    },
    {
      method: 'GET',
      path: '/products/public/categories/:categoryId',
      handler: 'product.findByCategory',
      config: {
        auth: false,
        swagger: {
          tags: ['Product'],
          description: 'Buscar produtos por categoria',
          summary: 'Lista produtos de uma categoria específica',
          parameters: [
            {
              name: 'categoryId',
              in: 'path',
              description: 'ID da categoria',
              required: true,
              schema: { type: 'integer' }
            },
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
            },
            {
              name: 'sort',
              in: 'query',
              description: 'Campo para ordenação',
              required: false,
              schema: { type: 'string' }
            }
          ],
          responses: {
            200: {
              description: 'Produtos da categoria retornados com sucesso',
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
                            id: { type: 'integer' },
                            name: { type: 'string' },
                            description: { type: 'string' },
                            price: { type: 'number' },
                            isAvailable: { type: 'boolean' },
                            slug: { type: 'string' },
                            createdAt: { type: 'string', format: 'date-time' },
                            image: {
                              type: 'object',
                              properties: {
                                id: { type: 'integer' },
                                url: { type: 'string' },
                                alternativeText: { type: 'string' }
                              }
                            },
                            category: {
                              type: 'object',
                              properties: {
                                id: { type: 'integer' },
                                name: { type: 'string' },
                                slug: { type: 'string' }
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
            },
          }
        }
      }
    }
  ]
}
