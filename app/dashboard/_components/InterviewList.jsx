"use client"
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { useUser } from '@clerk/nextjs'
import { eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react'
import InterviewCard from './InterviewCard';

function InterviewList() {
    const {user}=useUser();
    const [list,setList]=useState([]);

    const getInterviewListforUser=async()=>{
        const res=await db.select().from(MockInterview).where(eq(MockInterview.createdBy,user?.primaryEmailAddress?.emailAddress))
        console.log("response from db",res);   
        setList(res);
    }

    useEffect(()=>{
        user&&getInterviewListforUser();
    },[user])           //login pe user is set from null to some user, thus user needs to be in dependency

  return (
    <div>
        <h2>Previous Interviews</h2>
        {list&&list.map((interview,index)=>(
            <InterviewCard interview={interview} key={index}/>
        ))}

    </div>
  )
}

export default InterviewList