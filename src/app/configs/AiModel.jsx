import {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } from "@google/generative-ai"
  
  const apiKey = process.env.GEMINI_API_KEY;

  console.log("api key ",process.env.GEMINI_API_KEY)
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash-exp",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
  };
  
  
    export const AIdesignIdea = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [
            {text: "Based on Logo of type Modern Mascot Logos Generate a text prompt to create Logo for Logo Title/Brand name : Indian Spice with description : Indian Restaurant and referring to prompt : A vibrant logo featuring a friendly, animated character with a playful personality. In one hand, they hold a signature item that represents the brand, while the other elements of design - such as small decorative touches or natural accents - enhance overall look. The background consists of a bold, circular design with subtle accents to highlight the character. Below, the brand name is displayed in bold, stylized lettering with a slight curve and complementary decorative lines. The overall style is fun, welcoming and full of character... Give me 4/5 suggestions of logo idea (each idea with maximum of 4-5 words), Result in JSON format with ideas field\n"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "```json\n{\n  \"ideas\": [\n    {\n      \"id\": 1,\n      \"description\": \"Smiling chef with curry pot\"\n    },\n     {\n      \"id\": 2,\n      \"description\": \"Playful elephant with spices\"\n    },\n    {\n      \"id\": 3,\n       \"description\": \"Animated tiger holding naan\"\n    },\n    {\n       \"id\": 4,\n       \"description\": \"Friendly spice jar character\"\n    },\n    {\n       \"id\": 5,\n       \"description\": \"Winking maharaja with plate\"\n    }\n  ]\n}\n```\n"},
          ],
        },
      ],
    });


    export const AILogoPrompt = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [
            {text: "Generate a text prompt to create Logo for Logo Title/Brand name : Pet Shop,with description: Dog Toys, with Color combination of Sunset Warmth, also include the Dog face with toy and include App Logo design idea and Referring to this Logo Prompt:Create a vibrant and playful 3D logo for an app. The design should feature bold, colorful text with a glossy finish. Include an icon relevant to the apps theme above the text and a background that complements the concept, such as a bright outdoor scene with natural elements like green grass, a blue sky, and fluffy white clouds. Use a rounded square frame with a yellow border and subtle shadows for a polished and inviting look  Give me result in JSON portal with prompt field only"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "```json\n{\n  \"prompt\": \"Create a vibrant and playful logo for 'Pet Shop', a brand focused on dog toys. The logo should incorporate a dog's face, playfully interacting with a toy. Use a warm color palette inspired by sunset hues (oranges, yellows, and soft reds). This logo will also be used as an app icon, so think about how it would look within a rounded square frame. Referencing a design concept for a 3D app logo: the text should have a bold, glossy finish with an icon above the text, which in this case would be the dog face with toy design. The background of the app icon should have a bright, outdoor feel with natural elements such as a bright sky, green grass, and white fluffy clouds. The app icon should also have a rounded square frame with a yellow border and subtle shadows to give it a polished and inviting feel. The overall design should be inviting, friendly, and easily recognizable as a pet supply/dog toy brand and as a functional and appealing app icon.\"\n}\n```\n"},
          ],
        },
      ],
    });
  
  
    // const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
    // console.log(result.response.text());
  
  