
// import { Button } from '@/components/ui/button'
// import { signOut } from 'next-auth/react'
// import React from 'react'
import {auth} from "@/auth"
import { ButtonLogout } from "./components/ButtonLogout";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { HousePlus, Newspaper, Plus, PlusCircle, PlusIcon, PlusSquare } from "lucide-react";
import { ListCompanies } from "./components/ListCompanies";

export default function AlzuPage() {
  // const session = await auth();

  // if(!session){
  //   return <div> no autorizado </div>;
  // }


  return (
    <>
      <div className="flex flex-1 flex-col gap-4 p-8">
        <div className="grid auto-rows-min gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          
          <Card className="aspect-video rounded-xl bg-muted/50">
          <Link href={"/alzu/create"}>
            <CardHeader>
              <CardTitle className="flex justify-center max-w-xs overflow-hidden text-ellipsis whitespace-nowrap">
                <Plus className="w-8 h-8"/>
                 </CardTitle>
            </CardHeader>
            <CardFooter className="flex justify-center max-w-xs overflow-hidden text-ellipsis whitespace-nowrap">
              Crear una nueva empresa
            </CardFooter>
            </Link>
          </Card>

          <ListCompanies />

          {/* <Card className="aspect-video rounded-xl bg-muted/50">
            <CardHeader>
              <CardTitle>Card Title</CardTitle>
              <CardDescription>Card Description</CardDescription>
            </CardHeader>
            <CardContent>
            </CardContent>
            <CardFooter>
            </CardFooter>
          </Card> */}


          {/* <div className="aspect-video rounded-xl bg-muted/50" />
          <div className="aspect-video rounded-xl bg-muted/50" />
          <div className="aspect-video rounded-xl bg-muted/50" />
          <div className="aspect-video rounded-xl bg-muted/50" />
          <div className="aspect-video rounded-xl bg-muted/50" />
          <div className="aspect-video rounded-xl bg-muted/50" />
          <div className="aspect-video rounded-xl bg-muted/50" />
          <div className="aspect-video rounded-xl bg-muted/50" /> */}
        </div>
        {/* <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" /> */}
      </div>


    {/* <div>
      <h1>Datos sesion:</h1>
      <pre>{JSON.stringify(session, null, 2)}</pre>
      <ButtonLogout />


      <h1>Seleccionar Empresas</h1>
      <Link href="/alzu/asdfrghdss-c1">
      <Button>Empresa 1</Button>
      </Link>
      
      <Link href="/alzu/asdfrghdss-c2">
      <Button>Empresa 2</Button>
      </Link>

      <Link href="/alzu/asdfrghdss-c3">
      <Button>Empresa 3</Button>
      </Link>

    </div> */}

    </>
  )
}
