import { UserButton } from '@clerk/nextjs'
import React from 'react'
import AddNew from './_components/AddNew'
import InterviewList from './_components/InterviewList'

function Dashboard() {
  return (
    <div className='my-6'>
      <h2 className='text-2xl font-semibold'>Dashboard</h2>
      <h2 className='text-gray-500'>Create and start your AI Mock Interview</h2>

      <div className='grid grid-cols-1 md:grid-cols-3 my-5'>
        <AddNew/>
      </div>
      <InterviewList/>
    </div>
  )
}

export default Dashboard