const { getFrontendRoutes } = require('../shared/routes');

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';
const ROUTES = getFrontendRoutes(API_BASE_URL);

/**
 * Realiza una simulación de inversión
 * @param {Object} data - Datos de la simulación
 * @returns {Promise<Object>} Resultado de la simulación
 */
export const simulateInvestment = async (data) => {
  try {
    const response = await fetch(ROUTES.SIMULATION.CALCULATE, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Error al realizar la simulación');
    }

    return await response.json();
  } catch (error) {
    throw new Error(error.message || 'Error al conectar con el servidor');
  }
};

/**
 * Obtiene todos los activos
 * @returns {Promise<Array>} Lista de activos
 */
export const getAssets = async () => {
  try {
    const response = await fetch(ROUTES.ASSET.GET_ALL);
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Error al obtener los activos');
    }

    return await response.json();
  } catch (error) {
    throw new Error(error.message || 'Error al conectar con el servidor');
  }
};

/**
 * Crea un nuevo activo
 * @param {Object} data - Datos del activo
 * @returns {Promise<Object>} Activo creado
 */
export const createAsset = async (data) => {
  try {
    const response = await fetch(ROUTES.ASSET.CREATE, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Error al crear el activo');
    }

    return await response.json();
  } catch (error) {
    throw new Error(error.message || 'Error al conectar con el servidor');
  }
}; 