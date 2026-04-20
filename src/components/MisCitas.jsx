import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db, auth } from "../firebase";

export default function MisCitas() {
  const [citas, setCitas] = useState([]);

  useEffect(() => {
    const obtenerCitas = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const q = query(
        collection(db, "citas"),
        where("userId", "==", user.uid)
      );

      const snapshot = await getDocs(q);
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));

      setCitas(data);
    };

    obtenerCitas();
  }, []);

  const pendientes = citas.filter(c => c.estado === "pendiente");
  const historial = citas.filter(c => c.estado !== "pendiente");

return (
  <div className="catalog-container">

    <header className="catalog-header">
      <h1>
        <span className="green-badge">Mis Citas</span>
      </h1>
      <p>Administra tus citas pendientes y revisa tu historial</p>
    </header>

    <div className="citas-layout">

      {/* PENDIENTES */}
      <section className="citas-column">
        <h2>Pendientes</h2>

        <div className="citas-scroll">
          {pendientes.length === 0 && (
            <p className="empty-text">No tienes citas pendientes</p>
          )}

          {pendientes.map(cita => (
            <div key={cita.id} className="barber-card">
              <h3>💈 {cita.barbero}</h3>
              <p>📅 {cita.fecha}</p>
              <p>⏰ {cita.hora}</p>
              <span className="badge pending">Pendiente</span>
            </div>
          ))}
        </div>
      </section>

      {/* HISTORIAL */}
      <section className="citas-column">
        <h2>Historial</h2>

        <div className="citas-scroll">
          {historial.length === 0 && (
            <p className="empty-text">Aún no hay historial</p>
          )}

          {historial.map(cita => (
            <div key={cita.id} className="barber-card">
              <h3>💈 {cita.barbero}</h3>
              <p>📅 {cita.fecha}</p>
              <span className="badge done">Completada</span>
            </div>
          ))}
        </div>
      </section>

    </div>

  </div>
);
}