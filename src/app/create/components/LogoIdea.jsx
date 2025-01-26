import React, { useEffect, useState } from "react";
import HeadingDesc from "./HeadingDesc";
import Lookup from "@/app/_data/Lookup";
import Prompt from "@/app/_data/Prompt";
import axios from "axios";
import { Loader2Icon } from "lucide-react";

const LogoIdea = ({ handleInputChange, formData }) => {
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState(formData?.idea);
  const [initialLoad, setInitialLoad] = useState(false);

  useEffect(() => {
    if (!initialLoad) {
      generateLogoDesignIdea();
      setInitialLoad(true);
    }
  }, [initialLoad]);

  const generateLogoDesignIdea = async () => {
    const PROMPT = Prompt.DESIGN_IDEA_PROMPT.replace(
      "{logoType}",
      formData?.design?.title
    )
      .replace("{logoTitle}", formData?.title)
      .replace("{logoDesc}", formData?.description)
      .replace("{logoPrompt}", formData?.design?.prompt);

    console.log("prompt frontend",PROMPT)
    try {
      setLoading(true);
      const res = await axios.post("/api/ai-design-ideas", {
        prompt: PROMPT,
      });

      if (res?.data?.error) {
        throw new Error(res?.data?.error);
      } else {
        console.log(res?.data);
        const arr = res?.data?.ideas;
        setIdeas(arr);
      }
      setLoading(false);
    } catch (error) {
      console.log("error is : ", error);
    }
  };

  return (
    <div className="my-10">
      <HeadingDesc
        title={Lookup.LogoIdeaTitle}
        description={Lookup.LogoIdeaDesc}
      />

      <div className="flex items-center justify-center">
        {loading && <Loader2Icon className="animate-spin my-10 " />}
      </div>
      <div className="flex flex-wrap gap-3 mt-6">
        {ideas &&
          ideas.map((idea, index) => (
            <h2
              key={index}
              className={
                selectedOption === idea.description
                  ? "border-2 p-2 rounded-full border-blue-700"
                  : `p-2 rounded-full border px-3 cursor-pointer hover:border-blue-700`
              }
              onClick={() => {
                setSelectedOption(idea.description);
                handleInputChange(idea.description);
              }}
            >
              {idea.description}
            </h2>
          ))}
        {loading === false && (
          <h2
            className={
              selectedOption === "Let AI select the idea"
                ? "border-2 p-2 rounded-full border-blue-700"
                : `p-2 rounded-full border px-3 cursor-pointer hover:border-blue-700`
            }
            onClick={() => {
              setSelectedOption("Let AI select the idea");
              handleInputChange("Let AI select the idea");
            }}
          >
            Let AI select the idea
          </h2>
        )}
      </div>
    </div>
  );
};

export default LogoIdea;
