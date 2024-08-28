import React, { useState, useRef, useEffect } from 'react';
import Webcam from 'react-webcam';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { chatSession } from '@/utils/GeminiAPIModel';
import { db } from '@/utils/db';
import { UserAnswer } from '@/utils/schema';
import { useUser } from '@clerk/nextjs';
import moment from 'moment';
import { toast } from 'sonner';
import { LoaderCircle, Mic } from 'lucide-react';
import { CircleStopIcon } from 'lucide-react';

function WebcamComponent({data,interviewQues,activeIndex,setActiveIndex}) {
  const [userAns, setUserAns] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const recognitionRef = useRef(null);
  const [loader,setLoader]=useState(false);
  const {user}=useUser();   //get user data through user hook for email

  useEffect(() => {
    if (!('webkitSpeechRecognition' in window)) {
      console.error('Speech Recognition not supported in this browser.');
      return;
    }

    const recognition = new webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      console.log('Recognition started');
      setIsRecording(true);
    };

    recognition.onerror = (event) => {
      if (event.error === 'no-speech') {
        console.error('No speech detected. Please try again.');
      } else {
        console.error('Speech Recognition Error:', event.error);
      }
    };

    recognition.onend = () => {
      console.log('Recognition ended');
      setIsRecording(false);
    };

    const handleSpeechRecognition = () => {
      return new Promise((resolve, reject) => {
        
        recognition.onresult = (event) => {
          const transcript = Array.from(event.results)
            .map(result => result[0]?.transcript)
            .join('');
          console.log('Transcript:', transcript);
          setUserAns(transcript)
          resolve(transcript);
        };
        

        recognition.onerror = (event) => {
          reject(new Error(`Speech Recognition Error: ${event.error}`));
        };

        recognition.start();
      });
      
      
    };

    recognitionRef.current = {
      recognition,
      handleSpeechRecognition
    };

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.recognition.stop();
        recognitionRef.current = null;
        console.log('Recognition stopped on component unmount');
      }
    };
  }, []);

  const startRecording = async () => {
    if (recognitionRef.current) {
      try {
        const transcript = await recognitionRef.current.handleSpeechRecognition();
        setUserAns(transcript);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const stopRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.recognition.stop();
    }
  };

  const handleButtonClick = async() => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
    setIsRecording(!isRecording);
  };

  const savetoDB=async()=>{
    setLoader(true)
    const feedbackPrompt=`Question: ${interviewQues[activeIndex]?.question}, User's answer: ${userAns}, depending on given question and user's answer please give a rating (out of 10) for the answer and feedback as area of improvement if any, and also a recommended answer for the user if you were in his place, in max 3-4 lines in JSON format with rating,feedback and answer as fields in JSON.`
    const res=await chatSession.sendMessage(feedbackPrompt)
    const mockJsonResp=(res.response.text()).replace('```json','').replace('```','')
    console.log("resp",mockJsonResp);
    const JsonFeedback=JSON.parse(mockJsonResp)
    console.log("user:",userAns);
    

    const dbresponse=await db.insert(UserAnswer).values({
      mockIdRef:data?.mockId,
      question: interviewQues[activeIndex]?.question,
      correctAns:JsonFeedback?.answer,
      userAns: userAns,
      feedback: JsonFeedback?.feedback,
      rating: JsonFeedback?.rating,
      userEmail: user?.primaryEmailAddress?.emailAddress,
      createdAt: moment().format("DD-MM-yyyy")
    })

    if (dbresponse){
      toast("User answer recorded successfully!")
      console.log(dbresponse);
      
      setUserAns('')
      setLoader(false)
      stopRecording()
      return;
    }
    else{
      toast("Oops, couldn't record your answer")
      setUserAns('')
      return;
    }
  }

  return (
    <div>
      <div className='flex justify-end items-center gap-2'>
    {activeIndex>0&&<Button onClick={()=>setActiveIndex(activeIndex-1)}>{"< "}Prev</Button>}
    {activeIndex!=interviewQues?.length-1&&<Button onClick={()=>setActiveIndex(activeIndex+1)}>Next{" >"}</Button>}
    {activeIndex==interviewQues?.length-1&&<Link href={`/dashboard/interview/${data?.mockId}/feedback`}><Button>End Interview</Button></Link>}
    </div>
      <div className='flex flex-col justify-center items-center bg-black my-5 rounded-lg p-10'>
        <Image src={"/cam.jpg"} width={150} height={200} className='absolute' />
        <Webcam mirrored={true} style={{ zIndex: 100, height: 250, width: '100%' }} />
      </div>
      <div className='flex items-center gap-2'>
      <Button variant="outline" className="my-1" onClick={handleButtonClick}>
        {isRecording ? <><span className='text-red-500 flex gap-1'><CircleStopIcon size={18}/>Recording..</span></> : <span className='flex gap-1'><Mic size={18}/>Record Answer</span>}
      </Button>
      <Button variant="outline" onClick={savetoDB}>{loader ? <LoaderCircle className='animate-spin'/> : 'Save'}</Button>
      </div>
      
      <h2 className='mx-2'>{userAns}</h2>
      
      
    </div>
  );
}

export default WebcamComponent;
