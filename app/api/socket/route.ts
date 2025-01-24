import { Server } from "socket.io";
import { NextRequest } from "next/server";
import { db } from "@/lib/db";

let io: Server | null = null;

export async function GET(req: NextRequest) {
  if (!io) {
    const httpServer = req.nextUrl.origin;
    io = new Server(3001, {
      cors: {
        origin: httpServer,
        methods: ["GET", "POST"],
      },
    });

    io.on("connection", async (socket) => {
      console.log("Cliente conectado:", socket.id);

      // Recibir el ID de la empresa desde el cliente
      socket.on("join_company", async (roomId) => {
        console.log(`Cliente ${socket.id} unido a la sala:`, roomId);
        
        // Unirse a una sala específica de la empresa
        socket.join(roomId);

        // Obtener mesas filtradas por empresa
        const mesas = await db.table.findMany({
          where: { roomId: roomId }
        });

        socket.emit("mesas_update", mesas);
      });

      //obtener listado de mesas desde prisma
      // const mesas = await db.table.findMany();
      // socket.emit("mesas_update", mesas);

      // Enviar listado inicial de mesas (simulación)
    //   socket.emit("mesas_update", [
    //     { id: "1", nombre: "Mesa 1", estado: "ocupado" },
    //     { id: "2", nombre: "Mesa 2", estado: "disponible" },
    //   ]);

      // Manejar actualizaciones de mesas desde el cliente
      socket.on("actualizar_mesas", async ({roomId, nuevasMesas}) => {
        try {
          for (const mesa of nuevasMesas) {
            await db.table.update({
              where: { id: mesa.id },
              data: { status: mesa.status },
            });
          }
          // Obtener la lista actualizada de mesas de la empresa
          const mesasActualizadas = await db.table.findMany({
            where: { roomId }
          });
          // Emitir solo a la empresa correspondiente
          io?.to(roomId).emit("mesas_update", mesasActualizadas);
        } catch (error) {
          console.error("Error actualizando mesas:", error);
          socket.emit("error", { message: "No se pudo actualizar las mesas" });
        }
      });

      socket.on("disconnect", () => {
        console.log("Cliente desconectado:", socket.id);
      });
    


      // Escuchar eventos de actualización de mesas
    //   socket.on("actualizar_mesas", (mesas) => {
    //     console.log("Actualización de mesas recibida:", mesas);
    //     io?.emit("mesas_update", mesas);
    //   });

    //   socket.on("disconnect", () => {
    //     console.log("Cliente desconectado:", socket.id);
    //   });
    });

    console.log("WebSocket server iniciado en el puerto 3001");
  }

  return new Response("WebSocket initialized", { status: 200 });
}
