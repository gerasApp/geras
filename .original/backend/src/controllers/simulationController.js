const SimulationService = require('../services/simulationService');

class SimulationController {
  constructor() {
    this.simulationService = new SimulationService();
  }

  /**
   * Maneja la solicitud de simulación de inversión
   * @param {import('express').Request} req - Request de Express
   * @param {import('express').Response} res - Response de Express
   */
  simulate = async (req, res) => {
    try {
      const simulationData = req.body;
      
      // Verificar que hay datos en el body
      if (!simulationData || Object.keys(simulationData).length === 0) {
        return res.status(400).json({
          error: 'No se proporcionaron datos para la simulación'
        });
      }

      const results = await this.simulationService.calculateSimulation(simulationData);
      return res.json(results);
    } catch (error) {
      console.error('Error en simulación:', error);
      return res.status(400).json({
        error: error.message || 'Error al realizar la simulación'
      });
    }
  };
}

module.exports = new SimulationController(); 