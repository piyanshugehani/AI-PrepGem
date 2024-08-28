"use client"
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react'
import Webcam from 'react-webcam';
import { LightbulbIcon, WebcamIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';


function Interview({ params }) {
    const [data, setData] = useState();
    const [webcamEnabled, setWebcamEnabled] = useState(false);
    const router=useRouter();

    useEffect(() => {
        console.log("id from params", params.interviewId);
        getInterviewDetails()
    }, [])

    const getInterviewDetails = async () => {
        const result = await db.select().from(MockInterview).where(eq(MockInterview.mockId, params.interviewId))
        console.log("details!!", result[0]);
        setData(result[0])
    }

    return (
        <div className='flex my-10 flex-col'>
            <h2 className='font-semibold text-2xl'>Hello! Lets get started.</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
                <div className='flex flex-col my-7 gap-5'>
                    <div className='flex flex-col p-5 rounded-lg border gap-5'>
                        <h2><span className='font-semibold'>Job Role:</span> {data?.jobPosition}</h2>
                        <h2><span className='font-semibold'>Job Description/Tech Stack:</span> {data?.jobDesc}</h2>
                        <h2><span className='font-semibold'>Job Experience:</span> {data?.jobExperience}</h2>
                    </div>
                    <div className='p-5 border rounded-lg bg-yellow-100 border-yellow-500 shadow-sm'>
                        <h2 className='flex gap-1 items-center font-semibold text-yellow-500 mb-2'><LightbulbIcon/>Information</h2>
                        <h2>{process.env.NEXT_PUBLIC_INFO}</h2>
                    </div>
                </div>
                <div>
                    {webcamEnabled ?
                        <Webcam onUserMedia={() => setWebcamEnabled(true)} onUserMediaError={() => setWebcamEnabled(false)} mirrored={true} />
                        :
                        <div className='my-7 flex flex-col'>
                            <WebcamIcon className='h-72 w-full p-20 bg-secondary rounded-lg border' />
                            <Button variant="ghost" className='my-4' onClick={() => setWebcamEnabled(true)}>Enable Camera and Microphone</Button>
                        </div>
                    }
                </div>
            </div>

        <div className='flex justify-end items-end'>
            <Button onClick={()=>router.push(`/dashboard/interview/${params.interviewId}/start`)}>Start Interview</Button>
        </div>

        </div>
    )
}

export default Interview