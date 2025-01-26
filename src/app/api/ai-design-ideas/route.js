import { AIdesignIdea } from "@/app/configs/AiModel"
import { NextResponse } from "next/server"

export const POST = async(req)=>{
    const prompt = await req.json()

    //console.log("prompt in backend", prompt?.prompt)

    try {
        const result = await AIdesignIdea.sendMessage(prompt?.prompt)
        return NextResponse.json(JSON.parse(result.response.text()))
    } catch (error) {
        return NextResponse.json({error : error.message})
    }
}