import { factories } from '@strapi/strapi';

export default factories.createCoreService('api::setting.setting', ({ strapi }) => ({
  // Método para buscar configurações públicas usando SQL RAW
  async findPublic() {
    const query = `
      SELECT 
        s.id,
        s.key,
        s.value,
        s.is_public,
        s.created_at,
        s.updated_at,
        s.published_at
      FROM settings s
      WHERE s.is_public = true AND s.published_at IS NOT NULL
      ORDER BY s.key ASC
    `;

    const result = await strapi.db.connection.raw(query);

    // Formatando os dados conforme padrão Strapi
    const formattedSettings = result.rows.map(setting => ({
      documentId: setting.document_id || `doc_${setting.id}`,
      key: setting.key,
      value: setting.value,
      isPublic: setting.is_public,
      createdAt: setting.created_at,
      updatedAt: setting.updated_at,
      publishedAt: setting.published_at
    }));

    return {
      data: formattedSettings
    };
  }
}));
