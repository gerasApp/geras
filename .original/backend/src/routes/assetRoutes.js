const express = require('express');
const assetController = require('../controllers/assetController');
const { API_ROUTES } = require('../../../shared/routes');

const router = express.Router();

/**
 * @swagger
 * /api/assets:
 *   get:
 *     summary: Obtiene todos los activos
 *     tags: [Assets]
 *     responses:
 *       200:
 *         description: Lista de activos obtenida exitosamente
 *       500:
 *         description: Error del servidor
 */
router.get(API_ROUTES.ASSET.GET_ALL, assetController.getAllAssets);

/**
 * @swagger
 * /api/assets:
 *   post:
 *     summary: Crea un nuevo activo
 *     tags: [Assets]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - type
 *               - historicalReturn
 *               - risk
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nombre del activo
 *               type:
 *                 type: string
 *                 enum: [STOCK, BOND, ETF, CRYPTO, MUTUAL_FUND]
 *                 description: Tipo de activo
 *               historicalReturn:
 *                 type: number
 *                 description: Retorno histórico (%)
 *               risk:
 *                 type: string
 *                 enum: [LOW, MEDIUM, HIGH]
 *                 description: Nivel de riesgo
 *               description:
 *                 type: string
 *                 description: Descripción del activo
 *     responses:
 *       201:
 *         description: Activo creado exitosamente
 *       400:
 *         description: Datos de entrada inválidos
 */
router.post(API_ROUTES.ASSET.CREATE, assetController.createAsset);

module.exports = router; 