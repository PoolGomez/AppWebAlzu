"use client"
import { toast } from '@/hooks/use-toast'

import { Button } from '@/components/ui/button'
import axios from 'axios'
import { Trash } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { FooterCompanyProps } from './FooterCompany.types'

export function FooterCompany(props: FooterCompanyProps) {
    const { companyId} = props
    const router = useRouter()
    const onDeleteCompany = async () => {
        try {
            axios.delete(`/api/company/${companyId}`)
            toast({
                title:"✅ Correcto",
                description:"Empresa borrada exitosamente"
            })
            router.push("/companies")
        } catch (error) {
            console.log(error)
            toast({
                title:"Error",
                description:"Error al borrar la empresa",
                variant:"destructive"
            })
        }
    }
  return (
    <div className='flex justify-end mt-5'>
        <Button variant="destructive" onClick={onDeleteCompany}>
            <Trash className='w-4 h-4 mr-2' />
            Eliminar Empresa
        </Button>

    </div>
  )
}
