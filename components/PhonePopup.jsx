// src/components/PhonePopup.jsx
"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";

export default function PhonePopup() {
  const { data: session } = useSession();
  const [showPopup, setShowPopup] = useState(false);
  const [phone, setPhone] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    // 🕵️‍♂️ Naya SDE Function: Backend se check karna
    const checkPhoneNumber = async () => {
      // Agar user logged in hai aur usne abhi submit nahi kiya hai
      if (session && !isSubmitted) {
        try {
          const res = await fetch("/api/update-phone");
          const data = await res.json();

          // Asli Jadoo: Agar database mein number NAHI hai, tabhi 2 second baad popup dikhao
          if (!data.hasPhone) {
            const timer = setTimeout(() => setShowPopup(true), 2000);
            return () => clearTimeout(timer); // Memory leak bachane ke liye
          }
        } catch (error) {
          console.error("Check failed");
        }
      }
    };

    checkPhoneNumber();
  }, [session, isSubmitted]);

  const handleSubmit = async () => {
    if (phone.length < 10) return alert("Enter your correct whatsapp number!");

    // Backend wali API ko number bhejo
    const res = await fetch("/api/update-phone", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone }),
    });

    if (res.ok) {
      setIsSubmitted(true);
      setShowPopup(false);
      alert("Done! 15% OFF Coupon will be sent to your WhatsApp shortly. 🚀");
    }
  };

  if (!showPopup) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 backdrop-blur-md">
      <div className="bg-gray-950 border border-red-600 p-8 rounded-2xl max-w-md w-full text-center shadow-[0_0_40px_rgba(220,38,38,0.3)] mx-4">
        <h2 className="text-3xl font-black text-white mb-2 tracking-tight">Wait! 🛑</h2>
        <p className="text-gray-400 mb-6 text-sm">
          Hi <span className="text-red-500 font-bold">{session?.user?.name}</span>, enter your WhatsApp number to activate your <br/>
          <span className="text-white font-bold text-lg tracking-wide border-b-2 border-red-600">FLAT 15% OFF</span> coupon!
        </p>
        
        <input 
          type="tel" 
          placeholder="Enter Mobile Number" 
          className="w-full bg-gray-900 text-white border border-gray-700 rounded-lg p-4 mb-4 focus:outline-none focus:border-red-500 text-center text-xl tracking-widest transition-all"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        
        <button 
          onClick={handleSubmit}
          className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-lg transition-all shadow-lg hover:shadow-red-500/50"
        >
          Claim My 15% OFF 🚀
        </button>
        
        <button 
          onClick={() => setShowPopup(false)}
          className="mt-6 text-xs text-gray-500 hover:text-gray-300 underline"
        >
          No thanks, I'll pay full price.
        </button>
      </div>
    </div>
  );
}