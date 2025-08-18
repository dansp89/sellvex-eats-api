export default {
  routes: [
    {
      method: 'GET',
      path: '/categories/public',
      handler: 'category.findPublic',
      config: {
        auth: false,
        swagger: {
          tags: ['Category'],
          security: [],
          description: 'Buscar todas as categorias públicas',
          summary: 'Lista categorias disponíveis publicamente',
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
              description: 'Lista todas as categorias públicas',
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
                            name: { type: 'string' },
                            slug: { type: 'string' },
                            description: { type: 'string' },
                            createdAt: { type: 'string' },
                            updatedAt: { type: 'string' },
                            publishedAt: { type: 'string' },
                            productCount: { type: 'integer' },
                            image: {
                              type: 'object',
                              properties: {
                                documentId: { type: 'string' },
                                url: { type: 'string' },
                                name: { type: 'string' },
                                ext: { type: 'string' },
                                mime: { type: 'string' },
                                size: { type: 'integer' }
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
      path: '/categories/public/:documentId',
      handler: 'category.findOnePublic',
      config: {
        auth: false,
        swagger: {
          tags: ['Category'],
          security: [],
          description: 'Buscar uma categoria específica',
          summary: 'Retorna detalhes de uma categoria pelo Document ID',
          parameters: [
            {
              name: 'documentId',
              in: 'path',
              description: 'Document ID da categoria',
              required: true,
              schema: { type: 'string' }
            }
          ],
          responses: {
            200: {
              description: 'Retorna detalhes de uma categoria pelo Document ID',
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
                          slug: { type: 'string' },
                          description: { type: 'string' },
                          createdAt: { type: 'string' },
                          updatedAt: { type: 'string' },
                          publishedAt: { type: 'string' },
                          productCount: { type: 'integer' },
                          image: {
                            type: 'object',
                            properties: {
                              documentId: { type: 'string' },
                              url: { type: 'string' },
                              name: { type: 'string' },
                              ext: { type: 'string' },
                              mime: { type: 'string' },
                              size: { type: 'integer' }
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
      path: '/categories/public/slug/:slug',
      handler: 'category.findBySlug',
      config: {
        auth: false,
        swagger: {
          tags: ['Category'],
          security: [],
          description: 'Buscar uma categoria pelo slug',
          summary: 'Retorna detalhes de uma categoria pelo slug',
          parameters: [
            {
              name: 'slug',
              in: 'path',
              description: 'Slug da categoria',
              required: true,
              schema: { type: 'string' }
            }
          ],
          responses: {
            200: {
              description: 'Retorna detalhes de uma categoria pelo slug',
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
                          slug: { type: 'string' },
                          description: { type: 'string' },
                          createdAt: { type: 'string' },
                          updatedAt: { type: 'string' },
                          publishedAt: { type: 'string' },
                          productCount: { type: 'integer' },
                          image: {
                            type: 'object',
                            properties: {
                              documentId: { type: 'string' },
                              url: { type: 'string' },
                              name: { type: 'string' },
                              ext: { type: 'string' },
                              mime: { type: 'string' },
                              size: { type: 'integer' }
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