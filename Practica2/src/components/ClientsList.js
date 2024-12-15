import Link from "next/link";

export default function ClientsList ({ clients }) {

  return (
    <div className="client-list">
      {clients.map((client) => (
        <ul>
          <Link href={`/clients/${client.id}`}>
            <div key={client.id} className="client-card">
            <h3>{client.name}</h3>
            <p>{client.email}</p>
            </div>
          </Link>
        </ul>
        
      ))}
    </div>
  )

};

