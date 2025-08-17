import { factories } from '@strapi/strapi';

export default factories.createCoreService('plugin::upload.file', {
  async findOnePublic(params) {
    const { uuid } = params;
    const file = await strapi.entityService.findOne('plugin::upload.file', uuid);
    return file;
  },
});