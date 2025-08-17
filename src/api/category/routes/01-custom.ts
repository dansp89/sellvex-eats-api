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
              description: 'Lista de categorias retornada com sucesso'
            }
          }
        }
      }
    },
    {
      method: 'GET',
      path: '/categories/public/:id',
      handler: 'category.findOnePublic',
      config: {
        auth: false,
        swagger: {
          tags: ['Category'],
          description: 'Buscar uma categoria específica',
          summary: 'Retorna detalhes de uma categoria pelo ID',
          parameters: [
            {
              name: 'id',
              in: 'path',
              description: 'ID da categoria',
              required: true,
              schema: { type: 'integer' }
            }
          ],
          responses: {
            200: {
              description: 'Categoria encontrada com sucesso'
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
              description: 'Categoria encontrada com sucesso'
            }
          }
        }
      }
    }
  ]
};