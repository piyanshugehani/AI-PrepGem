"use client"
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react'
import Ques from './_components/Ques';
import WebcamComponent from './_components/Webcam';



export default function StartInterview({ params }) {
    const [data, setData] = useState();
    const [interviewQues,setInterviewQues]=useState([]);
    const [activeIndex,setActiveIndex]=useState(0)

    useEffect(() => {
        console.log("id from params", params.interviewId);
        getInterviewDetails()
    }, [])

    const getInterviewDetails = async () => {
        const result = await db.select().from(MockInterview).where(eq(MockInterview.mockId, params.interviewId))
        // console.log("ques", result[0].jsonMockResp);
        const jsonMockResponse=JSON.parse(result[0].jsonMockResp)
        setInterviewQues(jsonMockResponse)
        setData(result[0])
    }
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-10 my-10'>
        <Ques interviewQues={interviewQues} activeIndex={activeIndex} setActiveIndex={setActiveIndex}/>
        <WebcamComponent data={data} interviewQues={interviewQues} activeIndex={activeIndex} setActiveIndex={setActiveIndex}/>
    </div>
  )
}
