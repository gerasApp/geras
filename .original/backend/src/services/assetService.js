const { validateAssetData } = require('../utils/validators');
const db = require('./inMemoryDb');

class AssetService {
  /**
   * Obtiene todos los activos disponibles
   * @returns {Promise<Array>} Lista de activos
   */
  async getAllAssets() {
    try {
      return db.findAll();
    } catch (error) {
      throw new Error('Error al obtener los activos');
    }
  }

  /**
   * Crea un nuevo activo
   * @param {Object} assetData - Datos del activo
   * @param {string} assetData.name - Nombre del activo
   * @param {string} assetData.type - Tipo de activo
   * @param {number} assetData.historicalReturn - Retorno histórico
   * @param {string} assetData.risk - Nivel de riesgo
   * @returns {Promise<Object>} Activo creado
   */
  async createAsset(assetData) {
    // Validar datos del activo
    validateAssetData(assetData);

    try {
      return db.save(assetData);
    } catch (error) {
      throw new Error('Error al crear el activo');
    }
  }

  /**
   * Obtiene un activo por su ID
   * @param {string} id - ID del activo
   * @returns {Promise<Object>} Activo encontrado
   */
  async getAssetById(id) {
    try {
      const asset = db.findById(id);
      if (!asset) {
        throw new Error('Activo no encontrado');
      }
      return asset;
    } catch (error) {
      throw new Error('Error al obtener el activo');
    }
  }
}

module.exports = AssetService; 