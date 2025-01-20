"use client";

import FormYup from "@/components/FormYup";
import { getFetch } from "@/utils/handlerequests"
import { useState } from "react";
import * as Yup from "yup";
import '@/styles/onboarding.css'

export default function Register({onRegister,onLoginClick}){
    const [formData, setFormData] = useState({firstName: "",lastName: "",email: "", password: "",});
    // const data= getFetch("api/user/register", formData, "POST");
    

    const paramForm={
      initialValues: { ...formData },
      fields : [
      { name: "firstName", type: "text", label: "Nombre del Usuario" },
      { name: "lastName", type: "text", label: "Apellido del Usuario" },
      { name: "email", type: "email", label: "Correo Electrónico" },
      { name: "password", type: "password", label: "Contraseña" },
      ],

      validationSchema : Yup.object({
        firstName: Yup.string().min(3, "Mínimo 3 caracteres").max(20, "Máximo 20 caracteres").required(),
        lastName: Yup.string().min(3, "Mínimo 3 caracteres").max(20, "Máximo 20 caracteres").required(),
        email: Yup.string().email('no es valido').required(),
        password: Yup.string().min(8, 'minimo 8 caracteres').max(30, 'maximo 30 caracteres').required()
      }),

    
      handleSubmit : async (values) => {
        try {
            console.log("Formulario Enviado:", values);
            const { email, password } = values;

            
            const blob = await getFetch("api/user/register", { email, password }, "POST", null);

            
            const text = await blob.text();
            const data = JSON.parse(text);

            
            if (data && data.token) {
                localStorage.setItem("jwt", data.token);
                console.log("Usuario registrado exitosamente. Token almacenado:", data.token);
            } else {
                console.error("Error: No se recibió un token válido.");
            }
        } catch (error) {
            console.error("Error en el registro:", error.message);
        }
      },
    }

    const infoButton={
      button1:{onclick:onLoginClick, text:"Ya tengo cuenta"},
      button2:{onclick:onRegister,  text:"Regístrese con correo electrónico"},
    }

    
    
  return(
    <div className="form-container">
      <h2 className="form-heading">Registro</h2>
      <FormYup
        paramsForm={paramForm}
        formData={formData}
        setFormData={setFormData}
        linkButton={infoButton.button1}
        buttonForm={infoButton.button2}
        
      ></FormYup>
    </div>
    
  );
}
