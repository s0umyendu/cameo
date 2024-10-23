"use client"

import { sideBarLinks } from '@/constants'
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation'
import React from 'react'

export default function Sidebar() {
   const pathName= usePathname();

  return (
    <div className='sticky left-0 top-0 flex h-screen w-fit flex-col justify-between bg-slate-900 p-6 pt-28 text-white max-sm:hidden lg:w-[264px]'>
        <div className='flex flex-col gap-6'>
           {sideBarLinks.map((link,key)=>{
           const isActive = pathName ===  link.route || pathName.startsWith(`/${link.route}`);  

            return( <Link key={key} href={link.route} className={cn('flex gap-4 items-center p-4 rounded-lg justify-start',{
                'bg-cyan-500 text-black': isActive
            })}>
                <Image src={link.imgURL} alt={link.label} width={22} height={22}></Image>
              <p className='text-lg font-semibold max-lg:hidden'>  {link.label}</p>
                
            </Link>)
          
           })}
        </div>

    </div>
  )
}
