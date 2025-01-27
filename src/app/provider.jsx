"use client";
import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { UserContext } from "./_context/UserContext";

const Provider = ({ children }) => {
  //save user data as all components are rendered inside it

  const { user } = useUser();

  const [userInfo,setUserInfo] = useState()
  const [credits,setCredits] = useState()

  console.log("user from clerk",user)

  useEffect(() => {
    if(user?.fullName)checkUserAuth();
    else setUserInfo({})
  }, [user]);

  const checkUserAuth = async () => {
    //save user to DB
    try {
      const userName = user?.fullName;
      const userEmail = user?.primaryEmailAddress?.emailAddress;

      console.log("user from clerk : ", userName, userEmail);

      const result = await axios.post("/api/users", {
        userName,
        userEmail,
      });

      if (result?.data?.error) {
        throw new Error(result?.data?.error);
      } else {
        console.log("user is : ", result?.data);
        setUserInfo(result?.data)
        setCredits(result?.data?.credits)

      }
    } catch (error) {
      console.log("error is : ", error);
    }
  };
  return (
    <div>
      <UserContext value={{userInfo,setUserInfo,credits,setCredits}}>
        <Header />
        <div className="px-10 lg:px-32 xl:px-48 2xl:px-56">{children}</div>
      </UserContext>
    </div>
  );
};

export default Provider;
