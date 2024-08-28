"use client"
import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { chatSession } from '@/utils/GeminiAPIModel'
import { LoaderCircle } from 'lucide-react'
import { v4 as uuidv4 } from 'uuid';
import { MockInterview } from '@/utils/schema'
import { useUser } from '@clerk/nextjs'
import moment from 'moment'
import { db } from '@/utils/db'
import { useRouter } from 'next/navigation'


function AddNew() {
    const [openDialog, setOpenDialog] = useState(false)
    const [jobPos, setJobPos] = useState('')
    const [jobDesc, setJobDesc] = useState('')
    const [jobExp, setJobExp] = useState(0)
    const [loading,setLoading]=useState(false)
    const [jsonRes,setJsonRes]=useState([])
    const {user}=useUser()
    const router=useRouter()

    const onSubmit = async (e) => {
        setLoading(true)
        e.preventDefault()
        console.log("values", jobPos, jobDesc, jobExp);

        const InputMsg = `job position: ${jobPos}, job description: ${jobDesc}, Years of experience: ${jobExp}. On the basis of following information, give me 5 interview questions along with their answers in JSON format. Give question and answer as fields in JSON.`
        const result = await chatSession.sendMessage(InputMsg);
        const JsonResp=(result.response.text()).replace('```json','').replace('```','')
        console.log("resp",JSON.parse(JsonResp));

        setJsonRes(JsonResp)
        
        if (JsonResp) {
            const response=await db.insert(MockInterview)
        .values({
            mockId:uuidv4(),
            jsonMockResp:JsonResp,
            jobPosition:jobPos,
            jobDesc:jobDesc,
            jobExperience:jobExp,
            createdBy:user?.primaryEmailAddress?.emailAddress,
            createdAt:moment().format('DD-MM-yyyy')
        }).returning({mockId:MockInterview.mockId})

        console.log("Inserted id",response);
        setOpenDialog(false)
        router.push(`dashboard/interview/${response[0].mockId}`)
        }
        else{
            console.log("ERR");
            
        }

        setLoading(false)
    }


    return (
        <div>
            <div onClick={() => setOpenDialog(true)} className='p-8 rounded-lg border bg-secondary hover:scale-105 hover:shadow-md cursor-pointer'>
                <h2>+ AddNew</h2>
            </div>
            <Dialog open={openDialog}>

                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Tell us more about your job details</DialogTitle>
                        <DialogDescription>
                            <div>
                                <h2>Add details for job position/role, job description and years of experience</h2>

                                <form onSubmit={onSubmit}>
                                    <div className='mt-7 my-3'>
                                        <label>Job Position/Role</label>
                                        <Input placeholder="Eg. Full Stack Dev" onChange={(e) => setJobPos(e.target.value)} required></Input>
                                    </div>
                                    <div className='my-3'>
                                        <label>Job Description (Tech Stack)</label>
                                        <Textarea placeholder="Eg. React,Angular,etc" onChange={(e) => setJobDesc(e.target.value)} required></Textarea>
                                    </div>
                                    <div className='my-3'>
                                        <label>Years of experience</label>
                                        <Input placeholder="Eg. 5" type="number" max="50" onChange={(e) => setJobExp(e.target.value)} required></Input>
                                    </div>

                                    <div className='flex gap-5 justify-end'>
                                        <Button type="button" variant="ghost" onClick={() => setOpenDialog(false)}>Cancel</Button>
                                        <Button type="submit" disabled={loading}>
                                            {loading ? <><LoaderCircle className='animate-spin'/> {" "}Generating..</> : "Start Interview"}</Button>
                                    </div>
                                </form>
                            </div>
                        </DialogDescription>

                    </DialogHeader>
                </DialogContent>
            </Dialog>

        </div>

    )
}

export default AddNew