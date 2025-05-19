const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

let assets = [];

app.post('/simulate', (req, res) => {
  const { initialAmount, monthlyContribution, rate, months } = req.body;
  const points = [];
  let total = initialAmount;

  for (let i = 0; i <= months; i++) {
    if (i > 0) total += monthlyContribution;
    total *= (1 + rate / 100);
    points.push({ month: i, value: parseFloat(total.toFixed(2)) });
  }

  res.json(points);
});

app.get('/assets', (req, res) => {
  res.json(assets);
});

app.post('/assets', (req, res) => {
  const { value, quantity, code, expectedReturn } = req.body;
  const newAsset = { value, quantity, code, expectedReturn };
  assets.push(newAsset);
  res.status(201).json(newAsset);
});

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
    "/simulate": {
      post: {
        summary: "Simular crecimiento de inversión",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  initialAmount: { type: "number" },
                  monthlyContribution: { type: "number" },
                  rate: { type: "number" },
                  months: { type: "number" }
                }
              }
            }
          }
        },
        responses: {
          "200": {
            description: "Resultados de la simulación"
          }
        }
      }
    },
    "/assets": {
      get: {
        summary: "Listar activos",
        responses: {
          "200": {
            description: "Lista de activos"
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
          "201": { description: "Activo creado" }
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
