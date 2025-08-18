export default {
  routes: [
    {
      method: 'GET',
      path: '/setting/public',
      handler: 'setting.findPublic',
      config: {
        auth: false,
        swagger: {
          tags: ['Setting'],
          security: [],
          description: 'Buscar configurações públicas',
          summary: 'Lista todas as configurações públicas do sistema',
          responses: {
            200: {
              description: 'Lista de configurações retornada com sucesso'
            }
          }
        }
      }
    }
  ]
};