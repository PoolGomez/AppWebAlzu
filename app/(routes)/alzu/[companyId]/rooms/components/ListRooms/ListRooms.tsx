import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { db } from "@/lib/db";
import { Plus } from "lucide-react";
import { FormCreateRoom } from "../FormCreateRoom";
import { FormUpdateRoom } from "../FormUpdateRoom";

export async function ListRooms({ companyId }: { companyId: string }) {
  const rooms = await db.room.findMany({
    where: {
      companyId: companyId,
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  return (
    // w-[400px]
    <Tabs defaultValue="add" className="w-full">
      {/* <div 
                    className="relative"
                    >
                      <ScrollArea className="lg:w-auto whitespace-nowrap ">
                                    <TabsList className="h-30">
                                    <TabsTrigger value="add"><Plus className="w-4 h-4" /> Agregar Sala</TabsTrigger>
                                    {rooms.map((room)=>(
                            <TabsTrigger key={room.id} value={room.id}>{room.name}</TabsTrigger>
                        ))}
                                    </TabsList>
                          <ScrollBar orientation="horizontal" />
                      </ScrollArea>
                      </div> */}
      {/* <div className="mb-4"> */}
        <TabsList className="w-full h-auto">
          <div className="grid grid-cols-4 gap-2 sm:flex sm:gap-4 sm:items-start">
            <TabsTrigger value="add">
              <Plus className="w-4 h-4" />
              
            </TabsTrigger>
            {rooms.map((room) => (
              <TabsTrigger
                key={room.id}
                value={room.id}
                className="w-full md:w-auto text-center"
              >
                {room.name}
              </TabsTrigger>
            ))}
          </div>
        </TabsList>
      {/* </div> */}

      <div className="mt-4">
        {rooms.map((room) => (
          <TabsContent key={room.id} value={room.id}>
            <FormUpdateRoom room={room} />
            {/* <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-x-4 gap-y-4">
              <div className="rounded-lg bg-background shadow-md hover:shadow-lg px-4 py-2">
                {room.id}
              </div>

              <div className="rounded-lg bg-background shadow-md hover:shadow-lg p-4 h-min">
                {room.name}
              </div>
            </div> */}
          </TabsContent>
        ))}

        <TabsContent value="add">
          <FormCreateRoom companyId={companyId} />
        </TabsContent>
      </div>
    </Tabs>
  );
}
