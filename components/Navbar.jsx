// components/Navbar.jsx
"use client";

export default function Navbar() {
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

        {/* Action Button */}
        <div>
          <button className="bg-white text-black hover:bg-gray-200 font-bold py-2 px-6 rounded-lg transition-all duration-300 shadow-[0_0_15px_rgba(255,255,255,0.2)]">
            Sign In / Join
          </button>
        </div>
      </div>
    </nav>
  );
}