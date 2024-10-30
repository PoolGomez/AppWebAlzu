"use client"
import { Button } from '@/components/ui/button'
import { toast } from '@/hooks/use-toast'
import axios from 'axios'
import { Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function DeleteCompanyPage({params}:{params:{companyId:string}}) {

  const { companyId} = params
    const router = useRouter()
    const onDeleteCompany = async () => {
        try {
            axios.delete(`/api/company/${companyId}`)
            toast({
                title:"Empresa borrada"
            })
            router.refresh()
        } catch (error) {
            console.log(error)
            toast({
                title:"Error al borrar empresa",
                variant:"destructive"
            })
        }
    }

  return (
    <div className='flex flex-col items-center justify-center h-screen'>
        <Button variant="destructive" onClick={onDeleteCompany}>
            <Trash2 className='w-4 h-4 mr-2' />
            Borrar empresa
        </Button>
    </div>
  )
}
