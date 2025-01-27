import { UserContext } from '@/app/_context/UserContext'
import Image from 'next/image'
import React, { useContext, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useRouter } from 'next/navigation'


const Info = () => {
    const {userInfo,setUserInfo} = useContext(UserContext)
    const router = useRouter()
    


    console.log("user dashboard",userInfo)

   



  return (
    <div>
        <div className='flex items-center justify-between'>
            <h2 className='text-2xl'>Welcome <span className='text-blue-500 font-bold'>{userInfo?.name}</span></h2>
            <div className='flex gap-2 items-center'>
                <Image src={'/coin.png'} width={40} height={40} alt='coin-img'/>
                <div>
                    <h2 className='text-2xl font-bold'>Credits Left : {userInfo?.credits}</h2>
                </div>
            </div>
        </div>

        <div className='mt-8 flex items-center justify-between'>
            <h2 className='text-2xl font-bold'>Dashboard</h2>
            <Link href={'/create'}><Button className='mt-4'>+ Create New Logo</Button></Link>
        </div>
    </div>
  )
}

export default Info