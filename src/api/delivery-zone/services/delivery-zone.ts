import { factories } from '@strapi/strapi';

export default factories.createCoreService('api::delivery-zone.delivery-zone', ({ strapi }) => ({
  // Método para buscar zonas de entrega públicas usando SQL RAW
  async findPublic(params: any = {}) {
    const page = parseInt(params.page) || 1;
    const pageSize = Math.min(parseInt(params.pageSize) || 25, 100);
    const offset = (page - 1) * pageSize;
    
    // Query para buscar zonas de entrega
    const zonesQuery = `
      SELECT 
        dz.id,
        dz.name,
        dz.polygon_coordinates,
        dz.delivery_fee,
        dz.estimated_time,
        dz.is_active,
        dz.created_at,
        dz.updated_at,
        dz.published_at
      FROM delivery_zones dz
      WHERE dz.is_active = true AND dz.published_at IS NOT NULL
      ORDER BY dz.name ASC
      LIMIT $1 OFFSET $2
    `;

    // Query para contar total
    const countQuery = `
      SELECT COUNT(*) as total
      FROM delivery_zones dz
      WHERE dz.is_active = true AND dz.published_at IS NOT NULL
    `;

    const [zones, countResult] = await Promise.all([
      strapi.db.connection.raw(zonesQuery, [pageSize, offset]),
      strapi.db.connection.raw(countQuery)
    ]);

    const total = parseInt(countResult.rows[0].total);
    const pageCount = Math.ceil(total / pageSize);

    // Formatando os dados conforme padrão Strapi
    const formattedZones = zones.rows.map(zone => ({
      id: zone.id,
      documentId: `doc_${zone.id}`,
      name: zone.name,
      polygonCoordinates: zone.polygon_coordinates,
      deliveryFee: parseFloat(zone.delivery_fee),
      estimatedTime: parseInt(zone.estimated_time),
      isActive: zone.is_active,
      createdAt: zone.created_at,
      updatedAt: zone.updated_at,
      publishedAt: zone.published_at
    }));

    return {
      data: formattedZones,
      meta: {
        pagination: {
          page,
          pageSize,
          pageCount,
          total
        }
      }
    };
  }
}));
