// src/app/api/update-phone/route.js
import clientPromise from "@/lib/mongodb";
import { getServerSession } from "next-auth/next";

export async function POST(req) {
  try {
    // 1. Check karo ki user logged in hai ya nahi
    const session = await getServerSession();
    if (!session) return Response.json({ error: "Pehle login karo bhai!" }, { status: 401 });

    // 2. Frontend se phone number lo
    const { phone } = await req.json();
    
    // 3. Register (MongoDB) kholo
    const client = await clientPromise;
    const db = client.db();

    // 4. User ki email dhoondo aur uske aage phone number update kar do
    await db.collection("users").updateOne(
      { email: session.user.email },
      { $set: { phone: phone } }
    );

    return Response.json({ success: true, message: "Number save ho gaya!" });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Backend mein kuch gadbad hui." }, { status: 500 });
  }
}