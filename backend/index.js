const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const routes = require('./src/routes');
const { API_ROUTES } = require('../shared/routes');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Montar todas las rutas bajo /api
app.use(API_ROUTES.BASE, routes);

// Swagger config
const swaggerDocument = {
  openapi: "3.0.0",
  info: {
    title: "API de Retiro",
    version: "1.0.0",
    description: "Documentación de la API para simulación y gestión de activos"
  },
  servers: [{ url: "http://localhost:3001" }],
  paths: {
    "/api/simulations/calculate": {
      post: {
        summary: "Simular crecimiento de inversión",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  initialAmount: { 
                    type: "number",
                    description: "Monto inicial de la inversión"
                  },
                  monthlyContribution: { 
                    type: "number",
                    description: "Aporte mensual"
                  },
                  rate: { 
                    type: "number",
                    description: "Tasa de rendimiento anual (%)"
                  },
                  months: { 
                    type: "number",
                    description: "Duración en meses"
                  }
                }
              }
            }
          }
        },
        responses: {
          "200": {
            description: "Resultados de la simulación",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      month: {
                        type: "number",
                        description: "Número de mes"
                      },
                      balance: {
                        type: "number",
                        description: "Balance acumulado"
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
    "/api/assets": {
      get: {
        summary: "Listar activos",
        responses: {
          "200": {
            description: "Lista de activos",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      value: { type: "number" },
                      quantity: { type: "number" },
                      code: { type: "string" },
                      expectedReturn: { type: "number" }
                    }
                  }
                }
              }
            }
          }
        }
      },
      post: {
        summary: "Agregar activo",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  value: { type: "number" },
                  quantity: { type: "number" },
                  code: { type: "string" },
                  expectedReturn: { type: "number" }
                }
              }
            }
          }
        },
        responses: {
          "201": { 
            description: "Activo creado",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    value: { type: "number" },
                    quantity: { type: "number" },
                    code: { type: "string" },
                    expectedReturn: { type: "number" }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
};
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
  console.log(`Swagger disponible en http://localhost:${PORT}/api-docs`);
});
