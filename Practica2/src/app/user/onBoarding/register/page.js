"use client";

import FormYup from "@/components/FormYup";
import { getFetch } from "@/utils/handlerequests"
import { useState } from "react";
import * as Yup from "yup";
import '@/styles/onboarding.css'

export default function Register(){
    const [formData, setFormData] = useState({firstName: "",lastName: "",email: "", password: "",});
    const data= getFetch("api/user/register", formData, "POST");
    

    const paramForm={
      initialValues : { username: "", password: "" },
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

      handleSubmit : (values) => {
        console.log("Formulario Enviado:", values);
        console.log("Estado Local formData:", formData);
      },
  
    }

    
    
  return(
    <div className="form-container">
      <h2 className="form-heading">Registro</h2>
      <FormYup
        paramsForm={paramForm}
        formData={formData}
        setFormData={setFormData}
        buttonText="Regístrese con correo electrónico"
      ></FormYup>
    </div>
    
  );
}
