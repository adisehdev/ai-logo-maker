// "use client"
// import React, { use, useEffect } from 'react'
// import Image from 'next/image'
// import { Button } from '@/components/ui/button'
// import { UserButton, useUser } from '@clerk/nextjs'
// import { UserContext } from '../_context/UserContext'
// import { useContext } from 'react'
// import Link from 'next/link'
// import { useRouter } from 'next/navigation'

// const Header = () => {
//   const user = useUser()
//   const router = useRouter()

//   const {userInfo,setUserInfo} = useContext(UserContext)

//   console.log("header user",user)

//   const handleSignOut = async () => {
//     const storage = localStorage.getItem("formData");

//     console.log("signout fn called from header")

//     if (storage) {
//       localStorage.removeItem("formData");
//       setUserInfo({})

//     }

//     await user.signOut();
//     router.push("/")
//   }

//   return (
//     <div className='px-10 lg:px-32 xl:px-48 2xl:px-56 p-4 flex justify-between items-center shadow-sm'>
//         <Link href={'/'}><Image src={'logo.svg'} alt={'logo'} width={180} height={100}/></Link>
//         <div className='flex items-center gap-3'>
//         {user.isSignedIn ? <Link href={'/dashboard'}><Button mode='outline' className='font-bold' >Dashboard</Button></Link> : <Link href={'/create'}><Button className='font-bold'>Get Started</Button></Link>}

//         <UserButton>
//           <UserButton.MenuItems>
//             <UserButton.Action label='manageAccount'/>
//             <UserButton.Action label='signOut' onClick={handleSignOut}/>
//           </UserButton.MenuItems>
//         </UserButton>
//         </div>

//     </div>
//   )
// }

// export default Header

"use client";

import React, { useContext } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { SignInButton, SignOutButton, UserButton, useUser } from "@clerk/nextjs";
import { UserContext } from "../_context/UserContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useClerk } from "@clerk/nextjs";


const Header = () => {
  const { isSignedIn } = useUser();
  const { signOut } = useClerk();
  const router = useRouter();
  const { setUserInfo } = useContext(UserContext);

  const handleSignOut = async () => {
    console.log("Sign out initiated.");

    // Clear local storage and user context
    localStorage.removeItem("formData");
    setUserInfo({});
    // Perform Clerk sign-out and redirect to home page
    await signOut({redirectUrl : "/"});
    router.push("/");
  };

  return (
    <div className="px-10 lg:px-32 xl:px-48 2xl:px-56 p-4 flex justify-between items-center shadow-sm">
      {/* Logo */}
      <Link href={"/"}>
        <Image src={"logo.svg"} alt={"logo"} width={180} height={100} />
      </Link>

      {/* Navigation and User Actions */}
      <div className="flex items-center gap-3">
        {/* Conditional Navigation Based on Sign-In State */}
        {isSignedIn ? (
          <div className="flex items-center gap-5">
          <Link href={"/dashboard"}>
            <Button mode="outline" className="font-bold">
              Dashboard
            </Button>
          </Link>
          <Button className="font-bold" onClick={handleSignOut}>Sign Out</Button>
          </div>
        ) : (
          <Link href={"/create"}>
            <Button className="font-bold">Get Started</Button>
          </Link>
        )}

        {/* User Button with Custom Menu Items
        <UserButton/> */}

       
      </div>
    </div>
  );
};

export default Header;
