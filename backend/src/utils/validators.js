/**
 * Valida los datos de simulación
 * @param {Object} data - Datos a validar
 * @throws {Error} Si los datos son inválidos
 */
const validateSimulationData = (data) => {
  const { initialAmount, monthlyContribution, rate, months } = data;

  // Convertir valores vacíos o undefined a 0
  const validatedData = {
    initialAmount: initialAmount === undefined || initialAmount === '' ? 0 : Number(initialAmount),
    monthlyContribution: monthlyContribution === undefined || monthlyContribution === '' ? 0 : Number(monthlyContribution),
    rate: rate === undefined || rate === '' ? 0 : Number(rate),
    months: Number(months)
  };

  // Validar que los valores sean números
  if (isNaN(validatedData.initialAmount) || isNaN(validatedData.monthlyContribution) || 
      isNaN(validatedData.rate) || isNaN(validatedData.months)) {
    throw new Error('Todos los campos deben ser valores numéricos');
  }

  // Validar que no sean negativos
  if (validatedData.initialAmount < 0) {
    throw new Error('El monto inicial no puede ser negativo');
  }

  if (validatedData.monthlyContribution < 0) {
    throw new Error('El aporte mensual no puede ser negativo');
  }

  if (validatedData.rate < 0) {
    throw new Error('La tasa de interés no puede ser negativa');
  }

  // Validar que el plazo sea mayor a 0
  if (validatedData.months < 1) {
    throw new Error('La duración debe ser de al menos 1 mes');
  }

  // Devolver los datos validados y convertidos
  return validatedData;
};

/**
 * Valida los datos de un activo
 * @param {Object} data - Datos a validar
 * @throws {Error} Si los datos son inválidos
 */
const validateAssetData = (data) => {
  const { name, type, historicalReturn, risk } = data;

  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    throw new Error('El nombre del activo es requerido y debe ser una cadena válida');
  }

  const validTypes = ['STOCK', 'BOND', 'ETF', 'CRYPTO', 'MUTUAL_FUND'];
  if (!type || !validTypes.includes(type.toUpperCase())) {
    throw new Error(`El tipo de activo debe ser uno de: ${validTypes.join(', ')}`);
  }

  if (typeof historicalReturn !== 'number' || historicalReturn < 0) {
    throw new Error('El retorno histórico debe ser un número no negativo');
  }

  const validRisks = ['LOW', 'MEDIUM', 'HIGH'];
  if (!risk || !validRisks.includes(risk.toUpperCase())) {
    throw new Error(`El nivel de riesgo debe ser uno de: ${validRisks.join(', ')}`);
  }
};

module.exports = {
  validateSimulationData,
  validateAssetData
}; 