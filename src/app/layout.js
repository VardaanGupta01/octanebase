// app/layout.js
import "./globals.css";
import Navbar from "../../components/Navbar"; // 1. Yahan humne Navbar import kiya

export const metadata = {
  title: "OctaneBase | Premium Car Accessories",
  description: "Premium car detailing and smart modifications.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-950 text-white min-h-screen">
        
        {/* 2. NAVBAR YAHAN LAGEGA (Sabse Upar) */}
        <Navbar />

        {/* 3. Yeh {children} tumhari baaki website hai (jaise page.js). Navbar hamesha iske upar rahega */}
        {children}
        
      </body>
    </html>
  );
}