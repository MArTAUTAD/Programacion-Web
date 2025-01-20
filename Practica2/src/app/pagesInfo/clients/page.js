"use client";

import ClientsList from "@/components/ClientsList";
import { useEffect, useState } from "react";
import { getFetch } from "@/utils/handlerequests";
import Link from "next/link";
import CreateClient from "./create/page";

export default function Clients({ token }) {
    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
        async function fetchClients() {
            try {
                const data = await getFetch("api/client", null, "GET", { Authorization: `Bearer ${token}` });
                setClients(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        if (token) fetchClients();
    }, [token]);

    const handleAddClient = () => {
        // return(
        //     <CreateClient></CreateClient>
        // )
        // window.location.href = "\pages\clients\create";
    };

    return (
        <div>
            {clients.length === 0 ? (
                <div className="no-clients">
                    <h2>Crea tu primer Cliente</h2>
                    <p>Para poder generar Albaranes digitales</p>
                    <Link href="\pages\clients\create">
                        <button>¡Sí, vamos!</button>
                    </Link>
                    <button onClick={handleAddClient}>¡Sí, vamos!</button>
                </div>
            ) : (
                <ClientsList token={token}></ClientsList>
            )}
        </div>
    );
}
