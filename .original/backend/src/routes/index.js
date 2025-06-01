const express = require('express');
const simulationRoutes = require('./simulationRoutes');
const assetRoutes = require('./assetRoutes');
const { API_ROUTES } = require('../../../shared/routes');

const router = express.Router();

// Rutas de simulación
router.use(API_ROUTES.SIMULATION.BASE, simulationRoutes);

// Rutas de activos
router.use(API_ROUTES.ASSET.BASE, assetRoutes);

module.exports = router; 