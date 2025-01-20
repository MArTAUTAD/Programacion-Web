"use client"; 


import { useParams } from 'next/navigation';
import { useSearchParams } from "next/navigation";
import { getFetch } from '@/utils/handlerequests';
import { useRouter } from 'next/navigation'; // Usa next/navigation para la navegación
import { useEffect, useState } from 'react';


export default function ClientDetail (){
    const { id } = useParams(); // Extraer el ID desde los parámetros dinámicos de la URL
    const [client, setClient] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    console.log(id)
    useEffect(() => {
      if (!id) {
        console.error("El ID no está disponible en los parámetros.");
        return;
      }
  
      const fetchClientDetails = async () => {
        setLoading(true);
        try {
          const data = await getFetch(`api/client/${id}`, null, 'GET', {});
          setClient(data);
        } catch (err) {
          console.error("Error al obtener los detalles del cliente:", err);
          setError(err.message);
        // } finally {
        //   setLoading(false);
        }
      };
  
      fetchClientDetails();
    }, [id]);

    console.log(client)


    const fields = [
      { name: "name", type: "text", label: "Nombre del Cliente" , value:client.name},
      { name: "cif", type: "text", label: "CIF", value:client.cif },
      // { name: "email", type: "email", label: "Correo Electrónico", value:client.email },
      // { name: "phone", type: "number", label: "Teléfono", value:client.name },
      { name: "address.street", type: "text", label: "Calle" , value:client.address.street},
      { name: "address.number", type: "number", label: "Número", value:client.address.number },
      { name: "address.postal", type: "number", label: "Código Postal", value:client.address.postal },
      { name: "address.city", type: "text", label: "Ciudad", value:client.address.city },
      { name: "address.province", type: "text", label: "Provincia", value:client.address.province },
  ];


  if (error) {
    return (
      <div>
        <p>Error: {error}</p>
        <button onClick={() => router.push('/pagesInfo/clients')}>
          Volver a la lista
        </button>
      </div>
    );
  }


  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <h1>Detalles del Cliente</h1>
      <div>
        {fields.map((detail)=>(
            <p><strong>{detail.label}:</strong> {detail.value}</p>
        ))}
      </div>
      <button onClick={() => router.push('/pagesInfo/clients')}>
        Volver a la lista
      </button>
    </div>
  );
};
