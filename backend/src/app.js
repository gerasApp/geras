const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const routes = require('./routes');

// Inicializar express
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Debug middleware para ver las rutas que se están llamando
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Configuración de Swagger
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Simulación de Inversiones',
      version: '1.0.0',
      description: 'API para simular inversiones y gestionar activos financieros',
    },
    servers: [
      {
        url: 'http://localhost:3001',
        description: 'Servidor de desarrollo',
      },
    ],
  },
  apis: ['./src/routes/*.js'], // Rutas donde buscar anotaciones de Swagger
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Rutas
app.use('/api', routes);

// Manejo de errores
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).json({
    error: 'Error interno del servidor',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Iniciar servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
  console.log(`Documentación de la API disponible en http://localhost:${PORT}/api-docs`);
  
  // Imprimir las rutas disponibles
  console.log('\nRutas disponibles:');
  console.log('POST /api/simulations/calculate');
  console.log('GET /api/assets');
  console.log('POST /api/assets');
}); 