export default {
  routes: [
    {
      method: 'GET',
      path: '/openapi/:version?',
      handler: 'upload.openapi',
    },
    {
      method: 'GET',
      path: '/uploads/public/:uuid',
      handler: 'upload.findOnePublic',
      config: {
        auth: false,
        swagger: {
          tags: ['Upload - File'],
          security: [],
          description: 'Buscar um upload público',
          summary: 'Retorna um upload público',
          parameters: [
            {
              name: 'uuid',
              in: 'path',
              description: 'UUID do upload',
              required: true,
              schema: { type: 'string' }
            }
          ]
        }
      },
    },
  ],
};