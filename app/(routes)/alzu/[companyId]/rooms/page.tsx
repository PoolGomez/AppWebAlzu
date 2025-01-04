import { HeaderRooms, ListRooms } from "./components";



export default function RoomsPage({params}:{params:{companyId:string}}) {
  return (
    <div className='flex flex-col w-full h-full'>
    
        <HeaderRooms companyId={params.companyId}/>
        {/* <BodyTables companyId={params.companyId}/> */}
        <ListRooms companyId={params.companyId} />
    
         
            
    </div>
  )
}
