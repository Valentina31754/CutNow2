import React, { useState } from "react";
import Login from "./components/login.jsx";
import Register from "./components/Registro.jsx";

function App() {
  // Estado que decide qué pantalla mostrar
  const [pantalla, setPantalla] = useState("login");


 return (
    <>
      {pantalla === "login" && (
        <Login onIrARegistro={() => setPantalla("registro")} />
      )}
      {pantalla === "registro" && (
        <Register onIrALogin={() => setPantalla("login")} />
      )}
    </>
  );
}

export default App;