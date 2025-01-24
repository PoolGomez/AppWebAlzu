import { Table } from "@prisma/client";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const SOCKET_URL = "http://localhost:3001"; // URL del servidor de WebSocket

export const useWebSocket = (roomId: string | null) => {
//   const [mesas, setMesas] = useState<{ id: string; nombre: string; estado: string }[]>([]);
const [tablesApi, setMesas] = useState<Table[]>([]);

  useEffect(() => {
    if(roomId){

      console.log("no es null pg")

      const socket = io(SOCKET_URL);

      socket.on("connect", () => {
        console.log("Conectado al servidor de WebSocket");
        // Unirse a la sala de la empresa
        socket.emit("join_company", roomId);
      });

      socket.on("mesas_update", (data: Table[]) => {
        console.log("Datos de mesas actualizados:", data);
        setMesas(data);
      });

      return () => {
        socket.disconnect();
      };


    }else{
      console.log("es null")
    }
    
  }, [roomId]);

  // Función para actualizar las mesas
  const actualizarMesas = (nuevasMesas: Table[]) => {
    const socket = io(SOCKET_URL);
    socket.emit("actualizar_mesas", {roomId, nuevasMesas});
  };

  return { tablesApi, actualizarMesas };
};
