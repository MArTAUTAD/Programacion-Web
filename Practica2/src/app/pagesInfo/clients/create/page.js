"use client";

import FormYup from "@/components/FormYup";
import { getFetch } from "@/utils/handlerequests"
import { useState } from "react";
import * as Yup from "yup";
import '@/styles/onboarding.css'


export default function CreateClient() {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
    });

    const paramForm={
            initialValues: {
                firstName: "",
                lastName: "",
                email: "",
                password: "",
            },

            fields: [
                { name: "firstName", type: "text", label: "Nombre del Usuario" },
                { name: "lastName", type: "text", label: "Apellido del Usuario" },
                { name: "email", type: "email", label: "Correo Electrónico" },
                { name: "password", type: "password", label: "Contraseña" },
            ],

            validationSchema: Yup.object({
                firstName: Yup.string().min(3, "Mínimo 3 caracteres").max(20, "Máximo 20 caracteres").required(),
                lastName: Yup.string().min(3, "Mínimo 3 caracteres").max(20, "Máximo 20 caracteres").required(),
                email: Yup.string().email("Correo electrónico inválido").required(),
                password: Yup.string().min(8, "Mínimo 8 caracteres").max(30, "Máximo 30 caracteres").required(),
            }),
        
            // Función que maneja el envío de los datos
            handleSubmit: async (values) => {
              try {
                // Mostrar datos en consola para debug
                console.log("Formulario Enviado:", values);
        
                // Llamar al API para registrar al usuario
                const data = await getFetch("api/user/register", values, "POST");
        
                // Almacenamos el token (en caso de recibirlo, si el backend lo envía)
                if (data && data.token) {
                  localStorage.setItem("jwt", data.token);
                  console.log("Usuario registrado exitosamente", data);
                  // Aquí podrías redirigir a otra página si lo deseas
                } else {
                  console.error("Error al registrar el usuario");
                }
              } catch (error) {
                console.error("Error en el registro:", error.message);
              }
            },
    
      }

    return(
        <div className="form-container">
            <h2 >Crear Cliente</h2>
            <FormYup
            paramsForm={paramForm}
            formData={formData}
            setFormData={setFormData}
            buttonText="Crear cliente"
            ></FormYup>
        </div>
      )
}
