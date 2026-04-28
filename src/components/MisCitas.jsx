import { useEffect, useState } from "react";
import { collection, query, where, orderBy, onSnapshot, doc, runTransaction, arrayRemove } from "firebase/firestore";
import { db, auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import styles from "./MisCitas.module.css"; // <--- Importamos el CSS Module

export default function MisCitas() {
  const navigate = useNavigate();
  const [tabActivo, setTabActivo] = useState("pendiente");
  const [citas, setCitas] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const usuario = auth.currentUser;
    if (!usuario) {
      navigate("/");
      return;
    }

    setCargando(true);
    setCitas([]);

    const q = query(
      collection(db, "citas"),
      where("usuario_id", "==", usuario.uid),
      where("estado", "==", tabActivo),
      orderBy("fecha", "asc")
    );

    const cancelarBusqueda = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
      setCitas(data);
      setCargando(false);
    });

    return () => cancelarBusqueda();
  }, [tabActivo, navigate]);

  async function cancelarCita(cita) {
    const confirmar = window.confirm(
      `¿Cancelar tu cita del ${cita.fecha} a las ${cita.hora} con ${cita.barbero_nombre}?`
    );
    if (!confirmar) return;

    try {
      const citaRef = doc(db, "citas", cita.id);
      const disponRef = doc(db, "barberos", cita.barbero_id, "disponibilidad", cita.fecha);

      await runTransaction(db, async (transaction) => {
        transaction.update(citaRef, { estado: "cancelada" });
        transaction.update(disponRef, {
          slots_ocupados: arrayRemove(cita.hora),
        });
      });
    } catch (e) {
      alert("No se pudo cancelar la cita. Intenta de nuevo.");
    }
  }

  function formatearFecha(fechaStr) {
    const [y, m, d] = fechaStr.split("-");
    return new Date(y, m - 1, d).toLocaleDateString("es-CO", {
      weekday: "long", day: "numeric", month: "long"
    });
  }

  const tabs = [
    { valor: "pendiente", etiqueta: "Próximas" },
    { valor: "completada", etiqueta: "Completadas" },
    { valor: "cancelada", etiqueta: "Canceladas" },
  ];

  return (
    <div className="catalog-container">
      <header className="catalog-header">
        <h1><span className="green-badge">Mis Citas</span></h1>
        <p>Administra tus citas y revisa tu historial</p>
      </header>

      {/* TABS */}
      <div className={styles.tabsRow}>
        {tabs.map(tab => (
          <button
            key={tab.valor}
            className={`${styles.tabBtn} ${tabActivo === tab.valor ? styles.active : ""}`}
            onClick={() => setTabActivo(tab.valor)}
          >
            {tab.etiqueta}
          </button>
        ))}
      </div>

      {/* CONTENIDO */}
      {cargando ? (
        <div className={styles.containerCentrado}>
          <p style={{ color: "var(--accent)", fontSize: 18 }}>Cargando...</p>
        </div>
      ) : citas.length === 0 ? (
        <div className={styles.containerCentrado}>
          <div style={{ fontSize: 56, marginBottom: 16 }}>
            {tabActivo === "pendiente" ? "📅" : tabActivo === "completada" ? "✅" : "❌"}
          </div>
          <p className="empty-text">
            {tabActivo === "pendiente"
              ? "No tienes citas próximas."
              : tabActivo === "completada"
              ? "Aún no tienes citas completadas."
              : "No tienes citas canceladas."}
          </p>
          {tabActivo === "pendiente" && (
            <button
              className="btn-primary"
              style={{ marginTop: 24, width: "auto", padding: "12px 28px" }}
              onClick={() => navigate("/agendar")}
            >
              Agendar una cita
            </button>
          )}
        </div>
      ) : (
        <div className={styles.citasGrid}>
          {citas.map(cita => (
            <div key={cita.id} className="barber-card" style={{ textAlign: "left" }}>
              
              <div className={styles.cardHeader}>
                <div>
                  <div style={{ fontSize: 28, marginBottom: 8 }}>💈</div>
                  <h3 style={{ color: "#fff", margin: 0, fontSize: 18 }}>{cita.barbero_nombre}</h3>
                </div>
                <span className={`badge ${
                  cita.estado === "pendiente" ? "pending" : 
                  cita.estado === "completada" ? "done" : styles.badgeCancelada
                }`}>
                  {cita.estado === "pendiente" ? "Próxima"
                    : cita.estado === "completada" ? "Completada"
                    : "Cancelada"}
                </span>
              </div>

              <div className={styles.infoRow}>
                <span className={styles.infoLabel}>Servicio</span>
                <span className={styles.infoValor}>{cita.servicio_nombre}</span>
              </div>
              <div className={styles.infoRow}>
                <span className={styles.infoLabel}>Fecha</span>
                <span className={styles.infoValor}>{formatearFecha(cita.fecha)}</span>
              </div>
              <div className={styles.infoRow}>
                <span className={styles.infoLabel}>Hora</span>
                <span className={styles.infoValor}>{cita.hora}</span>
              </div>
              <div className={styles.infoRow}>
                <span className={styles.infoLabel}>Sede</span>
                <span className={styles.infoValor}>{cita.sede_nombre || "—"}</span>
              </div>
              <div className={`${styles.infoRow} ${styles.noBorder}`}>
                <span className={styles.infoLabel}>Total</span>
                <span className={styles.infoTotal}>
                  ${cita.servicio_precio?.toLocaleString("es-CO")}
                </span>
              </div>

              {cita.estado === "pendiente" && (
                <button
                  className={styles.btnCancelarCita}
                  onClick={() => cancelarCita(cita)}
                >
                  Cancelar cita
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      <div className={styles.footerActions}>
        <button
          className="btn-primary"
          style={{ width: "auto", padding: "14px 36px" }}
          onClick={() => navigate("/agendar")}
        >
          + Agendar nueva cita
        </button>
      </div>
    </div>
  );
}