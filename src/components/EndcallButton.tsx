import React from 'react'
import { Button } from './ui/button'
import { useRouter } from 'next/navigation';
import { useCall } from '@stream-io/video-react-sdk';

export default function EndcallButton() {

  const router = useRouter();
  const call= useCall();

  if (!call)
    throw new Error(
      'useStreamCall must be used within a StreamCall component.',
    );


const endCall = async () => {
 await call.endCall();
  router.push('/');
};
 


  return (
    <div>
        <Button className='bg-red-600' onClick={endCall}>
            
            End the meeting for everyone
            
            </Button> 

    </div>
  )
}
