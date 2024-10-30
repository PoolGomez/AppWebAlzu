"use client"
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'

export function HeaderSize({companyId}:{companyId:string}) {
  const router = useRouter();
  return (
    <div className='flex items-center justify-start w-full sm:w-[75%] text-xl py-4'>
        <ArrowLeft className='w-5 h-5 mr-2 cursor-pointer' 
        onClick={()=> router.push(`/alzu/${companyId}/sizes`)}
        />
        Editar Tamaño
        
      </div>
  )
}
