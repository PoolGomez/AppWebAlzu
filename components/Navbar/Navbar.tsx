import React from 'react'
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet'
import { Menu, Search } from 'lucide-react'
import { Input } from '../ui/input'
// import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'
import { SidebarRoutes } from '../SidebarRoutes'
import { ToggleTheme } from '@/components/ToggleTheme'
// import { auth } from '@clerk/nextjs/server'

export function Navbar() {

  // const {userId} = auth()
  

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
      <div className='relative w-[300px]'>
        <Input placeholder='Search...' className='rounded-lg' />
        <Search strokeWidth={1} className='absolute top-2 right-2'/>
      </div>
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
        
      </div>
    </nav>
  )
}
