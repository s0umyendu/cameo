'use client'

import React from 'react'
import {
    Sheet,
    SheetContent,
    SheetClose,
    SheetTrigger,
  } from "@/components/ui/sheet"
import Image from 'next/image'
import Link from 'next/link';
import { sideBarLinks } from '@/constants';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
  
export default function MobileNav() {
    const pathName = usePathname();
  return (
    <div className='w-full max-w-[250px]'>
     <Sheet  >
  <SheetTrigger>
    <Image className='sm:hidden cursor-pointer' src={'icons/hamburger.svg'} height={40} width={40} alt='hamburger'></Image>
  </SheetTrigger>
  <SheetContent side={'left'} className='bg-black border-none text-white'>
  {sideBarLinks.map(
         
         (link,key)=>{
           const isActive = pathName ===  link.route || pathName.startsWith(`/${link.route}`);  

            return(
              <SheetClose asChild key={key}>
              <Link key={key} href={link.route} className={cn('flex gap-4 items-center p-4 rounded-lg ',{
                'bg-cyan-500 text-black': isActive
            })}>
                <Image src={link.imgURL} alt={link.label} width={22} height={22}></Image>
              
              <p className='text-lg font-semibold text-white max-sm:hidden'>  {link.label}</p>
                

            </Link>
            </SheetClose>)
          
           })}
  </SheetContent>
</Sheet>


    </div>
  )
}
