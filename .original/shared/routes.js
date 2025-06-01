/**
 * Rutas de la API
 */
const API_ROUTES = {
  // Ruta base de la API
  BASE: '/api',

  // Rutas de simulación
  SIMULATION: {
    BASE: '/simulations',
    CALCULATE: '/calculate'
  },

  // Rutas de activos
  ASSET: {
    BASE: '/assets',
    GET_ALL: '/',
    GET_BY_ID: '/:id',
    CREATE: '/',
    UPDATE: '/:id',
    DELETE: '/:id'
  }
};

/**
 * Obtiene la ruta completa para la API
 * @param {...string} parts - Partes de la ruta a combinar
 * @returns {string} Ruta completa
 */
const getFullRoute = (...parts) => {
  return parts.join('').replace(/\/+/g, '/');
};

// Rutas completas para el backend
const BACKEND_ROUTES = {
  SIMULATION: {
    CALCULATE: getFullRoute(API_ROUTES.BASE, API_ROUTES.SIMULATION.BASE, API_ROUTES.SIMULATION.CALCULATE)
  },
  ASSET: {
    GET_ALL: getFullRoute(API_ROUTES.BASE, API_ROUTES.ASSET.BASE, API_ROUTES.ASSET.GET_ALL),
    CREATE: getFullRoute(API_ROUTES.BASE, API_ROUTES.ASSET.BASE, API_ROUTES.ASSET.CREATE)
  }
};

// Rutas completas para el frontend (con URL base)
const getFrontendRoutes = (baseUrl = 'http://localhost:3001') => ({
  SIMULATION: {
    CALCULATE: `${baseUrl}${BACKEND_ROUTES.SIMULATION.CALCULATE}`
  },
  ASSET: {
    GET_ALL: `${baseUrl}${BACKEND_ROUTES.ASSET.GET_ALL}`,
    CREATE: `${baseUrl}${BACKEND_ROUTES.ASSET.CREATE}`
  }
});

module.exports = {
  API_ROUTES,
  BACKEND_ROUTES,
  getFrontendRoutes
}; 