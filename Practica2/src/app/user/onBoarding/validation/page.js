"use client";

import FormYup from "@/components/FormYup";
import { getFetch } from "@/utils/handlerequests";
import { useState } from "react";
import * as Yup from "yup";

export default function Validation({ onValidation }) {
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const [codeInputs, setCodeInputs] = useState(["", "", "", ""]);

    // Maneja el cambio en cada input individual del código
    const handleInputChange = (index, value) => {
        if (!/^\d*$/.test(value)) return; // Permitir solo números
        const newCodeInputs = [...codeInputs];
        newCodeInputs[index] = value.slice(0, 1); // Solo un carácter por input
        setCodeInputs(newCodeInputs);

        // Enfocar automáticamente el siguiente input
        if (value && index < 3) {
            const nextInput = document.getElementById(`code-input-${index + 1}`);
            nextInput?.focus();
        }
    };

    const handleSubmit = async () => {
        const token = localStorage.getItem("jwt");
        if (!token) {
            setErrorMessage("No se encontró un token. Por favor, inicie sesión.");
            return;
        }

        // Combinar los inputs en un solo código
        const code = codeInputs.join("");

        // Validar manualmente antes de enviar
        if (code.length !== 4 || !/^\d+$/.test(code)) {
            setErrorMessage("El código debe tener exactamente 4 dígitos numéricos.");
            return;
        }

        try {
            const data = await getFetch("api/user/validation", { code }, "PUT", {
                Authorization: `Bearer ${token}`,
            });

            setSuccessMessage("Correo verificado exitosamente.");
            setErrorMessage("");
        } catch (error) {
            setSuccessMessage("");
            setErrorMessage(error.message || "Error al verificar el correo.");
        }
    };

    return (
        <div>
            <h2>Validar Código</h2>
            <div style={{ display: "flex", gap: "10px" }}>
                {codeInputs.map((value, index) => (
                    <input
                        key={index}
                        id={`code-input-${index}`}
                        type="text"
                        maxLength="1"
                        value={value}
                        onChange={(e) => handleInputChange(index, e.target.value)}
                        style={{
                            width: "40px",
                            height: "40px",
                            textAlign: "center",
                            fontSize: "18px",
                        }}
                    />
                ))}
            </div>
            <button onClick={handleSubmit} style={{ marginTop: "20px" }}>
                Validar código
            </button>

            {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        </div>
    );
}
