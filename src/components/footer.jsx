// src/components/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Layout.css';

const Footer = () => {
  return (
    <footer className="main-footer">
      <div className="footer-container">
        
        {/* Columna 1: Marca */}
        <div className="footer-col">
          <h2 className="footer-logo">Cut<span className="text-green">Now</span></h2>
          <p className="footer-description">
            Tu estilo, tu tiempo. La experiencia de barbería de élite llevada al siguiente nivel.
          </p>
        </div>

        {/* Columna 2: Enlaces Rápidos */}
        <div className="footer-col">
          <h3 className="footer-title">Explorar</h3>
          <ul className="footer-links">
            <li><Link to="/tienda">Nuestra Tienda</Link></li>
            <li><Link to="/agendar">Agendar Cita</Link></li>
            <li><Link to="/mis-citas">Mis Citas</Link></li>
          </ul>
        </div>

        {/* Columna 3: Contacto */}
        <div className="footer-col">
          <h3 className="footer-title">Contáctanos</h3>
          <ul className="footer-contact">
            <li>📍 Calle Principal 123, Ciudad</li>
            <li>📞 +57 300 123 4567</li>
            <li>✉️ contacto@cutnow.com</li>
          </ul>
        </div>
      </div>
      
      {/* Copyright */}
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} CutNow. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;