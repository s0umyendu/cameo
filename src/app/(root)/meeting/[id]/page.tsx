'use client'

import CallRoom from "@/components/CallRoom";
import CallSetupRoom from "@/components/CallSetupRoom";
import { useState } from "react";
import { StreamCall, StreamTheme } from '@stream-io/video-react-sdk';
import { useGetCallById } from "@/hooks/useGetCallById";
import Loader from "@/components/Loader";
import { useUser } from "@clerk/nextjs";
import { Alert } from "@/components/ui/alert";





export default function Page({ params }: { params: { id: string } }) 
{   
    const {id} = params;
    const [setupComplete, setSetupComplete]=  useState(false);
    const { call, isCallLoading } = useGetCallById(id);
    const { isLoaded, user } = useUser();

     
 
    if (!isLoaded || isCallLoading) return <Loader />;

  if (!call) return (
    <p className="text-center text-3xl font-bold text-white">
      Call Not Found
    </p>
  );

    const notAllowed = call.type === 'invited' && (!user || !call.state.members.find((m) => m.user.id === user.id));

    if (notAllowed) return  <Alert
    title={`You are not allowed to join this meeting `}
  />
 

    return (<div className="text-white h-screen w-full"> 

  <StreamCall call={call}>
     <StreamTheme>
     {!setupComplete ?<CallSetupRoom  setSetupComplete={setSetupComplete}/> : <CallRoom/>}
  
  </StreamTheme>
    </StreamCall>
    

    </div>)
  }