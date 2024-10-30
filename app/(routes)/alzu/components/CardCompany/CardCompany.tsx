"use client"
// import { setInLocalstorage } from '@/actions/set-in-localstorage'
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Company } from '@prisma/client'
import Link from 'next/link'
// import { useRouter } from 'next/navigation'
import React from 'react'

export function CardCompany({company}:{company:Company}) {
    // const router = useRouter()
    // const test = () =>{
    //     console.log("test...")
    //     setInLocalstorage("company",company)
    //     router.push(`/alzu/${company.id}`)
    // }
  return (
    // <div onClick={test} >
    <Card
        // onClick={()=>console.log('test')}
        className="aspect-video rounded-xl bg-muted/50">
            <Link href={`/alzu/${company.id}`}>
        <CardHeader>
          <CardTitle className='max-w-xs overflow-hidden text-ellipsis whitespace-nowrap'>
            {company.name}
        </CardTitle>
          <CardDescription className="max-w-xs overflow-hidden text-ellipsis whitespace-nowrap">
            {company.description}
        </CardDescription>
        </CardHeader>
        
        {/* <CardContent>
        </CardContent> */}
        <CardFooter>
        {/* <Button type='button' onClick={selectedCompany}>test</Button> */}
        </CardFooter>
        </Link>
      </Card>
      // </div>
  )
}
