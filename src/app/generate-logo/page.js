"use client";

import React, { useContext, useEffect, useState,useCallback, Suspense } from "react";
import { UserContext } from "../_context/UserContext";
import Image from "next/image";
import axios from "axios";
import Prompt from "../_data/Prompt";
import { Button } from "@/components/ui/button";
import { Loader2Icon } from "lucide-react";
import { saveAs } from "file-saver";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";


const SearchParamsWrapper = ({ setType }) => {
  const useParams = useSearchParams();
  const type = useParams.get("type");

  useEffect(() => {
    if (type) setType(type);
  }, [type, setType]);

  return null;
};

const GenerateLogo = () => {
  const { userInfo,setUserInfo,credits,setCredits} = useContext(UserContext);
  const [formData, setFormData] = useState();
  const [loading, setLoading] = useState(false);
  const [logoImg, setLogoImg] = useState();
  const [type, setType] = useState(null);
  const [error,setError] = useState("")
  const router = useRouter();


  console.log("user info generate logo - outside",userInfo)

  const downloadLogo = async () => {
    if (!logoImg) return;

    try {
      const response = await fetch(logoImg);
      const blob = await response.blob();
      saveAs(blob, `${formData?.title || "generated-logo"}.png`);
    } catch (error) {
      console.error("Error downloading the logo:", error);
    }
  };

  useEffect(() => {

    console.log("user info generate logo",userInfo)

    
    
    

    


    
      if(typeof window !== "undefined" && userInfo?.email){
        const storage = localStorage.getItem("formData");
        setFormData(JSON.parse(storage));
      }

      
    

    

    else if(!userInfo || !userInfo?.email || Object.keys(userInfo).length === 0){
      console.log("sign out generate logo page")
      router.push('/')
    }

    

    
  }, [userInfo]);

  

  useEffect(() => {
    if (formData?.title) {
      generateAILogo();
    }
  }, [formData]);

  const generateAILogo = async () => {
    setError("")
    if (type === "Premium" && credits <= 0) {
      toast("No credits left.");
      
      return (<div className="flex items-center justify-center min-h-screen">
        <Link href={"/"}><Button className="font-bold">Return Home</Button></Link>
      </div>);
    }

    


    console.log("generate logo function called");



    const PROMPT = Prompt.LOGO_PROMPT.replace("{logoTitle}", formData?.title)
      .replace("{logoDesc}", formData?.description)
      .replace("{logoColor}", formData?.palette)
      .replace("{logoIdea}", formData?.idea)
      .replace("{logoDesign}", formData?.design?.title)
      .replace("{logoPrompt}", formData?.design?.prompt);

    setLoading(true);
    try {
      const res = await axios.post("/api/ai-logo-model", {
        prompt: PROMPT,
        email: userInfo?.email,
        title: formData?.title,
        description: formData?.description,
        type: type,
        credits: credits,
      });
      if (res?.data?.error) {
        console.error("Error from huggingface API", res?.data?.error);
      } else {
        setLogoImg(res?.data?.image);
        if (type === "Premium") {
          setCredits(parseInt(credits) - 1);
        }
        
      }
    } catch (error) {
      setError("Error Generating Logo try later...")
      console.error("Error generating logo:", error);
    }
    setLoading(false);
  };

  if(error)return <div className="flex items-center justify-center min-h-screen text-red-500 text-2xl font-bold">
    <p>{error}</p>
  </div>

  return (
    <Suspense fallback={<Loader2Icon className="animate-spin text-blue-600 w-12 h-12" />}>
      <SearchParamsWrapper setType={setType} />
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        {loading ? (
          <div className="flex flex-col justify-center items-center h-full">
            <Loader2Icon className="animate-spin text-blue-600 w-12 h-12" />
            <h2 className="mt-4 text-lg font-semibold text-gray-700 text-center">
              Please wait while your logo is being generated
            </h2>
          </div>
        ) : (
          logoImg && (
            <div className="flex flex-col items-center mt-10">
              <h2 className="my-4 text-lg font-semibold text-gray-700 text-center">
                Here is your generated logo!
              </h2>
              <Image
                src={logoImg}
                alt="Generated Logo"
                width={500}
                height={500}
                className="rounded-lg shadow-lg"
              />
              <div className="mt-4 flex w-full justify-between">
                <Button onClick={downloadLogo}>Download</Button>
                <Button variant="outline" onClick={() => router.push("/dashboard")}>
                  Dashboard
                </Button>
              </div>
            </div>
          )
        )}
      </div>
    </Suspense>
  );
};

export default GenerateLogo;
