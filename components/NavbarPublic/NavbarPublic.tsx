import React from 'react'
import { ToggleTheme } from '../ToggleTheme'
import { Logo } from '../Logo'
import { Button } from '../ui/button'
import Link from 'next/link'
import { auth } from '@/auth'

export async function NavbarPublic() {
  const session = await auth();
  return (
    <nav className='flex items-center px-2 gap-2 gap-x-4 md:px-6 justify-between w-full bg-background border-b h-20'>
      {/* <div className='block xl:hidden'>
        <Sheet>
          <SheetTrigger>
            <Menu />
          </SheetTrigger>
          <SheetContent side="left">
            <SidebarRoutes />
          </SheetContent>
        </Sheet>
      </div> */}
      <Logo />
      {/* <div className='relative w-[300px]'>
        <Input placeholder='Search...' className='rounded-lg' />
        <Search strokeWidth={1} className='absolute top-2 right-2'/>
      </div> */}
      <div className='flex gap-x-2 items-center'>
        
        <ToggleTheme />
        {/* {!userId ? (
            <Button>Iniciar Sesion</Button>
        ):(
            <UserButton />
        )

        } */}

            {/* <SignedOut>
              <SignInButton>
                <Button className='text-sm'>Iniciar Sesion</Button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn> */}
        

        {session ? (
          <Link href="/alzu">
            <Button>Ingresar</Button>
          </Link>
        ):(
          <>
            <Link href="/login">
                <Button>Iniciar sesión</Button>
            </Link>
            <Link href="/register">
                <Button>Registrarse</Button>
            </Link>   
          </>
        )}
        
        
      </div>
    </nav>
  )
}
