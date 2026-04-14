// src/app/api/update-phone/route.js
import clientPromise from "@/lib/mongodb";
import { getServerSession } from "next-auth/next";

// 🆕 NAYA FUNCTION: Frontend ko batane ke liye ki number hai ya nahi
export async function GET(req) {
  try {
    const session = await getServerSession();
    if (!session) return Response.json({ hasPhone: false });

    const client = await clientPromise;
    const db = client.db();

    // User ko email se dhoondo
    const user = await db.collection("users").findOne({ email: session.user.email });

    // Agar user mil gaya aur usme phone number likha hai
    if (user && user.phone) {
      return Response.json({ hasPhone: true });
    } else {
      return Response.json({ hasPhone: false });
    }
  } catch (error) {
    return Response.json({ hasPhone: false });
  }
}

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