'use client'

import dynamic from 'next/dynamic'
import React from 'react'
const DynamicApplyLeaveDialog = dynamic(()=>import('@/demo/dialog-demo/ApplyLeaveDialog'))
// import { FaStar } from "react-icons/fa";


const Header = () => {
// const [isStarred, setIsStarred] = useState(false)

// Handle starred
// const handleStarred = ()=>{
//     setIsStarred((prev)=>!prev)
// }

  return (
    <div className='flex items-center justify-between'>
        <div className='flex items-center gap-4'>
            <h1 className='font-semibold lg:text-4xl text-xl'>Time Off</h1>
            {/* Starred feature only ui */}
            {/* {isStarred ? <FaStar size={20} color='gold' onClick={handleStarred} /> : <FaStar size={20} color='gray' onClick={handleStarred}/>} */}
        </div>
        <DynamicApplyLeaveDialog name='Request time off' variant='default' className='rounded-full'/>
    </div>
  )
}

export default Header