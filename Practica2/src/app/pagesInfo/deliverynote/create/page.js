"use client";

import FormYup from "@/components/FormYup";
import { getFetch } from "@/utils/handlerequests"
import { useState, useEffect } from "react";
import * as Yup from "yup";
import '@/styles/onboarding.css';

import Link from "next/link";


export default function CreateProject() {

  const [clientOptions, setClientOptions] = useState([]);
  const [projectOptions, setProjectOptions] = useState([]);
  const [ isProjectCreated, setIsProjectCreated] = useState(false);
  const [formData, setFormData] = useState({

         clientId : "",
         projectId : "",
         format :  "" ,
         material :  "" ,
         hours : 0,
         description :  "" ,
         workdate :  ""

    });

    // No se si el cliente tiene que ser el mismo que el del proyecto
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

    const fetchProjectOptions = async () => {
      try {
        const data = await getFetch("api/project", null, "GET", {});
        const options = data.map(project => ({
          value: project._id, 
          label: project.name
        }));
        setProjectOptions(options);
      } catch (err) {
        console.error("Error al obtener los clientes:", err.message || err);
        setProjectOptions([]); // En caso de error, dejamos el array vacío
      }
    };
  
  
    // Llamamos a la función para obtener los datos cuando el componente se monta
    useEffect(() => {
      fetchClientOptions();
      fetchProjectOptions();
    }, []);
  
    const paramForm={
    initialValues: { ...formData },

    fields: [
        { name: "clientId", type: "select", label: "ID del Cliente", options: clientOptions},
        { name: "projectId", type: "select", label: "ID del Proyecto", options: projectOptions },
        { name: "format", 
            type: "select", 
            label: "Formato", 
            options: [
                { value: "material", label: "Material" },
                { value: "hours", label: "Horas" }
            ] 
        },
        { name: "material", type: "text", label: "Tipo de Material" },
        { name: "hours", type: "number", label: "Horas" },
        { name: "description", type: "textarea", label: "Descripción" },
        { name: "workdate", type: "date", label: "Fecha de Trabajo" },

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

        // Llamar al API para registrar el cliente
        const data = await getFetch("api/client", filteredValues, "POST", {});
        console.log("Registro exitoso:", data);

        // Después de crear el cliente, cambiamos el estado para mostrar el Link
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



