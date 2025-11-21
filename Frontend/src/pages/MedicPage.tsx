// src/pages/medicPage.tsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/layouts/navBar";
// Datos mock
const MOCK_MEDICS = [
    { id: 1, name: "Juan", lastname: "Pérez", email: "juan.perez@mail.com", id_specialty: 101 },
    { id: 2, name: "María", lastname: "Gómez", email: "maria.gomez@mail.com", id_specialty: 102 },
    { id: 3, name: "Carlos", lastname: "López", email: "carlos.lopez@mail.com", id_specialty: 103 },
];

export default function MedicPage() {
    const [medics, setMedics] = useState(MOCK_MEDICS);
    const [search, setSearch] = useState("");
    const navigate = useNavigate();

    const filteredMedics = medics.filter((m) =>
        `${m.name} ${m.lastname}`.toLowerCase().includes(search.toLowerCase())
    );

    const handleDelete = (id: number) => {
        if (!confirm("¿Seguro que querés eliminar este médico?")) return;
        setMedics(medics.filter((m) => m.id !== id));
    };

    return (
        <main className="p-6 w-full max-w-5xl mx-auto">
            <NavBar />

            <input
                type="text"
                placeholder="Buscar médico por nombre..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="border p-2 rounded w-full mb-4"
            />

            <table className="w-full border-collapse shadow-sm">
                <thead className="bg-blue-600 text-white">
                    <tr>
                        <th className="p-3 border">ID</th>
                        <th className="p-3 border">Nombre</th>
                        <th className="p-3 border">Apellido</th>
                        <th className="p-3 border">Email</th>
                        <th className="p-3 border">Especialidad</th>
                        <th className="p-3 border">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredMedics.map((m) => (
                        <tr key={m.id} className="text-center hover:bg-gray-100">
                            <td className="border p-2">{m.id}</td>
                            <td className="border p-2">{m.name}</td>
                            <td className="border p-2">{m.lastname}</td>
                            <td className="border p-2">{m.email}</td>
                            <td className="border p-2">{m.id_specialty}</td>
                            <td className="border p-2 flex gap-2 justify-center">
                                <button
                                    onClick={() => navigate(`/medics/edit/${m.id}`)}
                                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                                >
                                    Editar
                                </button>

                                <button
                                    onClick={() => handleDelete(m.id)}
                                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                                >
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="mt-4 flex justify-end">
                <button
                    onClick={() => navigate("/medics/new")}
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                    Agregar Médico
                </button>
            </div>

            <div className="h-16 mt-10 bg-gray-100 flex items-center justify-center text-gray-500 text-sm rounded">
                Footer (se implementará luego)
            </div>
        </main>
    );
}
