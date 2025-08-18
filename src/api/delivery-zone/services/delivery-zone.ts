import { factories } from '@strapi/strapi';
import { QueryType } from '~types/app';

export default factories.createCoreService('api::delivery-zone.delivery-zone', ({ strapi }) => ({
  // Método para buscar zonas de entrega públicas usando SQL RAW
  async findPublic(query: QueryType) {
    const page = typeof query.page === 'number' ? query.page : parseInt(query.page || '1', 10) || 1;
    const pageSize = Math.min(
      typeof query.pageSize === 'number' ? query.pageSize : parseInt(query.pageSize || '25', 10) || 25,
      100
    );
    const offset = (page - 1) * pageSize;
    
    // Query para buscar zonas de entrega
    const zonesQuery = `
      SELECT 
        dz.id,
        dz.document_id,
        dz.name,
        dz.description,
        dz.neighborhoods,
        dz.zip_codes,
        dz.coordinates,
        dz.delivery_fee,
        dz.free_delivery_threshold,
        dz.estimated_delivery_time_min,
        dz.estimated_delivery_time_max,
        dz.is_active,
        dz.priority,
        dz.max_distance,
        dz.service_hours_text,
        dz.special_instructions,
        dz.is_emergency_zone,
        dz.created_at,
        dz.updated_at,
        dz.published_at
      FROM delivery_zones dz
      WHERE dz.is_active = true AND dz.published_at IS NOT NULL
      ORDER BY dz.priority DESC, dz.name ASC
      LIMIT ? OFFSET ?
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
      documentId: zone.document_id || `doc_${zone.id}`,
      name: zone.name,
      description: zone.description,
      neighborhoods: zone.neighborhoods,
      zipCodes: zone.zip_codes,
      coordinates: zone.coordinates,
      deliveryFee: parseFloat(zone.delivery_fee),
      freeDeliveryThreshold: zone.free_delivery_threshold ? parseFloat(zone.free_delivery_threshold) : null,
      estimatedDeliveryTimeMin: parseInt(zone.estimated_delivery_time_min),
      estimatedDeliveryTimeMax: parseInt(zone.estimated_delivery_time_max),
      isActive: zone.is_active,
      priority: parseInt(zone.priority),
      maxDistance: zone.max_distance ? parseFloat(zone.max_distance) : null,
      serviceHoursText: zone.service_hours_text,
      specialInstructions: zone.special_instructions,
      isEmergencyZone: zone.is_emergency_zone,
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
  },

  // Método para buscar uma zona de entrega específica por documentId usando SQL RAW
  async findOnePublic(documentId: string) {
    const query = `
      SELECT 
        dz.id,
        dz.document_id,
        dz.name,
        dz.description,
        dz.neighborhoods,
        dz.zip_codes,
        dz.coordinates,
        dz.delivery_fee,
        dz.free_delivery_threshold,
        dz.estimated_delivery_time_min,
        dz.estimated_delivery_time_max,
        dz.is_active,
        dz.priority,
        dz.max_distance,
        dz.service_hours_text,
        dz.special_instructions,
        dz.is_emergency_zone,
        dz.created_at,
        dz.updated_at,
        dz.published_at
      FROM delivery_zones dz
      WHERE dz.document_id = ? AND dz.is_active = true AND dz.published_at IS NOT NULL
    `;

    const result = await strapi.db.connection.raw(query, [documentId]);
    
    if (!result.rows || result.rows.length === 0) {
      return null;
    }

    const zone = result.rows[0];

    return {
      data: {
        documentId: zone.document_id,
        name: zone.name,
        description: zone.description,
        neighborhoods: zone.neighborhoods,
        zipCodes: zone.zip_codes,
        coordinates: zone.coordinates,
        deliveryFee: parseFloat(zone.delivery_fee),
        freeDeliveryThreshold: zone.free_delivery_threshold ? parseFloat(zone.free_delivery_threshold) : null,
        estimatedDeliveryTimeMin: parseInt(zone.estimated_delivery_time_min),
        estimatedDeliveryTimeMax: parseInt(zone.estimated_delivery_time_max),
        isActive: zone.is_active,
        priority: parseInt(zone.priority),
        maxDistance: zone.max_distance ? parseFloat(zone.max_distance) : null,
        serviceHoursText: zone.service_hours_text,
        specialInstructions: zone.special_instructions,
        isEmergencyZone: zone.is_emergency_zone,
        createdAt: zone.created_at,
        updatedAt: zone.updated_at,
        publishedAt: zone.published_at
      }
    };
  }
}));
