"use client"
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'

export function HeaderUpdateCompany() {
    const router = useRouter()
  return (
    <div className='flex items-center text-xl'>
        <ArrowLeft className='w-5 h-5 mr-2 cursor-pointer' onClick={()=> router.push("/alzu")}/>
        Modificar empresa
    </div>
  )
}
