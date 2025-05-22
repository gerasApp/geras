import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Simulate from './pages/Simulate';
import Assets from './pages/Assets';
import { DarkModeProvider } from './context/DarkModeContext';
import { DarkModeToggle } from './components/DarkModeToggle';
import { useDarkModeContext } from './context/DarkModeContext';

// Componente de navegación que usa el contexto de modo oscuro
function Navigation() {
  const { darkMode } = useDarkModeContext();

  const navStyle = {
    backgroundColor: darkMode ? '#1a1a1a' : '#ffffff',
    padding: '1rem',
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  };

  const linkStyle = {
    color: darkMode ? '#fff' : '#000',
    textDecoration: 'none',
    margin: '0 1rem'
  };

  return (
    <nav>
      <div style={navStyle}>
        <div>
          <Link style={linkStyle} to="/">Simulador</Link>
          <Link style={linkStyle} to="/activos">Activos</Link>
        </div>
        <DarkModeToggle />
      </div>
    </nav>
  );
}

function App() {
  return (
    <DarkModeProvider>
      <Router>
        <Navigation />
        <Routes>
          <Route path="/" element={<Simulate />} />
          <Route path="/activos" element={<Assets />} />
        </Routes>
      </Router>
    </DarkModeProvider>
  );
}

export default App;
