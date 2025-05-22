import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { createChartTheme } from '../styles/theme';

/**
 * Componente que muestra los resultados de la simulación en un gráfico
 * @param {Object} props - Propiedades del componente
 * @param {Array} props.data - Datos de la simulación para mostrar en el gráfico
 * @param {boolean} props.darkMode - Estado del modo oscuro
 * @param {Object} props.form - Estado del formulario para calcular ganancias
 */
function SimulationChart({ data, darkMode, form }) {
  const chartTheme = createChartTheme(darkMode);

  // Si no hay datos o el array está vacío, no renderizamos nada
  if (!data || !Array.isArray(data) || data.length === 0) return null;

  // Verificamos que el último elemento tenga la propiedad balance
  const lastDataPoint = data[data.length - 1];
  if (!lastDataPoint || typeof lastDataPoint.balance === 'undefined') return null;

  // Calculamos el balance final y la ganancia total
  const finalBalance = lastDataPoint.balance;
  const totalContributions = form.initialAmount + (form.monthlyContribution * form.months);
  const totalGains = finalBalance - totalContributions;

  // Formateamos los números para mostrar solo 2 decimales
  const formatNumber = (number) => {
    return typeof number === 'number' ? number.toFixed(2) : '0.00';
  };

  return (
    <div className="mt-12">
      <h3 className={`text-xl font-semibold ${darkMode ? 'text-gray-200' : 'text-gray-900'} mb-4`}>
        Resultados de la Simulación
      </h3>
      
      <div style={{ backgroundColor: chartTheme.backgroundColor, padding: '20px', borderRadius: '8px' }}>
        <LineChart 
          width={800} 
          height={400} 
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke={chartTheme.gridColor} />
          <XAxis 
            dataKey="month" 
            tick={{ fill: chartTheme.textColor }}
            label={{ 
              value: 'Mes', 
              position: 'bottom', 
              fill: chartTheme.textColor 
            }}
          />
          <YAxis 
            tick={{ fill: chartTheme.textColor }}
            label={{ 
              value: 'Balance ($)', 
              angle: -90, 
              position: 'left', 
              fill: chartTheme.textColor 
            }}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: darkMode ? '#2d2d2d' : '#ffffff',
              border: `1px solid ${darkMode ? '#404040' : '#cccccc'}`,
              color: darkMode ? '#ffffff' : '#000000'
            }}
            formatter={(value) => [`$${formatNumber(value)}`, 'Balance']}
          />
          <Legend wrapperStyle={{ color: chartTheme.textColor }} />
          <Line 
            type="monotone" 
            dataKey="balance" 
            stroke={chartTheme.lineColor}
            name="Balance"
            strokeWidth={2}
            dot={{ r: 4 }}
          />
        </LineChart>
      </div>

      <div className={`mt-4 text-center ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
        <p>Balance Final: ${formatNumber(finalBalance)}</p>
        <p>Ganancia Total: ${formatNumber(totalGains)}</p>
      </div>
    </div>
  );
}

export default SimulationChart; 