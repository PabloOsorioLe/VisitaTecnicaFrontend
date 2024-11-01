// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import FormularioIngreso1 from './pages/FormularioIngreso1';
import About from './pages/About1';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container" style={{ display: 'flex' }}>
        <Sidebar />
        <div className="content" style={{ flex: 1, padding: '5px' }}>
          <Routes>
            <Route path="/" element={<FormularioIngreso1 />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
