import React, { useState } from 'react';
import SimulationForm from '../components/SimulationForm';
import SimulationChart from '../components/SimulationChart';
import { simulateInvestment } from '../services/api';
import { useDarkModeContext } from '../context/DarkModeContext';

/**
 * Página principal del simulador de inversiones
 * Permite al usuario ingresar parámetros de inversión y visualizar resultados
 */
function Simulate() {
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { darkMode } = useDarkModeContext();

  // Estado inicial del formulario
  const initialForm = {
    initialAmount: 1000,
    monthlyContribution: 100,
    rate: 10,
    months: 12
  };

  const [form, setForm] = useState(initialForm);

  // Datos dummy para el gráfico
  const dummyData = Array.from({ length: 13 }, (_, i) => {
    const balance = initialForm.initialAmount + 
                   (initialForm.monthlyContribution * i) + 
                   ((initialForm.initialAmount + initialForm.monthlyContribution * i) * (initialForm.rate / 100 / 12) * i);
    return {
      month: i,
      balance: parseFloat(balance.toFixed(2))
    };
  });

  // Manejador de cambios en el formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: Number(value)
    }));
  };

  // Manejador de envío del formulario
  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await simulateInvestment(form);
      setResults(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Estilos basados en el modo oscuro
  const containerStyle = {
    backgroundColor: darkMode ? '#1a1a1a' : '#ffffff',
    color: darkMode ? '#ffffff' : '#000000',
    minHeight: '100vh',
    padding: '2rem'
  };

  const cardStyle = {
    backgroundColor: darkMode ? '#2d2d2d' : '#f8f9fa',
    borderRadius: '8px',
    padding: '2rem',
    marginBottom: '2rem',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  };

  return (
    <div style={containerStyle}>
      <div className="container mx-auto">
        <div style={cardStyle}>
          <h1 className="text-2xl font-bold mb-6">Simulador de Inversiones</h1>

          <SimulationForm
            form={form}
            onChange={handleChange}
            onSubmit={handleSubmit}
            darkMode={darkMode}
          />

          {loading && <p>Calculando...</p>}
          
          {error && (
            <div className="text-red-500 mt-4">
              {error}
            </div>
          )}

          {/* Mostrar el gráfico con datos dummy si no hay resultados reales */}
          {!results && <SimulationChart data={dummyData} darkMode={darkMode} form={form} />}

          {results && (
            <>
              <div className="mt-8">
                <h2 className="text-xl font-bold mb-4">Resultados</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className={`p-4 rounded ${darkMode ? 'bg-gray-800' : 'bg-blue-100'}`}>
                    <h3 className="font-bold">Inversión Total</h3>
                    <p>${results.summary.totalInvested.toLocaleString()}</p>
                  </div>
                  <div className={`p-4 rounded ${darkMode ? 'bg-gray-800' : 'bg-green-100'}`}>
                    <h3 className="font-bold">Intereses Ganados</h3>
                    <p>${results.summary.totalInterest.toLocaleString()}</p>
                  </div>
                  <div className={`p-4 rounded ${darkMode ? 'bg-gray-800' : 'bg-purple-100'}`}>
                    <h3 className="font-bold">Balance Final</h3>
                    <p>${results.summary.finalBalance.toLocaleString()}</p>
                  </div>
                </div>
                <SimulationChart data={results.monthlyResults} darkMode={darkMode} form={form} />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Simulate;
