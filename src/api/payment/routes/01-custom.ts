export default {
  routes: [
    {
      method: 'GET',
      path: '/payments/user',
      handler: 'payment.findUserPayments',
      config: {
        auth: {},
        swagger: {
          tags: ['Payment'],
          description: 'Buscar histórico de pagamentos do cliente',
          summary: 'Lista todos os pagamentos realizados pelo cliente autenticado',
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
              description: 'Histórico de pagamentos retornado com sucesso'
            }
          }
        }
      }
    }
  ]
};