import { UserContext } from '@/app/_context/UserContext'
import Image from 'next/image'
import React, { useContext, useState,useEffect } from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { useUser } from '@clerk/nextjs'


const Info = () => {
    const {userInfo,setUserInfo,credits,setCredits} = useContext(UserContext)
    const [currCredits,setCurrentCredits] = useState(parseInt(userInfo?.credits))
    const router = useRouter()

    const user = useUser()
    
    

    console.log("user info dashboard",userInfo)

    useEffect(() => {
        if(!userInfo?.email) router.push('/')
            else{
                getUserInfo()
        }
    },[userInfo])

    const getUserInfo = async () => {
        try {
            const res = await axios.post("/api/users",{userEmail:userInfo?.email,
                userName : userInfo?.name})
            setCredits(res?.data?.credits)
            
            
        } catch (error) {
            console.log("erorr in dashboard getting users",error);
        }
    }

   



  return (
    <div>
        <div className='flex items-center justify-between'>
            <h2 className='text-2xl'>Welcome <span className='text-blue-500 font-bold'>{userInfo?.name}</span></h2>
            <div className='flex gap-2 items-center'>
                <Image src={'/coin.png'} width={40} height={40} alt='coin-img'/>
                <div>
                    <h2 className='text-2xl font-bold'>Credits Left : {credits}</h2>
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