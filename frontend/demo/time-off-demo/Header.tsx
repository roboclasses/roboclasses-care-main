'use client'

import React, { useState } from 'react'

import { Star } from 'lucide-react'
import { ApplyLeaveDialog } from '../dialog-demo/ApplyLeaveDialog'


const Header = () => {
const [isStarred, setIsStarred] = useState(false)

// Handle starred
const handleStarred = ()=>{
    setIsStarred((prev)=>!prev)
}

  return (
    <div className='flex items-center justify-between'>
        <div className='flex items-center gap-4'>
            <h1 className='font-semibold lg:text-4xl text-xl'>Time Off</h1>
            {/* Starred feature only ui */}
            {isStarred ? <Star size={20} color='brown' onClick={handleStarred} /> : <Star size={20} color='gray' onClick={handleStarred}/>}
        </div>
        <ApplyLeaveDialog name='Request time off' variant='default' className='rounded-full'/>
    </div>
  )
}

export default Header