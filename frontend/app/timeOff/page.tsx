import Header from '@/demo/time-off-demo/Header'
import HeroSection from '@/demo/time-off-demo/HeroSection'
import React from 'react'

const page = () => {
  return (
    <div className='px-4 py-6 space-y-4 bg-muted/100 min-h-screen'>
        <Header />
        <HeroSection/>
    </div>
  )
}

export default page