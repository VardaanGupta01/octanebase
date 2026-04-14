// components/Navbar.jsx
"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export default function Navbar() {
  // 'session' check karega ki customer logged in hai ya nahi
  const { data: session } = useSession();

  return (
    <nav className="w-full">
      {/* Top Offer Banner */}
      <div className="bg-red-600 text-white text-center py-2 text-sm font-bold tracking-wide animate-pulse">
        🔥 Create a profile today and get FLAT 15% OFF on your first purchase or showroom visit!
      </div>

      {/* Main Navbar */}
      <div className="bg-gray-950 border-b border-gray-800 px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-extrabold tracking-tight text-white">
          <span className="text-red-600">Octane</span>Base
        </div>

        {/* Action Button Area */}
        <div>
          {session ? (
            // AGAR LOGGED IN HAI: Toh Customer ka Naam, Photo aur Logout button dikhao
            <div className="flex items-center gap-4">
              <span className="text-gray-300 font-medium hidden md:block">
                Hi, <span className="text-white font-bold">{session.user.name}</span>
              </span>
              <img 
                src={session.user.image} 
                alt="Profile" 
                className="w-10 h-10 rounded-full border-2 border-red-600" 
              />
              <button 
                onClick={() => signOut()} 
                className="bg-transparent border border-gray-600 text-white hover:bg-gray-800 py-2 px-4 rounded-lg transition-all text-sm font-bold"
              >
                Logout
              </button>
            </div>
          ) : (
            // AGAR LOGGED IN NAHI HAI: Toh 'Sign In' button dikhao
            <button 
              onClick={() => signIn("google")} 
              className="bg-white text-black hover:bg-gray-200 font-bold py-2 px-6 rounded-lg transition-all duration-300 shadow-[0_0_15px_rgba(255,255,255,0.2)]"
            >
              Sign In / Join
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}