import { getFromLocalstorage } from "@/actions/get-from-localstorage"
import { Company } from "@prisma/client"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export const useCompany = () =>{
    const[company, setCompany] = useState<Company>()
    const router = useRouter();

    useEffect(()=>{

        // Verificamos si estamos en el cliente
        if (typeof window !== 'undefined') {
            const storedCompany = getFromLocalstorage('company');
    
            if (storedCompany) {
            setCompany(storedCompany);
            } else {
            // Si no existe, redirigir a una página específica (ej. '/login')
            router.push('/alzu'); // Aquí puedes cambiar la ruta de redirección
            }
        }
    }, [
        router
    ])

    return company;

}