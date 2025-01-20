"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Cambiar en caso de router alternativo
import { getFetch } from "@/utils/handlerequests";
import FormYup from "@/components/FormYup";
import * as Yup from "yup";

export default function EditClient({ params }) {
  const router = useRouter();
  const { id } = params; // Obtener el ID desde la ruta
  const [formData, setFormData] = useState(null); // Datos del cliente
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchClient() {
      try {
        const data = await getFetch(`api/client/${id}`, null, "GET", {});
        setFormData(data);
      } catch (err) {
        console.error("Error al obtener el cliente:", err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchClient();
  }, [id]);

  const paramForm = {
    initialValues: formData || {},
    fields: [
      { name: "name", type: "text", label: "Nombre del Cliente" },
      { name: "cif", type: "text", label: "CIF" },
      { name: "email", type: "email", label: "Correo Electrónico" },
      { name: "phone", type: "number", label: "Teléfono" },
      { name: "address.street", type: "text", label: "Calle" },
      { name: "address.number", type: "number", label: "Número" },
      { name: "address.postal", type: "number", label: "Código Postal" },
      { name: "address.city", type: "text", label: "Ciudad" },
      { name: "address.province", type: "text", label: "Provincia" },
    ],
    validationSchema: Yup.object({
      name: Yup.string().min(3).max(50).required(),
      cif: Yup.string().matches(/^[A-Z0-9]{9}$/, "CIF inválido").required(),
      email: Yup.string().email().required(),
      phone: Yup.string().matches(/^\d{9}$/, "Teléfono inválido").required(),
      address: Yup.object({
        street: Yup.string().required(),
        number: Yup.number().required(),
        postal: Yup.number().required(),
        city: Yup.string().required(),
        province: Yup.string().required(),
      }),
    }),
    handleSubmit: async (values) => {
      try {
        const response = await getFetch(`api/client/${id}`, values, "PUT", {});
        alert("Cliente actualizado con éxito.");
        router.push("/pagesInfo/clients"); // Redirige a la lista de clientes
      } catch (error) {
        console.error("Error al actualizar cliente:", error.message);
      }
    },
  };

  if (loading) return <p>Cargando...</p>;
  if (!formData) return <p>Error al cargar los datos del cliente.</p>;

  return (
    <div>
      <h2>Editar Cliente</h2>
      <FormYup
        paramsForm={paramForm}
        formData={formData}
        setFormData={setFormData}
        buttonForm={{ text: "Guardar cambios" }}
      />
    </div>
  );
}
