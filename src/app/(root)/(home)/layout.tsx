import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'
import { Metadata } from 'next';
import React, { ReactNode } from 'react'


export const metadata: Metadata = {
  title: "Cameo",
  description: "Video calling App",
  icons: {
    icon: "/icons/app.png",
  },
};

export default function HomeLayout({children}:{children:ReactNode}) {
  return (
    <main className='relative'>
         
         <Navbar/>
        <div className='flex'>
        <Sidebar/>

        <section className=' flex  bg-slate-950 min-h-screen flex-1 flex-col px-6 pb-10 pt-10 sm:pb-14 sm:px-14'>
                  
     
                  <div className='w-full'> 
                      
                     {children} 
                     </div>
      
                 
               </section>
        </div>

        

       
        
        </main>
  )
}
