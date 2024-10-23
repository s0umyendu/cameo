import type { Metadata } from "next";
import localFont from "next/font/local";
import '@stream-io/video-react-sdk/dist/css/styles.css';

import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Cameo",
  description: "Video calling App",
  icons: {
    icon: "/icons/app.png",
  },
};
import {
  ClerkProvider,
 
} from '@clerk/nextjs'

import { Toaster } from "@/components/ui/toaster"


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (

    <ClerkProvider appearance={{
      layout:{
        logoImageUrl:'icons/app.png',
        socialButtonsVariant: 'iconButton'  
      },
      variables:{
      colorText: '#fff',
      colorPrimary:'#0E78F9',
      colorBackground:'#1C1F2E',
      colorInputBackground:'#252A41',
      colorInputText:'#fff'
    }}}> 
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-shiny-gradient text-white`}
      >
        {children}
      </body>
      <Toaster />
    </html>
    
    </ClerkProvider>
  );
}
