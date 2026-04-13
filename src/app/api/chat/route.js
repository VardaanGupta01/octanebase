// app/api/chat/route.js

import { GoogleGenerativeAI } from "@google/generative-ai";

// POST function ka matlab hai ki yeh route sirf tab chalega jab koi isko Data BHEJEGA (Post karega)
export async function POST(req) {
  try {
    // 1. Customer ne jo message bheja hai, usko padho
    const body = await req.json();
    const userMessage = body.message;

    // 2. Apni safe API key se Gemini ko unlock karo
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    // 3. THE MAGIC GUARDRAILS (Yehi tumhara "Apna Model" banata hai)
    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.5-flash",
      systemInstruction: `You are an expert Car Stylist and Mechanic for 'OctaneBase', a premium car accessories and detailing garage. 
      Your job is to recommend car accessories, Teflon coatings, PPF, and modifications. 
      Rule 1: Always be polite and talk like a premium garage expert. 
      Rule 2: If the user asks about anything other than cars (like coding, cooking, politics, or medical issues), politely decline and say you only talk about cars at OctaneBase.
      Rule 3: Keep your answers short, crisp, and to the point.
      Rule 4: Provide answers only in a proper well organised format clearly mentioning customer requirements`
    });

    // 4. Gemini se answer maango
    const result = await model.generateContent(userMessage);
    const aiReply = result.response.text();

    // 5. Manager Room (Backend) se answer wapas Showroom (Frontend) mein bhej do
    return Response.json({ reply: aiReply });

  } catch (error) {
    // Agar internet issue ya key galat ho toh website crash na ho, balki yeh error dikhe
    console.error("AI Error:", error);
    return Response.json({ error: "Bhai, server mein kuch dikkat aayi hai." }, { status: 500 });
  }
}