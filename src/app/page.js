// app/page.js

import ProductCard from "../../components/ProductCard";

export default function Home() {
  // 1. HAMARA DUMMY GODOWN (Backend ka placeholder)
  const products = [
    { id: 1, title: "Premium 7D Floor Mats", price: 3500, category: "Interior" },
    { id: 2, title: "Android Infotainment 9-inch", price: 12000, category: "Tech" },
    { id: 3, title: "Ice Cube LED Headlights", price: 4500, category: "Exterior" },
    { id: 4, title: "Teflon Coating Service", price: 2500, category: "Detailing" }
  ];

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
        <h2 className="text-3xl font-bold mb-8 border-l-4 border-red-600 pl-4">
          Trending Upgrades
        </h2>
        
        {/* CSS Grid (Cards ko line mein lagane ke liye) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* THE LOOP: Products array se data nikal kar cards banao */}
          {products.map((item) => (
            <ProductCard 
              key={item.id} 
              title={item.title} 
              price={item.price} 
              category={item.category} 
            />
          ))}

        </div>
      </div>

    </main>
  );
}