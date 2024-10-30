"use client"
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";


export function HeaderProduct({companyId}:{companyId:string}) {
    const router = useRouter();
  return (
    <div className='flex items-center justify-start w-full sm:w-[75%] text-xl pb-2'>
        <ArrowLeft className='w-5 h-5 mr-2 cursor-pointer' 
        onClick={()=> router.push(`/alzu/${companyId}/products`)}
        />
        Editar Producto
        
      </div>
  )
}
