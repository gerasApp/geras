import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Simulate from './pages/Simulate';
import Assets from './pages/Assets';

function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Simulador</Link> | <Link to="/activos">Activos</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Simulate />} />
        <Route path="/activos" element={<Assets />} />
      </Routes>
    </Router>
  );
}

export default App;
