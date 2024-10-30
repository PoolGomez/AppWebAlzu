import { Logo } from '@/components/Logo'
import { NavbarPublic } from '@/components/NavbarPublic'
// import { Sidebar } from '@/components/Sidebar/Sidebar'
import React from 'react'

export default function LayoutPublic({children}:{children: React.ReactElement}) {
  return (
    <div className='flex w-full h-full'>
        {/* <div className='hidden xl:block w-80 h-full xl:fixed'>
            <Sidebar />
        </div>     */}
        {/* xl:ml-80 */}
        <div className='w-full'>
            <NavbarPublic />
            <div className='p-6 bg-[#fafbfc] dark:bg-secondary'>
            {children}
             </div>
            
         </div>
     </div>
  )
}