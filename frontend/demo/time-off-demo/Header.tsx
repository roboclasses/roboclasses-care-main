'use client'
import dynamic from 'next/dynamic'
import React from 'react'
const DynamicApplyLeaveDialog = dynamic(()=>import('@/demo/dialog-demo/ApplyLeaveDialog'))

const Header = () => {
  return (
    <div className='flex items-center justify-between'>
        <div className='flex items-center gap-4'>
            <h1 className='font-semibold lg:text-4xl text-xl'>Time Off</h1>
        </div>
        <DynamicApplyLeaveDialog name='Request time off' variant='default' className='rounded-full'/>
    </div>
  )
}

export default Header