"use client";
import React, { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import LogoTitle from "./components/LogoTitle";
import LogoDesc from "./components/LogoDesc";
import LogoColorPallette from "./components/LogoColorPallette";
import LogoDesigns from "./components/LogoDesigns";
import LogoIdea from "./components/LogoIdea";
import PricingModel from "./components/PricingModel";

const CreateLogo = () => {
  
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState();

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    console.log("formData ",formData);
  };

  useEffect(() => {
    localStorage.setItem('step',JSON.stringify(step))
  },[step])
  return (
    <div className="mt-28 p-10 border rounded-xl 2xl:mx-65">
      {step === 1 ? (
        <LogoTitle handleInputChange={(value) => handleInputChange('title', value)} formData={formData}/>
      ) : step === 2 ? (
        <LogoDesc handleInputChange={(value) => handleInputChange('description', value)} formData={formData}/>
      ) : step === 3 ? (
        <LogoColorPallette handleInputChange={(value) => handleInputChange('palette', value)} formData={formData}/>
      ) : step === 4 ? (
        <LogoDesigns handleInputChange={(value) => handleInputChange('design', value)} formData={formData}/>
      ) : step === 5 ? (
        <LogoIdea handleInputChange={(value) => handleInputChange('idea', value)} formData={formData}/>
      ) : 
      step === 6 ? (
        <PricingModel handleInputChange={(value) => handleInputChange('pricing', value)} formData={formData}/>
      ) : 
      null}
      <div className="flex items-center justify-between">
        {step !== 1 && (
          <Button variant="outline" onClick={() => setStep(step - 1)}>
            Previous
          </Button>
        )}
        {step!== 6 && <Button onClick={() => setStep(step + 1)}>Continue</Button>}
      </div>
    </div>
  );
};

export default CreateLogo;
