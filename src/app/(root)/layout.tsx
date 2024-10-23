
import { StreamClientProvider } from '@/providers/StreamClientProvider'
import { Metadata } from 'next';
import React, { ReactNode } from 'react'

export const metadata: Metadata = {
  title: "Cameo",
  description: "Video calling App",
  icons: {
    icon: "/icons/app.png",
  },
};
export default function RootLayout({children}:{children: ReactNode}) {
  
  return (
    <main >

    <StreamClientProvider>{children} </StreamClientProvider>
      
      </main>
  ) 
}
