"use client"
import React, { useEffect } from 'react'
import LogoList from './components/LogoList'
import Info from './components/Info'
import { useRouter } from 'next/navigation'
import { useContext } from 'react'
import { UserContext } from '../_context/UserContext'

const Dashboard = () => {
    const router = useRouter()
    const {userInfo,setUserInfo} = useContext(UserContext)

    useEffect(() => {
        if(!userInfo){
            router.push('/')
        }
    }, [userInfo])
  return (




    <div className='mt-20'>
        <Info/>
        <LogoList/>
    </div>
  )
}

export default Dashboard