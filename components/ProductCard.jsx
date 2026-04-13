// components/ProductCard.jsx

export default function ProductCard({ title, price, category }) {
  return (
    <div className="bg-gray-900 border border-gray-800 p-6 rounded-2xl hover:border-red-600 transition-all duration-300">
      <div className="text-red-500 text-sm font-bold mb-2 uppercase tracking-wider">
        {category}
      </div>
      <h3 className="text-xl font-semibold text-white mb-3">
        {title}
      </h3>
      <p className="text-gray-400 text-lg mb-6">
        ₹{price}
      </p>
      
      <button className="w-full bg-transparent border border-red-600 text-red-500 hover:bg-red-600 hover:text-white font-bold py-2 rounded-lg transition-all">
        View Details
      </button>
    </div>
  );
}