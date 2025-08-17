import { getCustomSwaggerPaths } from 'strapi-swagger-custom-paths';

export default () => ({
  documentation: {
    enabled: true,
    config: {
      openapi: "3.0.0",
      info: {
        version: "1.0.0",
        title: "Sellvex Eats API",
        description: "API REST para o sistema de delivery Sellvex Eats",
        termsOfService: "https://sellvex.com.br/app/sellvex-eats/terms",
        contact: {
          name: "Team",
          email: "daniel.rootdir@gmail.com",
          url: "https://sellvex.com.br"
        },
        license: {
          name: "Apache 2.0",
          url: "https://www.apache.org/licenses/LICENSE-2.0.html"
        }
      },
      "x-strapi-config": {
        plugins: ["upload", "users-permissions"],
        path: "/documentation"
      },
      servers: [
        {
          url: "http://localhost:4010/api",
          description: "Servidor de desenvolvimento"
        },
        {
            url: "https://api-eats.sellvex.com.br/api",
            description: "Servidor de produção"
          }
      ],
      externalDocs: {
        description: "Documentação Sellvex Eats",
        url: "https://sellvex.com.br/app/sellvex-eats/docs"
      },
      security: [
        {
          bearerAuth: []
        }
      ],
      paths: getCustomSwaggerPaths(),
    }
  },
});