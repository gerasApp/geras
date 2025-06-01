const { validateSimulationData } = require('../utils/validators');

class SimulationService {
  /**
   * Calcula la simulación de inversión
   * @param {Object} data - Datos de la simulación
   * @param {number} data.initialAmount - Monto inicial
   * @param {number} data.monthlyContribution - Aporte mensual
   * @param {number} data.rate - Tasa de interés anual
   * @param {number} data.months - Duración en meses
   * @returns {Promise<Object>} Resultados de la simulación
   */
  async calculateSimulation(data) {
    // Validar datos de entrada
    validateSimulationData(data);

    const { initialAmount, monthlyContribution, rate, months } = data;
    const monthlyRate = (rate / 100) / 12;
    
    let balance = initialAmount;
    const monthlyResults = [];

    for (let month = 1; month <= months; month++) {
      // Agregar aporte mensual al inicio del mes
      balance += monthlyContribution;
      
      // Calcular intereses del mes (sobre el balance + aporte)
      const monthlyInterest = balance * monthlyRate;
      
      // Agregar intereses al balance
      balance += monthlyInterest;

      monthlyResults.push({
        month,
        balance: Number(balance.toFixed(2)),
        interest: Number(monthlyInterest.toFixed(2)),
        contribution: monthlyContribution
      });
    }

    const totalInvested = initialAmount + (monthlyContribution * months);
    const totalInterest = balance - totalInvested;

    return {
      monthlyResults,
      summary: {
        totalInvested: Number(totalInvested.toFixed(2)),
        totalInterest: Number(totalInterest.toFixed(2)),
        finalBalance: Number(balance.toFixed(2))
      }
    };
  }
}

module.exports = SimulationService; 