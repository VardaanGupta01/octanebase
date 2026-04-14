// src/app/layout.js
import "./globals.css";
import Navbar from "../../components/Navbar";
import Providers from "../../components/Providers";
import PhonePopup from "../../components/PhonePopup"; // NAYA IMPORT

export const metadata = {
  title: "OctaneBase | Premium Car Accessories",
  description: "Premium car detailing and smart modifications.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-950 text-white min-h-screen">
        <Providers>
          <Navbar />
          
          {/* THE POPUP TRAP */}
          <PhonePopup /> 

          {children}
        </Providers>
      </body>
    </html>
  );
}