export default {
  routes: [
    {
      method: 'GET',
      path: '/delivery-zones/public',
      handler: 'delivery-zone.findPublic',
      config: {
        auth: false,
        swagger: {
          tags: ['Delivery-zone'],
          description: 'Buscar zonas de entrega disponíveis',
          summary: 'Lista todas as zonas de entrega ativas',
          responses: {
            200: {
              description: 'Lista de zonas de entrega retornada com sucesso'
            }
          }
        }
      }
    }
  ]
};