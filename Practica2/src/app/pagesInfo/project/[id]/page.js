"use client"; 


import { useParams } from 'next/navigation';
import { useSearchParams } from "next/navigation";
import { getFetch } from '@/utils/handlerequests';
import { useRouter } from 'next/navigation'; // Usa next/navigation para la navegación
import { useEffect, useState } from 'react';


export default function ProjectDetail (){
    const { id } = useParams(); // Extraer el ID desde los parámetros dinámicos de la URL
    const [project, setProject] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    console.log(id)
    useEffect(() => {
      if (!id) {
        console.error("El ID no está disponible en los parámetros.");
        return;
      }
  
      const fetchProjectDetails = async () => {
        setLoading(true);
        try {
          const data = await getFetch(`api/project/${id}`, null, 'GET', {});
          setProject(data);
        } catch (err) {
          console.error("Error al obtener los detalles del projecte:", err);
          setError(err.message);
        // } finally {
        //   setLoading(false);
        }
      };
  
      fetchProjectDetails();
    }, [id]);

    console.log(project)


    const fields = [
        { name: "name", type: "text", label: "Nombre del Proyecto", value:project.name },
        { name: "projectCode", type: "text", label: "Código del Proyecto",value:project.projectCode },
        { name: "email", type: "email", label: "Correo Electrónico", value:project.email },
        { name: "address.street", type: "text", label: "Calle", value:project.address,street },
        { name: "address.number", type: "number", label: "Número", value:project.address,number },
        { name: "address.postal", type: "number", label: "Código Postal", value:project.address,strpostaleet },
        { name: "address.city", type: "text", label: "Ciudad", value:project.address,city },
        { name: "address.province", type: "text", label: "Provincia", value:project.address.province },
        { name: "code", type: "text", label: "Código", value:project.name.code },
        { name: "clientId", type: "text", label: "ID del Cliente", value:project.clientId },
  ];



  if (error) {
    return (
      <div>
        <p>Error: {error}</p>
        <button onClick={() => router.push('/pagesInfo/projects')}>
          Volver a la lista
        </button>
      </div>
    );
  }


  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <h1>Detalles del projecte</h1>
      <div>
        {fields.map((detail)=>(
            <p><strong>{detail.label}:</strong> {detail.valor}</p>
        ))}
      </div>
      <button onClick={() => router.push('/pagesInfo/projects')}>
        Volver a la lista
      </button>
    </div>
  );
};

