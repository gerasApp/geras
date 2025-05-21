import React, { useState } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

function Simulate() {
  const [form, setForm] = useState({
    initialAmount: 1000,
    monthlyContribution: 100,
    rate: 2,
    months: 12,
  });
  const [darkMode, setDarkMode] = useState(true);
  const pageStyle = {
    backgroundColor: darkMode ? '#1a1a1a' : '#ffffff',
    color: darkMode ? '#ffffff' : '#000000',
    minHeight: '100vh',
    padding: '20px'
  };

  const formStyle = {
    backgroundColor: darkMode ? '#2d2d2d' : '#f5f5f5',
    padding: '20px',
    borderRadius: '8px',
    marginBottom: '20px'
  };

  const inputStyle = {
    backgroundColor: darkMode ? '#404040' : '#ffffff',
    color: darkMode ? '#ffffff' : '#000000',
    border: darkMode ? '1px solid #404040' : '1px solid #cccccc',
    padding: '8px',
    borderRadius: '4px',
    width: '100%',
    marginBottom: '10px'
  };

  const buttonStyle = {
    backgroundColor: darkMode ? '#8884d8' : '#8884d8',
    color: '#ffffff',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '4px',
    cursor: 'pointer',
    width: '100%'
  };

  const labelStyle = {
    color: darkMode ? '#ffffff' : '#000000',
    marginBottom: '5px',
    display: 'block'
  };
  const toggleStyle = {
    backgroundColor: darkMode ? '#404040' : '#ffffff',
    color: darkMode ? '#ffffff' : '#000000',
    border: darkMode ? '1px solid #404040' : '1px solid #cccccc',
    padding: '10px 20px',
    borderRadius: '4px',
    cursor: 'pointer',
    position: 'absolute',
    top: '20px',
    right: '20px'
  };

  const errorStyle = {
    color: darkMode ? '#ff6b6b' : '#dc3545',
    fontSize: '14px',
    marginTop: '5px',
    marginBottom: '10px'
  };

  const resultStyle = {
    backgroundColor: darkMode ? '#2d2d2d' : '#f5f5f5',
    padding: '20px',
    borderRadius: '8px',
    marginTop: '20px',
    color: darkMode ? '#ffffff' : '#000000'
  };

  // Apply dark mode styles to chart
  const chartTheme = {
    backgroundColor: darkMode ? '#1a1a1a' : '#ffffff',
    textColor: darkMode ? '#ffffff' : '#000000',
    gridColor: darkMode ? '#333333' : '#cccccc',
    lineColor: darkMode ? '#8884d8' : '#8884d8'
  };
  const tooltipStyle = {
    backgroundColor: darkMode ? '#2d2d2d' : '#ffffff',
    border: darkMode ? '1px solid #404040' : '1px solid #cccccc',
    color: darkMode ? '#ffffff' : '#000000',
    padding: '10px',
    borderRadius: '4px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  };

  // Style object for chart container
  const chartContainerStyle = {
    backgroundColor: chartTheme.backgroundColor,
    padding: '20px',
    borderRadius: '8px'
  };

  const [data, setData] = useState([]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: Number(e.target.value) });
  };
  const validateForm = () => {
    const errors = {};
    
    if (form.initialAmount < 0) {
      errors.initialAmount = 'El monto inicial no puede ser negativo';
    }
    
    if (form.monthlyContribution < 0) {
      errors.monthlyContribution = 'El aporte mensual no puede ser negativo'; 
    }

    if (form.rate < 0 || form.rate > 100) {
      errors.rate = 'La tasa debe estar entre 0 y 100%';
    }

    if (form.months < 1) {
      errors.months = 'El plazo debe ser de al menos 1 mes';
    }

    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();
    
    if (Object.keys(errors).length === 0) {
      simulate();
    } else {
      // Could add error state and display these to user
      console.error('Validation errors:', errors);
    }
  };
  const renderChart = () => {
    // Apply dark mode styles to chart elements
    if (data && data.length > 0) {
      const textColor = darkMode ? 'text-gray-200' : 'text-gray-900';
      const tooltipStyle = {
        backgroundColor: darkMode ? '#1f2937' : '#ffffff',
        border: 'none',
        borderRadius: '6px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        color: darkMode ? '#e5e7eb' : '#1f2937'
      };

      return (
        <div className="mt-8">
          <h3 className={`text-xl font-semibold ${textColor} mb-4`}>Resultados de la Simulación</h3>
          <div style={chartContainerStyle}>
            <LineChart width={800} height={400} data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={chartTheme.gridColor} />
              <XAxis 
                dataKey="month" 
                label={{ value: 'Mes', position: 'bottom', fill: chartTheme.textColor }} 
                tick={{ fill: chartTheme.textColor }}
              />
              <YAxis 
                label={{ value: 'Balance ($)', angle: -90, position: 'left', fill: chartTheme.textColor }}
                tick={{ fill: chartTheme.textColor }}
              />
              <Tooltip 
                contentStyle={tooltipStyle}
                labelStyle={{ color: chartTheme.textColor }}
              />
              <Legend wrapperStyle={{ color: chartTheme.textColor }} />
              <Line type="monotone" dataKey="balance" stroke={chartTheme.lineColor} name="Balance" />
            </LineChart>
          </div>
          <div className={`mt-4 text-center ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            <p>Balance Final: ${data[data.length - 1].balance.toFixed(2)}</p>
            <p>Ganancia Total: ${(data[data.length - 1].balance - (form.initialAmount + (form.monthlyContribution * form.months))).toFixed(2)}</p>
          </div>
        </div>
      );
    }
    if (data && data.length > 0) {
      return (
        <div className="mt-8">
          <h3 className={`text-xl font-semibold ${darkMode ? 'text-gray-200' : 'text-gray-900'} mb-4`}>Resultados de la Simulación</h3>
          <LineChart width={800} height={400} data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={chartTheme.gridColor} />
            <XAxis 
              dataKey="month" 
              label={{ value: 'Mes', position: 'bottom', fill: chartTheme.textColor }}
              tick={{ fill: chartTheme.textColor }}
            />
            <YAxis 
              label={{ value: 'Balance ($)', angle: -90, position: 'left', fill: chartTheme.textColor }}
              tick={{ fill: chartTheme.textColor }}
            />
            <Tooltip 
              contentStyle={tooltipStyle}
              labelStyle={{ color: chartTheme.textColor }}
            />
            <Legend wrapperStyle={{ color: chartTheme.textColor }} />
            <Line type="monotone" dataKey="balance" stroke={chartTheme.lineColor} name="Balance" />
          </LineChart>
          <div className={`mt-4 text-center ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            <p>Balance Final: ${data[data.length - 1].balance.toFixed(2)}</p>
            <p>Ganancia Total: ${(data[data.length - 1].balance - (form.initialAmount + (form.monthlyContribution * form.months))).toFixed(2)}</p>
          </div>
        </div>
      );
    }
    return null;
  };

  const simulate = () => {
    axios.post('http://localhost:3001/simulate', form)
      .then(res => setData(res.data))
      .catch(err => console.error(err));
  };
    return (
        <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} py-12`}>
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg p-6`}>
                    <h2 className={`text-3xl font-bold ${darkMode ? 'text-gray-100' : 'text-gray-900'} mb-8 text-center`}>Simulador de Inversión</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        <div className="group relative">
                            <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                                Monto Inicial
                            </label>
                            <input
                                className={`block w-full px-4 py-3 rounded-md border ${darkMode ? 'bg-gray-700 border-gray-600 text-gray-100' : 'bg-white border-gray-300 text-gray-900'} focus:ring-blue-500 focus:border-blue-500`}
                                type="number"
                                name="initialAmount"
                                value={form.initialAmount}
                                onChange={handleChange}
                            />
                            <div className="absolute invisible group-hover:visible -top-8 right-0">
                                <div className={`${darkMode ? 'bg-gray-700' : 'bg-gray-800'} text-white text-xs rounded py-1 px-2`}>
                                    Cantidad inicial para comenzar la inversión
                                </div>
                            </div>
                        </div>
                        <div className="group relative">
                            <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                                Aporte Mensual
                            </label>
                            <input
                                className={`block w-full px-4 py-3 rounded-md border ${darkMode ? 'bg-gray-700 border-gray-600 text-gray-100' : 'bg-white border-gray-300 text-gray-900'} focus:ring-blue-500 focus:border-blue-500`}
                                type="number"
                                name="monthlyContribution"
                                value={form.monthlyContribution}
                                onChange={handleChange}
                            />
                            <div className="absolute invisible group-hover:visible -top-8 right-0">
                                <div className={`${darkMode ? 'bg-gray-700' : 'bg-gray-800'} text-white text-xs rounded py-1 px-2`}>
                                    Cantidad que aportarás cada mes
                                </div>
                            </div>
                        </div>
                        <div className="group relative">
                            <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                                % Ganancia
                            </label>
                            <input
                                className={`block w-full px-4 py-3 rounded-md border ${darkMode ? 'bg-gray-700 border-gray-600 text-gray-100' : 'bg-white border-gray-300 text-gray-900'} focus:ring-blue-500 focus:border-blue-500`}
                                type="number"
                                name="rate"
                                value={form.rate}
                                onChange={handleChange}
                            />
                            <div className="absolute invisible group-hover:visible -top-8 right-0">
                                <div className={`${darkMode ? 'bg-gray-700' : 'bg-gray-800'} text-white text-xs rounded py-1 px-2`}>
                                    Porcentaje de rendimiento anual esperado
                                </div>
                            </div>
                        </div>
                        <div className="group relative">
                            <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                                Duración (meses)
                            </label>
                            <input
                                className={`block w-full px-4 py-3 rounded-md border ${darkMode ? 'bg-gray-700 border-gray-600 text-gray-100' : 'bg-white border-gray-300 text-gray-900'} focus:ring-blue-500 focus:border-blue-500`}
                                type="number"
                                name="months"
                                value={form.months}
                                onChange={handleChange}
                            />
                            <div className="absolute invisible group-hover:visible -top-8 right-0">
                                <div className={`${darkMode ? 'bg-gray-700' : 'bg-gray-800'} text-white text-xs rounded py-1 px-2`}>
                                    Período total de la inversión en meses
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-center">
                        <button
                            onClick={simulate}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-8 py-3 rounded-md transition duration-200 ease-in-out transform hover:scale-105"
                        >
                            Simular Inversión
                        </button>
                    </div>

                    {data.length > 0 && (
                        <div className="mt-12 overflow-x-auto">
                            <LineChart 
                                width={800} 
                                height={400} 
                                data={data} 
                                className="mx-auto"
                                margin={{
                                    top: 5,
                                    right: 30,
                                    left: 20,
                                    bottom: 5,
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3" stroke={chartTheme.gridColor} />
                                <XAxis dataKey="month" tick={{ fill: chartTheme.textColor }} />
                                <YAxis tick={{ fill: chartTheme.textColor }} />
                                <Tooltip contentStyle={tooltipStyle} />
                                <Legend wrapperStyle={{ color: chartTheme.textColor }} />
                                <Line 
                                    type="monotone" 
                                    dataKey="value" 
                                    stroke={chartTheme.lineColor}
                                    strokeWidth={2}
                                    dot={{ r: 4 }}
                                />
                            </LineChart>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Simulate;
