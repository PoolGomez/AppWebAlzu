import React from 'react'
import { FormLogin } from './components/FormLogin'
import Image from 'next/image';


export default function LoginPage(
  // {searchParams}:{searchParams: {isVerifyEmail:string}}
) {
  // const isVerify = searchParams.isVerifyEmail === "true";
  return (
    <div className="flex justify-center items-center md:h-[95vh] md:px-10 lg:px-26">
            <div className="container h-[85vh] flex-col justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
                
                {/* ================ Image =============== */}
                <div className="relative hidden h-full flex-col p-10 text-black dark:text-white lg:flex">
                    
                    
                    <div className="relative z-20 flex items-center text-lg font-medium">
                      <Image src="/images/login.png" alt='login' width={626} height={470} layout='responsive'/>
                    </div>

                </div>

                {/* ========== Form =========== */}
                <div className="pt-10 lg:p-8 flex items-center md:h-[70vh]">
                    <div className="mz-auto flex w-full flex-col justify-center space-y-6 sm:w-[450px]">
                    <FormLogin 
                    // isVerifyEmail={isVerify}
                    />

                    </div>
                </div>
            </div>
        </div>
    
  )
}
