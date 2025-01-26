import React, { useEffect } from "react";
import HeadingDesc from "./HeadingDesc";
import Lookup from "@/app/_data/Lookup";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import { SignInButton } from "@clerk/nextjs";

const PricingModel = ({ formData, handleInputChange }) => {
  useEffect(() => {
    if (formData?.title && typeof window !== "undefined") {
      localStorage.setItem("formData", JSON.stringify(formData));
    }
  }, [formData]);

  const { user } = useUser();

  return (
    <div className="my-10">
      <HeadingDesc
        title={Lookup.LogoPricingModelTitle}
        description={Lookup.LogoPricingModelDesc}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-8">
        {Lookup.pricingOption.map((option, index) => (
          <div
            key={index}
            className="flex flex-col items-center p-5 border rounded-xl"
          >
            <Image
              src={option.icon}
              alt={option.title}
              width={60}
              height={60}
            />
            <h2 className="font-medium text-2xl">{option.title}</h2>
            <div>
              {option.features.map((feature, index) => (
                <h2 className="text-lg mt-3" key={index}>
                  {feature}
                </h2>
              ))}
            </div>
            {user ? (
              <Link href={`/generate-logo?type=${option.title}`}>
                <Button className="mt-5">{option.button}</Button>
              </Link>
            ) : (
              <SignInButton
                mode="modal"
                forceRedirectUrl={`/generate-logo?type=${option.title}`}
              >
                <Button className="mt-5">{option.button}</Button>
              </SignInButton>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PricingModel;
