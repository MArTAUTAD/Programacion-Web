"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getFetch } from "@/utils/handlerequests";


export default function ClientDetail({ params }) {
    const [client, setClient] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const router = useRouter();

    const clientId = params.id; // Obtener el ID del cliente desde la ruta
    const token = localStorage.getItem("jwt"); // Recuperar el token desde localStorage

    useEffect(() => {
        async function fetchClient() {
            try {
                const data = await getFetch(`api/client/${clientId}`, null, "GET", {Authorization: `Bearer ${token}`,});
                setClient(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        if (token && clientId) fetchClient();
    }, [token, clientId]);

    if (loading) return <p>Cargando detalles del cliente...</p>;
    if (error) return (
        <div>
            <p>Error: {error}</p>
            <button onClick={() => router.back()} className="text-blue-500 underline">
                Volver
            </button>
        </div>
    );

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Detalles del Cliente</h1>
            <p><strong>Nombre:</strong> {client.name}</p>
            <p><strong>Email:</strong> {client.email}</p>
            <p><strong>Teléfono:</strong> {client.phone}</p>
            <p><strong>Dirección:</strong> {client.address}</p>
            <button
                onClick={() => router.back()}
                className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
            >
                Volver
            </button>
        </div>
    );
}
