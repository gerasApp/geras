const express = require('express');
const simulationController = require('../controllers/simulationController');
const { API_ROUTES } = require('../../../shared/routes');

const router = express.Router();

/**
 * @swagger
 * /api/simulations/calculate:
 *   post:
 *     summary: Calcula una simulación de inversión
 *     tags: [Simulations]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - initialAmount
 *               - monthlyContribution
 *               - rate
 *               - months
 *             properties:
 *               initialAmount:
 *                 type: number
 *                 description: Monto inicial de la inversión
 *               monthlyContribution:
 *                 type: number
 *                 description: Aporte mensual
 *               rate:
 *                 type: number
 *                 description: Tasa de interés anual (%)
 *               months:
 *                 type: integer
 *                 description: Duración en meses
 *     responses:
 *       200:
 *         description: Simulación calculada exitosamente
 *       400:
 *         description: Datos de entrada inválidos
 */
router.post(API_ROUTES.SIMULATION.CALCULATE, simulationController.simulate);

module.exports = router; 