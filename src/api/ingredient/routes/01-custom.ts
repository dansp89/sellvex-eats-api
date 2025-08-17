export default {
  routes: [
    {
      method: 'GET',
      path: '/ingredients/public',
      handler: 'ingredient.findPublic',
      config: {
        auth: false,
        swagger: {
          tags: ['Ingredient'],
          description: 'Buscar ingredientes disponíveis',
          summary: 'Lista todos os ingredientes',
          responses: {
            200: {
              description: 'Lista de ingredientes retornada com sucesso'
            }
          }
        }
      }
    }
  ]
};