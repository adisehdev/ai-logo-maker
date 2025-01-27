import { UserContext } from '@/app/_context/UserContext'
import Image from 'next/image'
import React, { useContext, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { useUser } from '@clerk/nextjs'


const Info = () => {
    const {userInfo,setUserInfo} = useContext(UserContext)
    const router = useRouter()
    
    const user = useUser()

    

    useEffect(() => {
        if(user?.isSignedIn)getUserInfo();
        else router.push('/')
      }, [user]);

    const getUserInfo = async () => {
        console.log("getting user info in dashboard");
        try {
          const result = await axios.post("/api/users/", {
            userEmail: userInfo?.email,
            userName : userInfo?.name
          });
          if (result?.data?.error) {
            throw new Error(result?.data?.error);
          } else {
            setUserInfo(result?.data);
          }
        } catch (error) {
          //console.log("could not get user info in dashboard");
          console.log("error in get user info dashboard",error);
        }
      };

   



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