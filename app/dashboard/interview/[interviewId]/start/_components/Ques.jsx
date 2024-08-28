import { Lightbulb, Volume2} from 'lucide-react';
import React from 'react'

function Ques({interviewQues,activeIndex,setActiveIndex}) {
    console.log("questions here",interviewQues);
    console.log("active",activeIndex);

    const textToSpeechh=(text)=>{
        if ('speechSynthesis' in window){
            const speech=new SpeechSynthesisUtterance(text)
            window.speechSynthesis.speak(speech)
        }
        else{
            alert("Oops! Your browser does not support text to speech feature :/")
        }
    }
    
  return (
    <div className='p-5 border rounded-lg'>
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3'>
            {interviewQues&&interviewQues.map((question,index)=>(
                <h2 onClick={() => setActiveIndex(index)} className={`p-2 rounded-full text-center cursor-pointer ${activeIndex===index ? 'text-white bg-primary' : 'bg-secondary'}`}>Question #{index+1}</h2>
            ))}
        </div>
        <h2 className='my-5 text-md md:text-lg'>{interviewQues[activeIndex]?.question}</h2>
        <Volume2 className='cursor-pointer' color="gray" onClick={()=>textToSpeechh(interviewQues[activeIndex]?.question)}/>
        <div className='border rounded-lg p-5 bg-blue-100 mt-20'>
            <h2 className='flex gap-2 items-center text-primary'>
                <Lightbulb/>
                <span className='font-semibold'>Note:</span>
            </h2>
            <h2 className='text-sm my-2 text-primary'>{process.env.NEXT_PUBLIC_QUESTION_NOTE}</h2>
        </div>
    </div>
  )
}

export default Ques