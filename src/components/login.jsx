import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/catalogo");
    } catch (error) {
      alert("Correo o contraseña incorrectos");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Iniciar sesión</h2>

        <input
          type="email"
          placeholder="Correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleLogin} className="btn-primary">
          Iniciar sesión
        </button>

        <p className="forgot">¿Olvidaste tu contraseña?</p>

        <p className="register">
          ¿No tienes cuenta?{" "}
          <span onClick={() => navigate("/registro")}>
            Regístrate
          </span>
        </p>
      </div>
    </div>
  );
}