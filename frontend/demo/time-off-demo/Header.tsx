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
    <div className='flex items-center justify-between'>
        <div className='flex items-center gap-4'>
            <h1 className='font-semibold lg:text-4xl text-xl'>Time Off</h1>
            {/* Starred feature */}
            {isStarred ? <Star size={20} color='brown' onClick={handleStarred} /> : <Star size={20} color='gray' onClick={handleStarred}/>}
        </div>
        <TimeOffButton 
            name='Request time off' 
            type='button' 
        />
    </div>
  )
}

export default Header