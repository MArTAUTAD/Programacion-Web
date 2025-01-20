"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Cambiar en caso de router alternativo
import { getFetch } from "@/utils/handlerequests";
import FormYup from "@/components/FormYup";
import * as Yup from "yup";

export default function EditProject({ params }) {
  const router = useRouter();
  const { id } = params; // Obtener el ID desde la ruta
  const [formData, setFormData] = useState(null); // Datos del projecte
  const [loading, setLoading] = useState(true);
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
    async function fetchProject() {
      try {
        const data = await getFetch(`api/project/${id}`, null, "GET", {});
        setFormData(data);
      } catch (err) {
        console.error("Error al obtener el projecte:", err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchProject();
    fetchClientOptions();
  }, [id]);

  const paramForm = {
    initialValues: formData || {},
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
        { name: "clientId", type: "select", label: "ID del Cliente", options: clientOptions},
    ],          

    validationSchema: Yup.object({
        name: Yup.string().min(3, "Mínimo 3 caracteres").max(50, "Máximo 50 caracteres").required(),
        email: Yup.string().email("Correo electrónico inválido").required(),
        phone: Yup.string().required(),
        address: Yup.string().required(),
    }),

    handleSubmit: async (values) => {
      try {
        const response = await getFetch(`api/project/${id}`, values, "PUT", {});
        alert("project actualizado con éxito.");
        router.push("/pagesInfo/projects"); // Redirige a la lista de projectes
      } catch (error) {
        console.error("Error al actualizar projecte:", error.message);
      }
    },
  };

  if (loading) return <p>Cargando...</p>;
  if (!formData) return <p>Error al cargar los datos del projecte.</p>;

  return (
    <div>
      <h2>Editar projecte</h2>
      <FormYup
        paramsForm={paramForm}
        formData={formData}
        setFormData={setFormData}
        buttonForm={{ text: "Guardar cambios" }}
      />
    </div>
  );
}
