"use client"
import React, { useState } from 'react'
import Lookup from '../_data/Lookup'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const Hero = () => {
    const [logoTitle,setLogoTitle] = useState('')
  return (

    <div className='flex flex-col items-center mt-24 gap-5'>
        <h2 className='text-5xl text-center font-bold text-gray-700'>{Lookup.HeroHeading}</h2>
        <h2 className='text-5xl text-center font-bold text-blue-500'>{Lookup.HeroSubheading}</h2>
        <h2 className='text-lg text-center text-gray-500'>{Lookup.HeroDesc}</h2>
        <div className='flex gap-6 w-full max-w-2xl mt-10'>
            <input type='text' placeholder={Lookup.InputTitlePlaceholder} className='p-3 border-2 rounded-md w-full shadow-md' value={logoTitle} onChange={(e) => setLogoTitle(e.target.value)}/>
            <Link href={`/create?title=${logoTitle}`}>
            <Button className='w-full p-6 font-bold'>Get Started</Button>
            </Link>
        </div>
    </div>
  )
}

export default Hero