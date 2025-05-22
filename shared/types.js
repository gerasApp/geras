/**
 * @typedef {Object} SimulationRequestDTO
 * @property {number} initialAmount - Monto inicial de la inversión
 * @property {number} monthlyContribution - Aporte mensual
 * @property {number} rate - Tasa de rendimiento anual (%)
 * @property {number} months - Duración en meses
 */

/**
 * @typedef {Object} SimulationPointDTO
 * @property {number} month - Número de mes
 * @property {number} balance - Balance acumulado
 */

/**
 * @typedef {Object} AssetDTO
 * @property {number} value - Valor del activo
 * @property {number} quantity - Cantidad
 * @property {string} code - Código identificador
 * @property {number} expectedReturn - Retorno esperado (%)
 */

module.exports = {
  // Solo para documentación, ya que este archivo se usará tanto en frontend como backend
}; 