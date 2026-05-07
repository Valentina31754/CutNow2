import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export default function Catalogo() {
  const navigate = useNavigate();
  const [barberos, setBarberos] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    async function cargarBarberos() {
      const snap = await getDocs(collection(db, "Barberos"));
      setBarberos(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      setCargando(false);
    }
    cargarBarberos();
  }, []);

  return (
    <div className="catalog-container">
      
      {/* HEADER */}
      <header className="catalog-header">
        <h1>
          <span className="green-badge">Catálogo de Barberos</span>
        </h1>
        <p>Selecciona un barbero y agenda tu cita</p>
      </header>

      {/* TARJETAS */}
      <section className="card-grid">
        {cargando && <p>Cargando barberos...</p>}

        {!cargando && barberos.length === 0 && (
          <p>No hay barberos registrados</p>
        )}

        {barberos.map(barbero => (
          <div key={barbero.id} className="barber-card">
            <div className="avatar">
              <img
                src={barbero.foto}
                alt={barbero.Nombre}
                style={{ width: "80px", height: "80px", borderRadius: "50%" }}
              />
            </div>

            <h3>{barbero.Nombre}</h3>
            <p>{barbero.especialidad || "Barbero profesional"}</p>

            {/* BOTÓN VERDE */}
            <button
              className="btn-primary"
              onClick={() =>
                navigate("/agendar", {
                  state: { barberoSeleccionado: barbero }
                })
              }
            >
              Agendar
            </button>
          </div>
        ))}
      </section>

      {/* BOTONES CENTRADOS */}
      <section
        className="cta-section"
        style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "16px" }}
      >
        <button
          className="btn-primary big"
          onClick={() => navigate("/mis-citas")}
        >
          Ver mis citas
        </button>

        <button
          className="btn-primary big"
          onClick={() => navigate("/agendar")}
        >
          Agendar cita rápida
        </button>

        <button
          className="btn-primary big"
          onClick={() => navigate("/tienda")}
        >
          Visitar tienda
        </button>
      </section>
    </div>
  );
}