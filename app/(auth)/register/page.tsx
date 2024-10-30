import React from 'react'
import { FormRegister } from './components/FormRegister'
import Image from 'next/image'

export default function RegisterPage() {
  return (
    <div className="flex justify-center items-center md:h-[95vh] md:px-10 lg:px-26">
        <div className="container h-[85vh] flex-col justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
            
            

            {/* ========== Form =========== */}
            <div className="pt-10 lg:p-8 flex items-center md:h-[70vh]">
                <div className="mz-auto fllex w-full flex-col justify-center space-y-6 sm:w-[450px]">
                <FormRegister />

                </div>
            </div>

            {/* ================ Image =============== */}
            <div className="relative hidden h-full flex-col p-10 text-white lg:flex">
                <div className="relative z-20 flex items-center text-lg font-medium">
                  <Image src="/images/register.png" alt='login' width={626} height={440} layout='responsive'/>
                </div>
            </div>


        </div>
    </div>
    
  )
}
