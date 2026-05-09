// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Importa tus componentes
import Login from './components/Login';
import Registro from './components/Registro';
import Catalogo from './components/Catalogo';
import Cita from './components/Cita';
import Header from './components/Header';
import Footer from './components/Footer';
import AgendarCitas from './components/AgendarCitas';
import TiendaSection from './components/TiendaSection';
import MisCitas from './components/MisCitas'; 


// En tu App.jsx
function App() {
  return (
    <Router>
      {/* ── CONTENEDOR MAESTRO ── */}
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        
        <Header />
        
        {/* EL TRUCO ESTÁ AQUÍ: flexGrow: 1 obliga a que esta sección empuje el footer hacia abajo */}
        <main style={{ flexGrow: 1, paddingBottom: '60px' }}>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/registro" element={<Registro />} />
            <Route path="/catalogo" element={<Catalogo />} />
            <Route path="/cita/:id" element={<Cita />} />
            <Route path="/tienda" element={<TiendaSection />} />
            <Route path="/agendar" element={<AgendarCitas />} />
            <Route path="/mis-citas" element={<MisCitas />} />
          </Routes>
        </main>

        <Footer />
        
      </div>
    </Router>
  );
}

export default App;