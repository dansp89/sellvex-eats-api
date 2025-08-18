import { factories } from '@strapi/strapi';
import fs from 'fs';
import path from 'path';

export default factories.createCoreController('plugin::upload.file', {
    async openapi(ctx) {
        let { version } = ctx.params;
        version = version || '1.0.0';
        
        try {
            const filePath = path.join(__dirname, `../../../../src/extensions/documentation/documentation/${version}/full_documentation.json`);
            console.log('Lendo arquivo:', filePath);
            
            // Ler o arquivo JSON
            const jsonContent = fs.readFileSync(filePath, 'utf8');
            const documentation = JSON.parse(jsonContent);
            
            // Definir o content-type correto
            ctx.set('Content-Type', 'application/json');
            
            return ctx.send(documentation);
        } catch (error) {
            console.error('Erro ao ler documentação:', error);
            return ctx.send({ error: 'Documentação não encontrada' }, 404);
        }
    },
    async findOnePublic(ctx) {
        const { uuid } = ctx.params;
        const file = await strapi.service('plugin::upload.file').findOnePublic({ uuid });
        return file;
    }
});