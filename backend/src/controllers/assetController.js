const AssetService = require('../services/assetService');

class AssetController {
  constructor() {
    this.assetService = new AssetService();
  }

  /**
   * Obtiene todos los activos
   * @param {import('express').Request} req - Request de Express
   * @param {import('express').Response} res - Response de Express
   */
  getAllAssets = async (req, res) => {
    try {
      const assets = await this.assetService.getAllAssets();
      res.json(assets);
    } catch (error) {
      res.status(500).json({
        error: error.message || 'Error al obtener los activos'
      });
    }
  };

  /**
   * Crea un nuevo activo
   * @param {import('express').Request} req - Request de Express
   * @param {import('express').Response} res - Response de Express
   */
  createAsset = async (req, res) => {
    try {
      const assetData = req.body;
      const newAsset = await this.assetService.createAsset(assetData);
      res.status(201).json(newAsset);
    } catch (error) {
      res.status(400).json({
        error: error.message || 'Error al crear el activo'
      });
    }
  };
}

module.exports = new AssetController(); 