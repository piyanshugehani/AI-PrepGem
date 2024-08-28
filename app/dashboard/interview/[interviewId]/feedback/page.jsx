"use client"
import { db } from '@/utils/db'
import { UserAnswer } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import React, { useEffect, useState } from 'react'
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
  } from "@/components/ui/collapsible"
import { ChevronDown } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
  

function feedback({params}) {
    const [feedbackList,setFeedbackList]=useState([])
    const router=useRouter();

    useEffect(()=>{
        getFeedback();
    },[])

    const getFeedback=async()=>{
        console.log("params id",params);
        const result=await db.select().from(UserAnswer).where(eq(UserAnswer.mockIdRef,params.interviewId));
        console.log("db data",result);
        setFeedbackList(result);
    }

  return (
    <div>
      {feedbackList.length>0 ? 
      <>
      <h2 className='my-4 text-2xl font-bold text-green-500'>Congratulations, Here is your interview feedback!</h2>
        <h2 className='text-lg my-2 mx-1'>Overall interview rating: <span className='font-semibold'>7/10</span></h2>
        <h2 className='my-6 mx-1'>Find below your questions, answers an feedbacks related to the interview</h2>
      </> 
      : 
      <>
      <h2 className='mt-10 mb-2 text-2xl font-bold'>Oops, looks like you haven't completed the interview for this post yet!</h2>
      <Link href={`/dashboard/interview/${params?.interviewId}`}><span className='text-primary hover:font-bold'>Give Interview now?</span></Link>
      </>

      }
        

        {feedbackList&&feedbackList.map((item,index)=>(
            <div className='my-2'>
                <Collapsible key={index}>
            <CollapsibleTrigger className='p-2 rounded-lg bg-slate-200 flex justify-between items-center gap-2'>{item?.question}<ChevronDown/></CollapsibleTrigger>
            <CollapsibleContent>
              <div className='my-2 bg-amber-50 border rounded-lg flex flex-col gap-2 p-4'>
                <h2 className={`${item?.rating<5?'text-red-500':'text-green-500'} font-semibold`}><span>Score</span> : {item?.rating}/10</h2>
                <h2><span className='font-semibold'>Your answer</span> : {item?.userAns}</h2>
                <h2><span className='font-semibold'>Feedback</span> : {item?.feedback}</h2>
                <h2><span className='font-semibold'>Recommended answer</span> : {item?.correctAns}</h2>
              </div>
            </CollapsibleContent>
          </Collapsible>
            </div>
          
        ))}
        <div className='flex justify-end'>
        {feedbackList.length>0&&<Button className="mt-6" onClick={()=>router.replace('/dashboard')}>Go to home</Button>}
        </div>
    </div>
  )
}

export default feedback