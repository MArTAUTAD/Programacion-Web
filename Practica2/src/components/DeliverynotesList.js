import React from "react";
import Link from "next/link";
import { getFetch } from "@/utils/handlerequests";

const DeliverynoteList = ({ deliverynotes }) => {
  async function handleDelete(id) {
    const confirmDelete = confirm(
      `¿Estás seguro de que deseas eliminar el deliverynotee con ID: ${id}?`
    );
    if (confirmDelete) {
      try {
        const data = await getFetch(`api/deliverynote/${id}`, null, "DELETE", {});
        alert(`deliverynotee con ID ${id} eliminado.`);
        window.location.reload();
      } catch (error) {
        console.error("Error al eliminar deliverynotee:", error.message);
        throw error;
      }
    }
  }

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto" }}>
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {deliverynotes.map((deliverynote) => (
          <li
            key={deliverynote._id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "10px",
              borderBottom: "1px solid #ccc",
            }}
          >
            <Link href={`/pagesInfo/deliverynotes/${deliverynote._id}`} legacyBehavior>
              <a style={{ textDecoration: "none", color: "inherit", flex: 1 }}>
                {deliverynote.name}
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
              <Link href={`/pagesInfo/deliverynotes/edit/${deliverynote._id}`}>
                <span style={{ cursor: "pointer" }}>✏️</span>
              </Link>
              <span
                style={{ cursor: "pointer", color: "red" }}
                onClick={() => handleDelete(deliverynote._id)}
              >
                🗑️
              </span>
            </div>
          </li>
        ))}
      </ul>
      <Link href={`/pagesInfo/deliverynotes/create`}>
        <span style={{ cursor: "pointer" }}>Crear Nuevo deliverynotee</span>
      </Link>
    </div>
  );
};

export default DeliverynoteList;