export default {
  routes: [
    {
      method: 'GET',
      path: '/reviews/public',
      handler: 'review.findPublic',
      config: {
        auth: false,
        swagger: {
          tags: ['Review'],
          security: [],
          description: 'Buscar avaliações públicas',
          summary: 'Lista todas as avaliações disponíveis',
          responses: {
            200: {
              description: 'Lista de avaliações retornada com sucesso'
            }
          }
        }
      }
    }
  ]
};