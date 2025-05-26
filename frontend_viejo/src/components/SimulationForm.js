import React, { useState } from 'react';
import { createInputStyles, createButtonStyles } from '../styles/theme';

/**
 * Componente que maneja el formulario de simulación de inversiones
 * @param {Object} props - Propiedades del componente
 * @param {Object} props.form - Estado del formulario
 * @param {Function} props.onChange - Manejador de cambios en el formulario
 * @param {Function} props.onSubmit - Manejador de envío del formulario
 * @param {boolean} props.darkMode - Estado del modo oscuro
 */
function SimulationForm({ form, onChange, onSubmit, darkMode }) {
  const inputStyle = createInputStyles(darkMode);
  const buttonStyle = createButtonStyles(darkMode);
  const [errors, setErrors] = useState({});
  
  // Estado para controlar qué tooltip está visible
  const [activeTooltip, setActiveTooltip] = useState(null);

  // Estilos para el tooltip
  const tooltipStyle = (isVisible) => ({
    position: 'absolute',
    top: '-40px',
    right: '0',
    backgroundColor: darkMode ? '#2d2d2d' : '#ffffff',
    color: darkMode ? '#ffffff' : '#000000',
    padding: '8px 12px',
    borderRadius: '6px',
    fontSize: '0.875rem',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    border: `1px solid ${darkMode ? '#404040' : '#e2e8f0'}`,
    zIndex: 10,
    width: 'max-content',
    maxWidth: '200px',
    opacity: isVisible ? 1 : 0,
    visibility: isVisible ? 'visible' : 'hidden',
    transition: 'opacity 0.2s, visibility 0.2s'
  });

  // Estilos para el ícono de información
  const infoIconStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '20px',
    height: '20px',
    borderRadius: '50%',
    backgroundColor: darkMode ? '#404040' : '#e2e8f0',
    color: darkMode ? '#ffffff' : '#4a5568',
    fontSize: '0.75rem',
    marginLeft: '8px',
    cursor: 'help'
  };

  // Estilos para el contenedor del grupo de input
  const inputGroupStyle = {
    position: 'relative'
  };

  // Manejador de cambios personalizado
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Permitir campo vacío
    if (value === '') {
      onChange({ target: { name, value: '' } });
      validateField(name, '');
      return;
    }

    // Remover ceros a la izquierda si hay más de un dígito
    const cleanValue = value.replace(/^0+(?=\d)/, '');
    
    // Validar que sea un número válido y no negativo
    // Permitir números y punto decimal
    if (/^\d*\.?\d*$/.test(cleanValue)) {
      onChange({ target: { name, value: cleanValue } });
      validateField(name, cleanValue === '' ? '' : Number(cleanValue));
    }
  };

  // Validación de campos individuales
  const validateField = (name, value) => {
    const newErrors = { ...errors };
    
    if (name === 'months') {
      if (value === '' || value === 0) {
        newErrors[name] = 'El plazo debe ser mayor a 0';
      } else {
        delete newErrors[name];
      }
    } else {
      if (value < 0) {
        newErrors[name] = 'El valor no puede ser negativo';
      } else {
        delete newErrors[name];
      }
    }

    setErrors(newErrors);
  };

  // Manejador del envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Preparar datos para envío, convirtiendo campos vacíos a 0
    const formData = {
      initialAmount: form.initialAmount === '' ? 0 : Number(form.initialAmount),
      monthlyContribution: form.monthlyContribution === '' ? 0 : Number(form.monthlyContribution),
      rate: form.rate === '' ? 0 : Number(form.rate),
      months: Number(form.months) // El plazo siempre debe ser un número > 0
    };

    // Validar todos los campos antes de enviar
    let hasErrors = false;
    if (formData.months <= 0) {
      setErrors(prev => ({ ...prev, months: 'El plazo debe ser mayor a 0' }));
      hasErrors = true;
    }
    if (formData.initialAmount < 0 || formData.monthlyContribution < 0 || formData.rate < 0) {
      hasErrors = true;
    }

    if (!hasErrors && typeof onSubmit === 'function') {
      onSubmit(formData);
    }
  };

  // Función para mostrar el tooltip
  const showTooltip = (id) => {
    setActiveTooltip(id);
  };

  // Función para ocultar el tooltip
  const hideTooltip = () => {
    setActiveTooltip(null);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div style={inputGroupStyle} className="group relative">
          <div className="flex items-center">
            <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
              Monto Inicial ($)
            </label>
            <div 
              style={infoIconStyle}
              onMouseEnter={() => showTooltip('initial')}
              onMouseLeave={hideTooltip}
            >
              i
            </div>
          </div>
          <input
            style={inputStyle}
            type="text"
            name="initialAmount"
            value={form.initialAmount}
            onChange={handleChange}
            placeholder="0"
            inputMode="decimal"
          />
          {errors.initialAmount && (
            <div className="text-red-500 text-sm mt-1">{errors.initialAmount}</div>
          )}
          <div style={tooltipStyle(activeTooltip === 'initial')}>
            Cantidad inicial para comenzar la inversión (0 o mayor)
          </div>
        </div>

        <div style={inputGroupStyle} className="group relative">
          <div className="flex items-center">
            <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
              Aporte Mensual ($)
            </label>
            <div 
              style={infoIconStyle}
              onMouseEnter={() => showTooltip('monthly')}
              onMouseLeave={hideTooltip}
            >
              i
            </div>
          </div>
          <input
            style={inputStyle}
            type="text"
            name="monthlyContribution"
            value={form.monthlyContribution}
            onChange={handleChange}
            placeholder="0"
            inputMode="decimal"
          />
          {errors.monthlyContribution && (
            <div className="text-red-500 text-sm mt-1">{errors.monthlyContribution}</div>
          )}
          <div style={tooltipStyle(activeTooltip === 'monthly')}>
            Cantidad que aportarás cada mes (0 o mayor)
          </div>
        </div>

        <div style={inputGroupStyle} className="group relative">
          <div className="flex items-center">
            <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
              Tasa de Interés Anual (%)
            </label>
            <div 
              style={infoIconStyle}
              onMouseEnter={() => showTooltip('rate')}
              onMouseLeave={hideTooltip}
            >
              i
            </div>
          </div>
          <input
            style={inputStyle}
            type="text"
            name="rate"
            value={form.rate}
            onChange={handleChange}
            placeholder="0"
            inputMode="decimal"
          />
          {errors.rate && (
            <div className="text-red-500 text-sm mt-1">{errors.rate}</div>
          )}
          <div style={tooltipStyle(activeTooltip === 'rate')}>
            Porcentaje de rendimiento anual esperado (0 o mayor)
          </div>
        </div>

        <div style={inputGroupStyle} className="group relative">
          <div className="flex items-center">
            <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
              Plazo (meses)
            </label>
            <div 
              style={infoIconStyle}
              onMouseEnter={() => showTooltip('duration')}
              onMouseLeave={hideTooltip}
            >
              i
            </div>
          </div>
          <input
            style={inputStyle}
            type="text"
            name="months"
            value={form.months}
            onChange={handleChange}
            placeholder="12"
            inputMode="numeric"
            required
          />
          {errors.months && (
            <div className="text-red-500 text-sm mt-1">{errors.months}</div>
          )}
          <div style={tooltipStyle(activeTooltip === 'duration')}>
            Período total de la inversión en meses (mínimo 1)
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-6">
        <button
          type="submit"
          style={buttonStyle}
          className={`px-6 py-2 rounded ${
            darkMode
              ? 'bg-blue-600 hover:bg-blue-700'
              : 'bg-blue-500 hover:bg-blue-600'
          } text-white`}
        >
          Calcular
        </button>
      </div>
    </form>
  );
}

export default SimulationForm; 