"use client"; 


import { useParams } from 'next/navigation';
import { useSearchParams } from "next/navigation";
import { getFetch } from '@/utils/handlerequests';
import { useRouter } from 'next/navigation'; // Usa next/navigation para la navegación
import { useEffect, useState } from 'react';


export default function DeliverynoteDetail (){
    const { id } = useParams(); // Extraer el ID desde los parámetros dinámicos de la URL
    const [deliverynote, setDeliverynote] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    console.log(id)
    useEffect(() => {
      if (!id) {
        console.error("El ID no está disponible en los parámetros.");
        return;
      }
  
      const fetchDeliverynoteDetails = async () => {
        setLoading(true);
        try {
          const data = await getFetch(`api/deliverynote/${id}`, null, 'GET', {});
          setDeliverynote(data);
        } catch (err) {
          console.error("Error al obtener los detalles del deliverynotee:", err);
          setError(err.message);
        // } finally {
        //   setLoading(false);
        }
      };
  
      fetchDeliverynoteDetails();
    }, [id]);

    console.log(deliverynote)


    const fields = [
        { name: "clientId", type: "text", label: "ID del Cliente", value:deliverynote.clientId},
        { name: "projectId", type: "text", label: "ID del Proyecto",value:deliverynote.projectId},
        { name: "format",  type: "text", label: "Formato",value:deliverynote.format },
        { name: "material", type: "text", label: "Tipo de Material", value:deliverynote.material },
        { name: "hours", type: "number", label: "Horas" , value:deliverynote.hours},
        { name: "description", type: "textarea", label: "Descripción", value:deliverynote.description },
        { name: "workdate", type: "date", label: "Fecha de Trabajo", value:deliverynote.workdate },
  ];



  if (error) {
    return (
      <div>
        <p>Error: {error}</p>
        <button onClick={() => router.push('/pagesInfo/deliverynotes')}>
          Volver a la lista
        </button>
      </div>
    );
  }


  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <h1>Detalles del deliverynotee</h1>
      <div>
        {fields.map((detail)=>(
            <p><strong>{detail.label}:</strong> {detail.valor}</p>
        ))}
      </div>
      <button onClick={() => router.push('/pagesInfo/deliverynotes')}>
        Volver a la lista
      </button>
    </div>
  );
};

