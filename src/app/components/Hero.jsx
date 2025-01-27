"use client"
import React, { useState } from 'react'
import Lookup from '../_data/Lookup'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'

const Hero = () => {
    const [logoTitle,setLogoTitle] = useState('')
    const sampleImages = ['/sample_1.png','/sample_2.png','/sample_3.png','/sample_4.png','/sample_5.png','/sample_6.png']
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

        <div className='my-10 grid grid-cols-2 md:grid-cols-3 gap-10'>
            {
                sampleImages.map((img,index) => (
                    <div key={index}>
                        <Image src={img} alt={img} width={300} height={200} className='w-full rounded-xl h-[200px] object-cover'/>
                    </div>
                ))
            }
        </div>
    </div>
  )
}

export default Hero