import React, { useState, useEffect } from 'react';
import { getAssets, createAsset } from '../services/api';
import { useDarkModeContext } from '../context/DarkModeContext';

/**
 * Componente para mostrar y gestionar la lista de activos
 */
function Assets() {
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { darkMode } = useDarkModeContext();

  // Estado del formulario para nuevo activo
  const [newAsset, setNewAsset] = useState({
    name: '',
    type: 'STOCK',
    historicalReturn: 0,
    risk: 'MEDIUM',
    description: ''
  });

  // Cargar activos al montar el componente
  useEffect(() => {
    loadAssets();
  }, []);

  // Función para cargar los activos
  const loadAssets = async () => {
    try {
      const data = await getAssets();
      setAssets(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Manejador de cambios en el formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewAsset(prev => ({
      ...prev,
      [name]: name === 'historicalReturn' ? Number(value) : value
    }));
  };

  // Manejador de envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createAsset(newAsset);
      // Limpiar formulario
      setNewAsset({
        name: '',
        type: 'STOCK',
        historicalReturn: 0,
        risk: 'MEDIUM',
        description: ''
      });
      // Recargar lista de activos
      await loadAssets();
    } catch (err) {
      setError(err.message);
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

  const inputStyle = {
    backgroundColor: darkMode ? '#404040' : '#ffffff',
    color: darkMode ? '#ffffff' : '#000000',
    border: `1px solid ${darkMode ? '#666666' : '#cccccc'}`,
    borderRadius: '4px',
    padding: '0.5rem',
    width: '100%',
    marginBottom: '1rem'
  };

  return (
    <div style={containerStyle}>
      <div className="container mx-auto">
        <div style={cardStyle}>
          <h1 className="text-2xl font-bold mb-6">Gestión de Activos</h1>

          {/* Formulario para nuevo activo */}
          <form onSubmit={handleSubmit} className="mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                style={inputStyle}
                type="text"
                name="name"
                value={newAsset.name}
                onChange={handleChange}
                placeholder="Nombre del activo"
                required
              />

              <select
                style={inputStyle}
                name="type"
                value={newAsset.type}
                onChange={handleChange}
                required
              >
                <option value="STOCK">Acción</option>
                <option value="BOND">Bono</option>
                <option value="ETF">ETF</option>
                <option value="CRYPTO">Criptomoneda</option>
                <option value="MUTUAL_FUND">Fondo Mutuo</option>
              </select>

              <input
                style={inputStyle}
                type="number"
                name="historicalReturn"
                value={newAsset.historicalReturn}
                onChange={handleChange}
                placeholder="Retorno histórico (%)"
                required
                min="0"
                step="0.01"
              />

              <select
                style={inputStyle}
                name="risk"
                value={newAsset.risk}
                onChange={handleChange}
                required
              >
                <option value="LOW">Bajo</option>
                <option value="MEDIUM">Medio</option>
                <option value="HIGH">Alto</option>
              </select>

              <textarea
                style={inputStyle}
                name="description"
                value={newAsset.description}
                onChange={handleChange}
                placeholder="Descripción"
                className="md:col-span-2"
              />
            </div>

            <button
              type="submit"
              className={`mt-4 px-6 py-2 rounded ${
                darkMode
                  ? 'bg-blue-600 hover:bg-blue-700'
                  : 'bg-blue-500 hover:bg-blue-600'
              } text-white`}
            >
              Agregar Activo
            </button>
          </form>

          {error && (
            <div className="text-red-500 mb-4">
              {error}
            </div>
          )}

          {loading ? (
            <p>Cargando activos...</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {assets.map(asset => (
                <div
                  key={asset._id}
                  className={`p-4 rounded ${
                    darkMode ? 'bg-gray-800' : 'bg-white'
                  } shadow`}
                >
                  <h3 className="font-bold mb-2">{asset.name}</h3>
                  <p className="text-sm mb-1">Tipo: {asset.type}</p>
                  <p className="text-sm mb-1">Retorno: {asset.historicalReturn}%</p>
                  <p className="text-sm mb-1">Riesgo: {asset.risk}</p>
                  {asset.description && (
                    <p className="text-sm text-gray-600">{asset.description}</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Assets;
