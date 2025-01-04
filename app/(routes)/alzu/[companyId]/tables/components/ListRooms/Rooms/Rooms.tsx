import { db } from "@/lib/db";
import { Room } from "@prisma/client";
import { FormRoom } from "../FormRoom";

export async function Rooms({room,companyId}:{room: Room,companyId:string}) {

    const tables = await db.table.findMany({
            where: {
              roomId: room.id,
            },
            orderBy: {
              createdAt: "asc",
            },
          });

  return (
    <FormRoom companyId={companyId} room={room} tables={tables} />
  )
}
