export default ClientList ({ clients }) {
  async function handleDelete(id) {
    const confirmDelete = confirm(
      `¿Estás seguro de que deseas eliminar el cliente con ID: ${id}?`
    );
    if (confirmDelete) {
      try {
        const data = await getFetch(`api/client/${id}`, null, "DELETE", {});
        alert(`Cliente con ID ${id} eliminado.`);
        window.location.reload();
      } catch (error) {
        console.error("Error al eliminar cliente:", error.message);
        throw error;
      }
    }
  }

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto" }}>
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {clients.map((client) => (
          <li
            key={client._id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "10px",
              borderBottom: "1px solid #ccc",
            }}
          >
            <Link href={`/pagesInfo/clients/${client._id}`} legacyBehavior>
              <a style={{ textDecoration: "none", color: "inherit", flex: 1 }}>
                {client.name}
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
              <Link href={`/pagesInfo/clients/edit/${client._id}`}>
                <span style={{ cursor: "pointer" }}>✏️</span>
              </Link>
              <span
                style={{ cursor: "pointer", color: "red" }}
                onClick={() => handleDelete(client._id)}
              >
                🗑️
              </span>
            </div>
          </li>
        ))}
      </ul>
      <Link href={`/pagesInfo/clients/create`}>
        <span style={{ cursor: "pointer" }}>Crear Nuevo Cliente</span>
      </Link>
    </div>
  );
};





