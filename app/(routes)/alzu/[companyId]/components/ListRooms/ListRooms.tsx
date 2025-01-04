import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { db } from "@/lib/db"

type Props = {
    companyId: string;
    children: React.ReactElement;
}

export async function ListRooms({props}:{props: Props}) {
    const { children, companyId} = props;
    const rooms = await db.room.findMany({
        where: {
            companyId: companyId
        },
        orderBy: {
            createdAt: "asc"
        }
    });

  return (
    <Tabs defaultValue="add" className="w-full">
      
        <TabsList className="w-full h-auto">
          <div className="grid grid-cols-4 gap-2 sm:flex sm:gap-4 sm:items-start">
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

      <div className="mt-4">
        {rooms.map((room) => (
          <TabsContent key={room.id} value={room.id}>
            {children}
            {/* <FormUpdateRoom room={room} /> */}
            
          </TabsContent>
        ))}

      </div>
    </Tabs>
  )
}
