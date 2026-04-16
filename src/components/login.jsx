import { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import app from "../firebase";
import "./Login.css";

function Login({ onIrARegistro }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const Auth = getAuth(app);  // ← las variables y funciones van AQUÍ arriba


  const auth = getAuth(app);

  const handleLogin = () => {
    if (!email || !password) {
      alert("Completa todos los campos");
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then((user) => {
        console.log("Logueado:", user);
      })
      .catch((error) => {
        alert("Error: " + error.message);
      });
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Iniciar sesión</h2>

        <input
          type="email"
          placeholder="Correo electrónico"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Contraseña"
          onChange={(e) => setPassword(e.target.value)}
        />

        <p className="forgot">¿Olvidaste tu contraseña?</p>

        <button onClick={handleLogin}>Iniciar sesión</button>

         <p className="register">
          ¿No tienes cuenta? <span onClick={onIrARegistro}>Regístrate</span>
        </p>
      </div>
    </div>
  );
}

export default Login;