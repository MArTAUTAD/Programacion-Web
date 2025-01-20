"use client";

import FormYup from "@/components/FormYup";
import { getFetch } from "@/utils/handlerequests"
import { useState, useEffect } from "react";
import * as Yup from "yup";
import '@/styles/onboarding.css';

import Link from "next/link";


export default function CreateProject() {

    const [formData, setFormData] = useState({
      name: "",
       projectCode : "",
       email : "",
       address : {
         street : "",
         number : 0,
         postal : 0,
         city : "",
         province : ""
      },
       code : "",
       clientId : ""
    });

    const [ isProjectCreated, setIsProjectCreated] = useState(false);
    const [clientOptions, setClientOptions] = useState([]);
    
      const fetchClientOptions = async () => {
        try {
          const data = await getFetch("api/client", null, "GET", {});
          const options = data.map(client => ({
            value: client._id, 
            label: client.name
          }));
          setClientOptions(options);
        } catch (err) {
          console.error("Error al obtener los clientes:", err.message || err);
          setClientOptions([]); 
        }
      };
    
      useEffect(() => {
        fetchClientOptions();
    
      }, []);
        

    const paramForm={
    initialValues: { ...formData },

    fields: [
      { name: "name", type: "text", label: "Nombre del Proyecto" },
      { name: "projectCode", type: "text", label: "Código del Proyecto" },
      { name: "email", type: "email", label: "Correo Electrónico" },
      { name: "address.street", type: "text", label: "Calle" },
      { name: "address.number", type: "number", label: "Número" },
      { name: "address.postal", type: "number", label: "Código Postal" },
      { name: "address.city", type: "text", label: "Ciudad" },
      { name: "address.province", type: "text", label: "Provincia" },
      { name: "code", type: "text", label: "Código" },
      { name: "clientId", type: "select", label: "ID del Cliente", options: clientOptions },
  ],          

    validationSchema: Yup.object({
      name: Yup.string().min(3, "Mínimo 3 caracteres").max(50, "Máximo 50 caracteres").required(),
      email: Yup.string().email("Correo electrónico inválido").required(),
      phone: Yup.string().required(),
      address: Yup.string().required(),
    }),

    // Función que maneja el envío de los datos
    handleSubmit: async (values) => {
      try {
        console.log("Formulario Enviado:", values);

        const { email, phone, ...filteredValues } = values;

      
        const data = await getFetch("api/client", filteredValues, "POST", {});
        console.log("Registro exitoso:", data);

  
        setIsProjectCreated(true);

      } catch (error) {
        console.error("Error en el registro:", error.message);
      }
    },
  };

  return (
    <div className="form-container">
      <h2>Crear Cliente</h2>
      <FormYup
        paramsForm={paramForm}
        formData={formData}
        setFormData={setFormData}
        buttonForm={{ text: "Crear cliente" }}
      />
      
      {/* Si el cliente ha sido creado, mostramos el Link */}
      { isProjectCreated && (
        <div className="redirect-message">
          <p>Cliente creado exitosamente. 
            <Link href="/pagesInfo/clients">Ir a la lista de clientes</Link>
          </p>
        </div>
      )}
    </div>
  );
}



