import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Simulate from './pages/Simulate';
import Assets from './pages/Assets';

function App() {
  const navStyle = {
    backgroundColor: '#1a1a1a',
    padding: '1rem',
    textAlign: 'center'
  };

  const linkStyle = {
    color: '#fff',
    textDecoration: 'none',
    margin: '0 1rem'
  };
  return (
    <Router>
      <nav>
        <div style={navStyle}>
          <Link style={linkStyle} to="/">Simulador</Link>
          <Link style={linkStyle} to="/activos">Activos</Link>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Simulate />} />
        <Route path="/activos" element={<Assets />} />
      </Routes>
    </Router>
  );
}

export default App;
