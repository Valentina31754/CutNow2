import { useNavigate } from "react-router-dom";

export default function Catalogo() {
  const navigate = useNavigate(); 

  return (
    <div className="catalog-container">
      
      {/*header*/}
      <header className="catalog-header">
        <h1>
          <span className="green-badge">Catálogo de Barberos</span>
        </h1>
        <p>Selecciona un barbero y agenda tu cita</p>
      </header>

      {/*tarjetas*/}
      <section className="card-grid">
        {[1,2,3,4,5,6].map(i => (
          <div key={i} className="barber-card placeholder">
            <div className="avatar">💈</div>
            <h3>Próximamente</h3>
            <p>Barbero disponible pronto</p>
            <button disabled>Agendar</button>
          </div>
        ))}
      </section>

      {/*ver las citas*/}
      <section className="cta-section">
        <button
          className="btn-primary big"
          onClick={() => navigate("/mis-citas")}
        >
          Ver mis citas
        </button>
      </section>

      {/* Acción principal */}
      <section className="cta-section">
        <button className="btn-primary big"
        onClick={() => navigate("/agendar")}>

          Agendar cita rápida
        </button>
      </section>

    </div>
  );
}