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
          security: [],
          description: 'Buscar todas as zonas de entrega públicas',
          summary: 'Lista zonas de entrega disponíveis publicamente',
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
              description: 'Lista de zonas de entrega retornada com sucesso',
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
                            name: { type: 'string', description: 'Nome da zona de entrega' },
                            description: { type: 'string', description: 'Descrição da zona' },
                            neighborhoods: { type: 'array', description: 'Lista de bairros' },
                            zipCodes: { type: 'array', description: 'Lista de CEPs' },
                            coordinates: { type: 'object', description: 'Coordenadas da zona' },
                            deliveryFee: { type: 'number', description: 'Taxa de entrega' },
                            freeDeliveryThreshold: { type: 'number', nullable: true, description: 'Valor mínimo para frete grátis' },
                            estimatedDeliveryTimeMin: { type: 'integer', description: 'Tempo mínimo de entrega (minutos)' },
                            estimatedDeliveryTimeMax: { type: 'integer', description: 'Tempo máximo de entrega (minutos)' },
                            isActive: { type: 'boolean', description: 'Se está ativa' },
                            priority: { type: 'integer', description: 'Prioridade da zona' },
                            maxDistance: { type: 'number', nullable: true, description: 'Distância máxima (km)' },
                            serviceHoursText: { type: 'string', description: 'Horário de funcionamento' },
                            specialInstructions: { type: 'string', description: 'Instruções especiais' },
                            isEmergencyZone: { type: 'boolean', description: 'Se é zona de emergência' },
                            createdAt: { type: 'string', format: 'date-time' },
                            updatedAt: { type: 'string', format: 'date-time' },
                            publishedAt: { type: 'string', format: 'date-time' }
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
      path: '/delivery-zones/public/:documentId',
      handler: 'delivery-zone.findOnePublic',
      config: {
        auth: false,
        swagger: {
          tags: ['Delivery-zone'],
          security: [],
          description: 'Buscar uma zona de entrega específica',
          summary: 'Retorna detalhes de uma zona de entrega pelo Document ID',
          parameters: [
            {
              name: 'documentId',
              in: 'path',
              description: 'Document ID da zona de entrega',
              required: true,
              schema: { type: 'string' }
            }
          ],
          responses: {
            200: {
              description: 'Zona de entrega encontrada com sucesso',
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
                          description: { type: 'string' },
                          neighborhoods: { type: 'array' },
                          zipCodes: { type: 'array' },
                          coordinates: { type: 'object' },
                          deliveryFee: { type: 'number' },
                          freeDeliveryThreshold: { type: 'number', nullable: true },
                          estimatedDeliveryTimeMin: { type: 'integer' },
                          estimatedDeliveryTimeMax: { type: 'integer' },
                          isActive: { type: 'boolean' },
                          priority: { type: 'integer' },
                          maxDistance: { type: 'number', nullable: true },
                          serviceHoursText: { type: 'string' },
                          specialInstructions: { type: 'string' },
                          isEmergencyZone: { type: 'boolean' },
                          createdAt: { type: 'string', format: 'date-time' },
                          updatedAt: { type: 'string', format: 'date-time' },
                          publishedAt: { type: 'string', format: 'date-time' }
                        }
                      }
                    }
                  }
                }
              }
            },
            404: {
              description: 'Zona de entrega não encontrada'
            }
          }
        }
      }
    }
  ]
};