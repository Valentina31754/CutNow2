// src/components/Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Layout.css'; // Usaremos un solo archivo CSS para Header y Footer

const Header = () => {
  return (
    <header className="main-header">
      <div className="header-container">
        {/* Logo */}
        <Link to="/" className="header-logo">
          Cut<span className="text-green">Now</span>
        </Link>

        {/* Enlaces de navegación */}
        <nav className="header-nav">
          <Link to="/catalogo" className="nav-link">Inicio</Link>
          <Link to="/tienda" className="nav-link">Tienda</Link>
          <Link to="/mis-citas" className="nav-link">Mis Citas</Link>
          <Link to="/agendar" className="nav-btn-agendar">Agendar Cita</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;