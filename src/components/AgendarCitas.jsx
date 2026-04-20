import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AgendarCitas.css";

export default function AgendarCitas() {
    const navigate = useNavigate();
    const {Nombre, setNombre} = useState("");
    const [Hora, setHora] = useState("");
    const {fecha, setFecha} = useState("");
    
    return(

        <div ID="reservasContainer">
            <header className="header">
            
            <input
                type="text"
                placeholder="ingresa tu nombre"
                />
            <input
                type="date"
                placeholder="Fecha"/>
            <input
                type="time"/>
            

            </header>


        </div>
    )

}