// app/layout.js
import "./globals.css";
import Navbar from "../../components/Navbar";
import Providers from "../../components/Providers"; // NAYA IMPORT

export const metadata = {
  title: "OctaneBase | Premium Car Accessories",
  description: "Premium car detailing and smart modifications.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-950 text-white min-h-screen">
        {/* Poori website ko Provider ke andar wrap kar diya */}
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}