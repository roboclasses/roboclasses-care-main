'use client'

import React, { useState } from 'react'

import { Star } from 'lucide-react'
import { TimeOffButton } from '../button-demo/TimeOffButton'

const Header = () => {
const [isStarred, setIsStarred] = useState(false)

// Handle starred
const handleStarred = ()=>{
    setIsStarred((prev)=>!prev)
}

  return (
    <div className='flex items-center justify-between p-10'>
        <div className='flex items-center gap-2'>
            <h1 className='font-semibold text-4xl'>Time Off</h1>
            {/* Starred feature */}
            {isStarred ? <Star size={25} color='brown' onClick={handleStarred} /> : <Star size={25} color='gray' onClick={handleStarred}/>}
        </div>
        <TimeOffButton 
            name='Request time off' 
            type='button' 
            className='rounded-full px-10 py-4'
        />
    </div>
  )
}

export default Header