import { useState } from "react";
import * as Yup from "yup";
import '@/styles/onboarding.css'


export default function LoginUser(){

    const [formData, setFormData] = useState({email: "", password: "",});
    const data= getFetch("api/user/login", formData, "POST");
    

    const paramForm={
      initialValues : { username: "", password: "" },
      fields : [
      { name: "email", type: "email", label: "Correo Electrónico" },
      { name: "password", type: "password", label: "Contraseña" },
      ],

      validationSchema : Yup.object({
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
      <h2 className="form-heading">Iniciar Sesión</h2>
      <FormYup
        paramsForm={paramForm}
        formData={formData}
        setFormData={setFormData}
        buttonText="Regístrese con correo electrónico"
      ></FormYup>
    </div>
    
  );

}
