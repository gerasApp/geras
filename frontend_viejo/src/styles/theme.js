// Tema central de la aplicación con estilos reutilizables

// Colores base del tema
const colors = {
  primary: {
    main: '#8884d8',
    light: '#a5a1e9',
    dark: '#6b67c7'
  },
  background: {
    light: '#ffffff',
    dark: '#1a1a1a',
    paper: {
      light: '#f5f5f5',
      dark: '#2d2d2d'
    }
  },
  text: {
    light: '#000000',
    dark: '#ffffff'
  },
  error: {
    light: '#dc3545',
    dark: '#ff6b6b'
  },
  border: {
    light: '#cccccc',
    dark: '#404040'
  }
};

// Estilos base para inputs
const createInputStyles = (darkMode) => ({
  backgroundColor: darkMode ? colors.background.paper.dark : colors.background.light,
  color: darkMode ? colors.text.dark : colors.text.light,
  border: `1px solid ${darkMode ? colors.border.dark : colors.border.light}`,
  padding: '8px',
  borderRadius: '4px',
  width: '100%',
  marginBottom: '10px'
});

// Estilos base para botones
const createButtonStyles = (darkMode) => ({
  backgroundColor: colors.primary.main,
  color: colors.text.dark,
  border: 'none',
  padding: '10px 20px',
  borderRadius: '4px',
  cursor: 'pointer',
  width: '100%',
  '&:hover': {
    backgroundColor: colors.primary.dark
  }
});

// Estilos base para contenedores
const createContainerStyles = (darkMode) => ({
  backgroundColor: darkMode ? colors.background.dark : colors.background.light,
  color: darkMode ? colors.text.dark : colors.text.light,
  minHeight: '100vh',
  padding: '20px'
});

// Estilos para el gráfico
const createChartTheme = (darkMode) => ({
  backgroundColor: darkMode ? colors.background.dark : colors.background.light,
  textColor: darkMode ? colors.text.dark : colors.text.light,
  gridColor: darkMode ? '#333333' : colors.border.light,
  lineColor: colors.primary.main
});

export {
  colors,
  createInputStyles,
  createButtonStyles,
  createContainerStyles,
  createChartTheme
}; 