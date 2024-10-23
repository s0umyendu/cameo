'use client'

import React, { useEffect, useState } from 'react'
import MeetingCard from './MeetingCard'
import { useGetCalls } from '@/hooks/useGetCalls'
import { Call, CallRecording } from '@stream-io/video-react-sdk';
import Loader from './Loader';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';

export default function CallList({type}:{type: 'upcoming' | 'previous' | 'recordings'}) {
  const {upcomingCalls, endedCalls , recordings , isLoading } = useGetCalls();
  const [records, setRecords] = useState<CallRecording[]>([]); 
  const {toast} = useToast();
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4; 
  const getCalls =()=>{
    switch(type){
     case 'previous':
      return endedCalls;
     case 'upcoming':
      return upcomingCalls;
     case 'recordings':
      return records;
      default:
        return [];
}
  };

  const getNoCallMsg =()=>{
    switch(type){
     case 'previous':
      return 'No previous calls';
     case 'upcoming':
      return 'No Upcoming calls';
     case 'recordings':
      return 'No recordings';
      default:
        return [];
}
  };


  useEffect(()=>{


  const fetchRecordings =async ()=>{
    try{
    const callData = await Promise.all(
     recordings?.map((meeting)=> meeting.queryRecordings()) ?? [],
    )
     
    const callRecordings = callData.filter((call)=> call.recordings.length >0).
    flatMap((call)=> call.recordings)
  
    setRecords(callRecordings)
   }
   catch(error){
    toast({ title: 'Please try again later' }); 
  }

  
 }
 if (type === 'recordings') {
  fetchRecordings();
}


  },[type,recordings,toast])

  if (isLoading) return <Loader />;
  
  const calls =getCalls(); // getting calls accordingly from useGetcall hook
  const noCallsMsg = getNoCallMsg()
  //pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCalls = calls.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(calls.length / itemsPerPage);
  

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };
  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

    return (<div className='flex flex-col justify-between items-center gap-5'> 
    <div className='grid grid-cols-1 gap-5 xl:grid-cols-2'>  
     {currentCalls && currentCalls.length>0 ?(
     
      currentCalls.map((meeting: Call | CallRecording)=>(
        <MeetingCard key={(meeting as Call).id} 
        icon={
          type === 'previous'
            ? '/icons/previous.svg'
            : type === 'upcoming'
              ? '/icons/upcoming.svg'
              : '/icons/recordings.svg'
        }
        title={
          (meeting as Call).state?.custom?.description ||
          (meeting as CallRecording).filename?.substring(0, 20) ||
          'No Description'
        }
        date={
          (meeting as Call).state?.startsAt?.toLocaleString() ||
          (meeting as CallRecording).start_time?.toLocaleString()
        }
        type={type}
        link={
          type === 'recordings'
            ? (meeting as CallRecording).url
            : `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${(meeting as Call).id}` //upcoming meet urls
        }
        handleClick={
          type === 'recordings'
            ? () => router.push(`${(meeting as CallRecording).url}`)
            : () => router.push(`/meeting/${(meeting as Call).id}`)
        }
        />
      ))
     ):(
      <h1 className="text-2xl font-bold text-white">{noCallsMsg}</h1>
     )}

    
    </div>

     {/* Pagination toggle */}
     <div className="flex justify-between gap-5 items-center mt-5 ">
        <button
          className="px-3 py-2 bg-cyan-400 text-black rounded-md"
          onClick={handlePrevPage}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="text-white">Page {currentPage} of {totalPages}</span>
        <button
          className="px-3 py-2 bg-cyan-400 text-black rounded-md"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>


    </div>
  )
}
