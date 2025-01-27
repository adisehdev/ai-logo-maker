"use client"
import React, { use, useEffect } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { UserButton, useUser } from '@clerk/nextjs'
import { UserContext } from '../_context/UserContext'
import { useContext } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const Header = () => {
  const user = useUser()
  const router = useRouter()


  const {userInfo,setUserInfo} = useContext(UserContext)

  console.log("header user",user)

  const handleSignOut = async () => {
    const storage = localStorage.getItem("formData");

    if (storage) {
      localStorage.removeItem("formData");
      setUserInfo({})

     
    }

    await user.signOut();
    router.push("/")
  }

  
  
  return (
    <div className='px-10 lg:px-32 xl:px-48 2xl:px-56 p-4 flex justify-between items-center shadow-sm'>
        <Link href={'/'}><Image src={'logo.svg'} alt={'logo'} width={180} height={100}/></Link>
        <div className='flex items-center gap-3'>
        {user.isSignedIn ? <Link href={'/dashboard'}><Button mode='outline' className='font-bold' >Dashboard</Button></Link> : <Link href={'/create'}><Button className='font-bold'>Get Started</Button></Link>}
        
        <UserButton>
          <UserButton.MenuItems>
            <UserButton.Action label='manageAccount'></UserButton.Action>
            <UserButton.Action label='signOut' onClick={handleSignOut}></UserButton.Action>
          </UserButton.MenuItems>
        </UserButton>
        </div>
        
    </div>
  )
}

export default Header