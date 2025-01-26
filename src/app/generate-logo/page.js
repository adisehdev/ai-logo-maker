"use client";
import React, { useContext, useEffect, useState , Suspense} from "react";
import { UserContext } from "../_context/UserContext";
import Image from "next/image";
import axios from "axios";
import Prompt from "../_data/Prompt";
import { Button } from "@/components/ui/button";
import { Loader2Icon } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { saveAs } from "file-saver";
import { useRouter } from "next/navigation";
import { toast } from "sonner";


const GenerateLogo = () => {
  const { userInfo } = useContext(UserContext);
  const [formData, setFormData] = useState();
  const [loading, setLoading] = useState(false);
  const [logoImg, setLogoImg] = useState();
  const useParams = useSearchParams();
  const type = useParams.get("type");
  const router = useRouter();

  const downloadLogo = async () => {
    if (!logoImg) return;
  
    try {
      const response = await fetch(logoImg); // Fetch the image from the URL
      const blob = await response.blob();   // Convert it to a Blob
      saveAs(blob, `${formData?.title || "generated-logo"}.png`); // Trigger the download
    } catch (error) {
      console.error("Error downloading the logo:", error);
    }
  };
  

  useEffect(() => {
    if (typeof window !== "undefined" && userInfo?.email) {
      const storage = localStorage.getItem("formData");
      if (storage) {
        setFormData(JSON.parse(storage)); // if formData present in local storage use it
      }
    }
    
  }, [userInfo]);

  useEffect(() => {
    if (formData?.title) {
      generateAILogo();
    }
  }, [formData]);

  const generateAILogo = async () => {

    if(type==="Premium" && userInfo?.credits<=0){
      toast("No credits left.")
    }




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
        credits : userInfo?.credits
      });
      if (res?.data?.error) {
        console.error("Error from huggingface API", res?.data?.error);
      } else {
        setLogoImg(res?.data?.image);
      }
    } catch (error) {
      console.error("Error generating logo:", error);
    }
    setLoading(false);
  };

  return (
    <Suspense>
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
              <Button variant="outline" onClick={() => router.push("/dashboard") }>Dashboard</Button>
            </div>
          </div>
        )
      )}
    </div>
    </Suspense>
  );
};

export default GenerateLogo;
