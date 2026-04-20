import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/login";
import Register from "./components/Registro";
import Catalogo from "./components/Catalogo";
import Cita from "./components/Cita";
import MisCitas from "./components/MisCitas";
import AgendarCitas from "./components/AgendarCitas";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/registro" element={<Register />} />
        <Route path="/catalogo" element={<Catalogo />} />
        <Route path="/cita/:id" element={<Cita />} />
        <Route path="/mis-citas" element={<MisCitas />} />
        <Route path="/agendar" element={<AgendarCitas />} />
      </Routes>
    </BrowserRouter>
  );
}
