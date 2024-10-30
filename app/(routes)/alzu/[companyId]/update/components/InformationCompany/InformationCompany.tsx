import { Company } from '@prisma/client'
import Image from 'next/image'
import React from 'react'

import { User } from 'lucide-react'
import { CompanyForm } from '../CompanyForm'
import { NewGuest } from '../NewGuest'
import { ListGuests } from '../ListGuests'

export function InformationCompany({company}:{company:Company}) {
  return (
    <div className='grid grid-cols-1 lg:grid-cols-2 lg:gap-x-10 gap-y-4'>
        <div className='rounded-lg bg-background shadow-md hover:shadow-lg p-4'>
            <div>
            {/* typeof company.profileImage === 'string' ? company.profileImage: "/images/company-icon.png" */}
            {/* company.profileImage !== null && company.profileImage !== '' ? company.profileImage : "/images/company-icon.png"  */}
                <Image 
                    src={company.profileImage !== null && company.profileImage !== undefined && company.profileImage !== '' ? company.profileImage : "/images/company-icon.png"} 
                    alt='compnay image' width={50} height={50} className='mb-3 eounded-lg' 
                />

                {/* Todo: Company FORM */}  
                <CompanyForm company={company}/>

            </div>
        </div>

        <div className='rounded-lg bg-background shadow-md hover:shadow-lg p-4 h-min'>
            <div className='flex items-center justify-between gap-x-2'>
                <div className='flex items-center gap-x-2'>
                    <User className='w-5 h-5' />
                    Invitados
                </div>
                <div>
                    <NewGuest />
                </div>
            </div>
            <ListGuests company={company} />
            {/* <ListContacts company={company}/> */}
        </div>
    </div>
  )
}
