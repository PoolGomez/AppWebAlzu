import { HeaderTables, ListRooms } from "./components";

export default function TablesPage({params}:{params:{companyId:string}}) {
  return (
    <div className='flex flex-col w-full h-full'>
    
        <HeaderTables />
        <ListRooms companyId={params.companyId} />
    
         
            
    </div>
  )
}
