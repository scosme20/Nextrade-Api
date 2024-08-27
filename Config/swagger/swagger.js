// src/swagger.js
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation',
      version: '1.0.0',
      description: 'Documentação da API',
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 3001}`, // Ajuste a URL conforme necessário
      },
    ],
  },
  apis: ['./api/routes/**/*.js'], // Ajuste o caminho dos arquivos de rota conforme necessário
};

const swaggerSpec = swaggerJsdoc(options);

export default (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

