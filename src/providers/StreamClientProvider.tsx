'use client'
import React, { ReactNode, useEffect, useState } from 'react'
import {

    StreamVideo,
    StreamVideoClient,

  } from '@stream-io/video-react-sdk';
import { useUser } from '@clerk/nextjs';
import Loader from '@/components/Loader';
import { tokenProvider } from '@/actions/streamToken.actions';


  const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;

  // const userId = 'user-id';
  // const token = 'authentication-token';
  // const user: User = { id: userId };
  

  export const StreamClientProvider = ({children}:{children:ReactNode}) => {
    const[videoClient, setVideoClient] = useState<StreamVideoClient>();
    const {user,isLoaded } = useUser();
    useEffect(()=>{
    if(!isLoaded ||  !user) return;
    if(!apiKey) throw new Error('API KEY missing')

      const client = new StreamVideoClient({
        apiKey: apiKey,
        user: {
          id: user?.id,
          name: user?.username || user?.id,
          image: user?.imageUrl,
        },
        tokenProvider,
      });
    
      setVideoClient(client);
    },[user,isLoaded])


     if (!videoClient) {
       return <Loader/>
     }


    return (
      <StreamVideo client={videoClient}>
       {children}
      </StreamVideo>
    );
  };