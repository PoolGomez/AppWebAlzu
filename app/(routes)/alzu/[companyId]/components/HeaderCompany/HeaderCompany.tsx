import { Button } from '@/components/ui/button'
import { Company } from '@prisma/client'
import { Trash2 } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export function HeaderCompany({company}:{company:Company}) {
  return (
    <div className="flex items-center justify-between">
        <h2 className="text-2xl">Dashboard</h2>
        <div className='flex items-center gap-2'>
            <Link href={`/alzu/${company.id}/update`}>
                <Button>
                    Modificar
                </Button>
            </Link>
            <Link href={`/alzu/${company.id}/delete`}>
                <Button variant={"destructive"}>
                    <Trash2 />
                </Button>
            </Link>
        </div>
    </div>
  )
}
