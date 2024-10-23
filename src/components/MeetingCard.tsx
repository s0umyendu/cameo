import React from 'react'
import { Button } from './ui/button'
import Image from 'next/image'
import { useToast } from '@/hooks/use-toast'

interface MeetingCardProps {
    type: string,
    title: string,
    date: string,
    link: string,
    handleClick: ()=>void,
    icon: string
}   

export default function MeetingCard({type,title, date, link, handleClick,icon}:MeetingCardProps) {
   const {toast} =useToast();


    return (
    <div className='flex flex-col pl-4 justify-around h-[258px] w-[533px] text-white shadow-white rounded-xl bg-slate-900'>
        
        <div><Image src={icon} width={20} height={20} alt='upcoming'/></div>
        <div className='text-3xl font-extrabold'>{title}</div>
        <div className='text-gray-400'>{date}</div>
        
        {type==='recordings'? <div className='flex gap-3'>
        <Button onClick={handleClick} className='bg-cyan-500 h-[40px] w-[240px]' title='Play'> 
            <Image src={'icons/play.svg'} width={10} height={10} alt='play'/>
            <h1>Play</h1>
        </Button>
        <Button onClick={()=>{ navigator.clipboard.writeText(link);
              toast({ title: 'Link Copied' });} } className='bg-slate-950 h-[40px] w-[240px]' title='Play'> 
            <Image src={'icons/share.svg'} width={13} height={13} alt='play'/>
            <h1>Share</h1>
        </Button>
        </div>: (<div className='flex justify-between pr-3'>
         {/* <div>images</div> */}
         {type==='upcoming' && <div className='flex'>
            <Button onClick={handleClick} className='bg-cyan-500'>
                Start
            </Button>
            <Button onClick={()=>{ navigator.clipboard.writeText(link);
              toast({ title: 'Link Copied' });}} className='bg-slate-950'>
                <Image src={'icons/copy.svg'} alt='copy' height={13} width={13}/>
                Copy Invitation
            </Button>
         </div>}
         
        </div>)}
        
    </div>
  )
}
