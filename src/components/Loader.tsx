import Image from 'next/image'
import React from 'react'

export default function Loader() {
  return (
    <div className='h-screen w-full flex items-center justify-center'>

        <Image   src={'icons/loading-circle.svg'} height={40} width={40} alt='Loading...'/> 
    </div>
  )
}
