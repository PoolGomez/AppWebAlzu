// "use client"
// import { setInLocalstorage } from '@/actions/set-in-localstorage';
import { auth } from '@/auth'
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

import { db } from '@/lib/db'
import { CardCompany } from '../CardCompany';
// import { Company } from '@prisma/client';
// import Link from 'next/link';
// import { redirect} from 'next/navigation';

export async function ListCompanies() {

    const session = await auth();

    if(!session || !session.user.email){
        return <div> no autorizado </div>;
    }

    const companies = await db.company.findMany({
        where: {
            userId : session.user.email,
        },
        orderBy:{
            createdAt: "desc"
        }
    })

    // const selectedCompany = ()=>{
    //   // console.log("test")
    //   // setInLocalstorage('company', company)
    //   // redirect(`/alzu/${company.id}`)
    // }

    // const company = {
    //   id:"sas",
    //   name:"psdad",
    //   description:"desc"

    // }

  return (
    <>
    {companies && companies.map((company) => (
        <CardCompany key={company.id} company={company}/>
    ))}
    </>
  )
}
