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
              name: 'filters[category][documentId]',
              in: 'query',
              description: 'Filtrar por Document ID da categoria',
              required: false,
              schema: { type: 'string' }
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
                            documentId: { type: 'string', description: 'ID único do documento' },
                            name: { type: 'string', description: 'Nome do produto' },
                            description: { type: 'string', description: 'Descrição do produto' },
                            price: { type: 'number', description: 'Preço do produto' },
                            slug: { type: 'string', description: 'Slug para URL amigável' },
                            isAvailable: { type: 'boolean', description: 'Se o produto está disponível' },
                            isFeatured: { type: 'boolean', description: 'Se o produto está em destaque' },
                            preparationTime: { type: 'integer', description: 'Tempo de preparo em minutos' },
                            images: {
                              type: 'array',
                              description: 'Lista de imagens do produto',
                              items: {
                                type: 'object',
                                properties: {
                                  documentId: { type: 'string', description: 'ID do documento da imagem' },
                                  url: { type: 'string', description: 'URL da imagem' },
                                  name: { type: 'string', description: 'Nome do arquivo' },
                                  ext: { type: 'string', description: 'Extensão do arquivo' },
                                  mime: { type: 'string', description: 'Tipo MIME do arquivo' },
                                  size: { type: 'number', description: 'Tamanho do arquivo em bytes' }
                                }
                              }
                            },
                            createdAt: { type: 'string', format: 'date-time', description: 'Data de criação' },
                            updatedAt: { type: 'string', format: 'date-time', description: 'Data de atualização' },
                            publishedAt: { type: 'string', format: 'date-time', description: 'Data de publicação' },
                            category: {
                              type: 'object',
                              nullable: true,
                              description: 'Categoria do produto',
                              properties: {
                                documentId: { type: 'string', description: 'ID do documento da categoria' },
                                name: { type: 'string', description: 'Nome da categoria' },
                                slug: { type: 'string', description: 'Slug da categoria' }
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
                              page: { type: 'integer', description: 'Página atual' },
                              pageSize: { type: 'integer', description: 'Itens por página' },
                              pageCount: { type: 'integer', description: 'Total de páginas' },
                              total: { type: 'integer', description: 'Total de itens' }
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
      path: '/products/public/:documentId',
      handler: 'product.findOnePublic',
      config: {
        auth: false,
        swagger: {
          tags: ['Product'],
          description: 'Buscar um produto específico',
          summary: 'Retorna detalhes de um produto pelo Document ID',
          parameters: [
            {
              name: 'documentId',
              in: 'path',
              description: 'Document ID do produto',
              required: true,
              schema: { type: 'string' }
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
                          documentId: { type: 'string', description: 'ID único do documento' },
                          name: { type: 'string', description: 'Nome do produto' },
                          description: { type: 'string', description: 'Descrição do produto' },
                          price: { type: 'number', description: 'Preço do produto' },
                          slug: { type: 'string', description: 'Slug para URL amigável' },
                          isAvailable: { type: 'boolean', description: 'Se o produto está disponível' },
                          isFeatured: { type: 'boolean', description: 'Se o produto está em destaque' },
                          preparationTime: { type: 'integer', description: 'Tempo de preparo em minutos' },
                          images: {
                            type: 'array',
                            description: 'Lista de imagens do produto',
                            items: {
                              type: 'object',
                              properties: {
                                documentId: { type: 'string', description: 'ID do documento da imagem' },
                                url: { type: 'string', description: 'URL da imagem' },
                                name: { type: 'string', description: 'Nome do arquivo' },
                                ext: { type: 'string', description: 'Extensão do arquivo' },
                                mime: { type: 'string', description: 'Tipo MIME do arquivo' },
                                size: { type: 'number', description: 'Tamanho do arquivo em bytes' }
                              }
                            }
                          },
                          createdAt: { type: 'string', format: 'date-time', description: 'Data de criação' },
                          updatedAt: { type: 'string', format: 'date-time', description: 'Data de atualização' },
                          publishedAt: { type: 'string', format: 'date-time', description: 'Data de publicação' },
                          category: {
                            type: 'object',
                            nullable: true,
                            description: 'Categoria do produto',
                            properties: {
                              documentId: { type: 'string', description: 'ID do documento da categoria' },
                              name: { type: 'string', description: 'Nome da categoria' },
                              slug: { type: 'string', description: 'Slug da categoria' }
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
              description: 'Produto não encontrado',
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
                          message: { type: 'string', example: 'Produto não encontrado' }
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
      path: '/products/public/categories/:documentId',
      handler: 'product.findByCategory',
      config: {
        auth: false,
        swagger: {
          tags: ['Product'],
          description: 'Buscar produtos por categoria',
          summary: 'Lista produtos de uma categoria específica',
          parameters: [
            {
              name: 'documentId',
              in: 'path',
              description: 'Document ID da categoria',
              required: true,
              schema: { type: 'string' }
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
                            documentId: { type: 'string', description: 'ID único do documento' },
                            name: { type: 'string', description: 'Nome do produto' },
                            description: { type: 'string', description: 'Descrição do produto' },
                            price: { type: 'number', description: 'Preço do produto' },
                            slug: { type: 'string', description: 'Slug para URL amigável' },
                            isAvailable: { type: 'boolean', description: 'Se o produto está disponível' },
                            isFeatured: { type: 'boolean', description: 'Se o produto está em destaque' },
                            preparationTime: { type: 'integer', description: 'Tempo de preparo em minutos' },
                            images: {
                              type: 'array',
                              description: 'Lista de imagens do produto',
                              items: {
                                type: 'object',
                                properties: {
                                  documentId: { type: 'string', description: 'ID do documento da imagem' },
                                  url: { type: 'string', description: 'URL da imagem' },
                                  name: { type: 'string', description: 'Nome do arquivo' },
                                  ext: { type: 'string', description: 'Extensão do arquivo' },
                                  mime: { type: 'string', description: 'Tipo MIME do arquivo' },
                                  size: { type: 'number', description: 'Tamanho do arquivo em bytes' }
                                }
                              }
                            },
                            createdAt: { type: 'string', format: 'date-time', description: 'Data de criação' },
                            updatedAt: { type: 'string', format: 'date-time', description: 'Data de atualização' },
                            publishedAt: { type: 'string', format: 'date-time', description: 'Data de publicação' },
                            category: {
                              type: 'object',
                              description: 'Categoria do produto',
                              properties: {
                                documentId: { type: 'string', description: 'ID do documento da categoria' },
                                name: { type: 'string', description: 'Nome da categoria' },
                                slug: { type: 'string', description: 'Slug da categoria' }
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
                              page: { type: 'integer', description: 'Página atual' },
                              pageSize: { type: 'integer', description: 'Itens por página' },
                              pageCount: { type: 'integer', description: 'Total de páginas' },
                              total: { type: 'integer', description: 'Total de itens' }
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
              description: 'Categoria não encontrada ou sem produtos',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      data: { type: 'array', items: {} },
                      meta: {
                        type: 'object',
                        properties: {
                          pagination: {
                            type: 'object',
                            properties: {
                              page: { type: 'integer' },
                              pageSize: { type: 'integer' },
                              pageCount: { type: 'integer' },
                              total: { type: 'integer', example: 0 }
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
}