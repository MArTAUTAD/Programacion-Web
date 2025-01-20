import React from "react";
import Link from "next/link";
import { getFetch } from "@/utils/handlerequests";

export default function ProjectsList({ projects }){
  async function handleDelete(id) {
    const confirmDelete = confirm(
      `¿Estás seguro de que deseas eliminar el projecte con ID: ${id}?`
    );
    if (confirmDelete) {
      try {
        const data = await getFetch(`api/project/${id}`, null, "DELETE", {});
        alert(`projecte con ID ${id} eliminado.`);
        window.location.reload();
      } catch (error) {
        console.error("Error al eliminar projecte:", error.message);
        throw error;
      }
    }
  }

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto" }}>
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {projects.map((project) => (
          <li
            key={project._id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "10px",
              borderBottom: "1px solid #ccc",
            }}
          >
            <Link href={`/pagesInfo/projects/${project._id}`} legacyBehavior>
              <a style={{ textDecoration: "none", color: "inherit", flex: 1 }}>
                {project.name}
              </a>
            </Link>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                cursor: "default",
              }}
              onClick={(e) => e.stopPropagation()} // Evita que el click en el menú lleve a otra página
            >
              <Link href={`/pagesInfo/projects/edit/${project._id}`}>
                <span style={{ cursor: "pointer" }}>✏️</span>
              </Link>
              <span
                style={{ cursor: "pointer", color: "red" }}
                onClick={() => handleDelete(project._id)}
              >
                🗑️
              </span>
            </div>
          </li>
        ))}
      </ul>
      <Link href={`/pagesInfo/projects/create`}>
        <span style={{ cursor: "pointer" }}>Crear Nuevo projecte</span>
      </Link>
    </div>
  );
};


