import { auth } from '@/auth'

// import { Navbar } from '@/components/Navbar'
// import { Sidebar } from '@/components/Sidebar/Sidebar'
// import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { db } from '@/lib/db'
import { AppSidebar } from './components/AppSidebar';

export default async function LayoutAlzu({children, params}:{children: React.ReactNode, params:{companyId:string}}) {

    const session = await auth();
    if(!session || !session.user.email){
        return <div> no autorizado </div>;
    }


    const companies = await db.company.findMany({
        where:{
            userId: session.user.email,
        },
        orderBy:{
            createdAt: "desc"
        }
    })
    console.log("transaction...")
    const company = companies.find(item => item.id === params.companyId)


    if(!company){
        console.log("no existe la empresa")
        return <h1>No tiene permisos</h1>
    }

  return (
    <>
    
    {/* <SidebarProvider> */}
    {/* <div 
     className='flex w-full h-screen'
    > */}
        <div className='w-full'>
        <AppSidebar 
             companySelected={company} 
            userName={session.user.name}
            // userName="paul"
            userEmail={session.user.email}
            // userEmail="paul@mail.com" 
        > 
            <div className='px-6 py-4 bg-[#fafbfc] dark:bg-secondary'>
            
            {children}
            </div>
        </AppSidebar>  
        
          
            
        </div>
    {/* </div> */}

   {/* </SidebarProvider> */}
   </>
  )
}