"use client";
import { useWebSocket } from "@/hooks/useWebSocket";
import { StatusTable } from "@prisma/client";
import { useState } from "react";

export function Mesas() {
    // const { mesas, actualizarMesas } = useWebSocket("e59ffe22-6a62-43d0-be3d-fd93f370e602");
    const [roomId, setRoomId] = useState<string | null>(null);
    const { tablesApi, actualizarMesas } = useWebSocket(roomId);
    

  const cambiarEstadoMesa = (id: string) => {
    const nuevasMesas = tablesApi.map((mesa) =>
      mesa.id === id ? { ...mesa, status: mesa.status === StatusTable.occupied ? StatusTable.available : StatusTable.occupied } : mesa
    );
    actualizarMesas(nuevasMesas);
  };
  const seleccionarRoom = () => {
    setRoomId("e59ffe22-6a62-43d0-be3d-fd93f370e602")
  }
  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-4">Listado de Mesas</h2>
      <button
              className="bg-blue-500 text-white px-3 py-1 rounded"
              onClick={seleccionarRoom}
            >
              seleccionar sala
            </button>
      <ul>
        {tablesApi.map((mesa) => (
          <li key={mesa.id} className="flex justify-between p-2 border-b">
            <span>{mesa.name} - {mesa.status}</span>
            <button
              className="bg-blue-500 text-white px-3 py-1 rounded"
              onClick={() => cambiarEstadoMesa(mesa.id)}
            >
              Cambiar estado
            </button>
            
          </li>
        ))}
      </ul>
    </div>
  )
}
