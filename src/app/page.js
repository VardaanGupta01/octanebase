"use client"; // PRO-TIP: Next.js mein jab bhi 'interactivity' (click, type) karni ho, toh yeh line sabse upar likhni zaroori hoti hai!

import { useState } from "react";
import ProductCard from "../../components/ProductCard";

export default function Home() {
  // 1. THE MEMORY (State)
  // 'searchQuery' mein user ki typing save hogi, aur 'setSearchQuery' usko update karega.
  const [searchQuery, setSearchQuery] = useState("");

  // 2. THE VIRTUAL GODOWN
  const products = [
    { id: 1, title: "Premium 7D Floor Mats", price: 3500, category: "Interior" },
    { id: 2, title: "Android Infotainment 9-inch", price: 12000, category: "Tech" },
    { id: 3, title: "Ice Cube LED Headlights", price: 4500, category: "Exterior" },
    { id: 4, title: "Teflon Coating Service", price: 2500, category: "Detailing" }
  ];

  // 3. THE BRAIN (Filter Logic)
  // Yeh line check karti hai ki customer ne jo type kiya hai, kya wo product ke title mein hai?
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-gray-950 text-white flex flex-col items-center py-16 px-6">
      
      {/* --- HERO SECTION --- */}
      <div className="text-center mb-24 mt-10">
        <h1 className="text-6xl font-extrabold tracking-tight mb-4">
          <span className="text-red-600">Octane</span>Base
        </h1>
        <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
          Premium Car Accessories, Detailing, & Custom Modifications. Turn your daily drive into a masterpiece.
        </p>
        <div className="flex gap-4 justify-center">
          <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-full transition-all">
            Book an Appointment
          </button>
        </div>
      </div>

      {/* --- CATALOG SECTION --- */}
      <div className="w-full max-w-6xl">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold border-l-4 border-red-600 pl-4">
            Trending Upgrades
          </h2>
        </div>

        {/* --- THE SEARCH BAR --- */}
        <div className="mb-10">
          <input
            type="text"
            placeholder="Search for 'Teflon', 'Android', 'Mats'..."
            className="w-full md:w-1/2 bg-gray-900 border border-gray-700 text-white px-6 py-4 rounded-full focus:outline-none focus:border-red-600 transition-all"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} // User jaise hi type karega, Memory update ho jayegi
          />
        </div>
        
        {/* CSS Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* THE NEW LOOP: Ab hum original 'products' nahi, 'filteredProducts' dikhayenge */}
          {filteredProducts.length > 0 ? (
            filteredProducts.map((item) => (
              <ProductCard 
                key={item.id} 
                title={item.title} 
                price={item.price} 
                category={item.category} 
              />
            ))
          ) : (
            // Agar search mein kuch na mile toh yeh dikhega
            <div className="col-span-full text-center text-gray-500 py-10">
              No products found for "{searchQuery}". Try searching something else!
            </div>
          )}

        </div>
      </div>

    </main>
  );
}