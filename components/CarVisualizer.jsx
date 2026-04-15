// components/CarVisualizer.jsx
"use client";

import React, { Suspense, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { motion } from "framer-motion"; // ✅ Draggable UI ke liye
import { 
  OrbitControls, 
  Environment, 
  useGLTF, 
  MeshReflectorMaterial, 
  ContactShadows,
  PerspectiveCamera
} from "@react-three/drei";

function RealCarModel({ customColor, rimColor }) {
  const { scene } = useGLTF('/creta.glb');
  
  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        const name = child.name.toLowerCase();
        child.castShadow = true;
        child.receiveShadow = true;

        // 🎨 1. TARGET: CAR BODY (Metal Paint)
        if (name.includes('body') || name.includes('paint') || name.includes('exterior')) {
          child.material = child.material.clone(); 
          child.material.color.set(customColor);
          child.material.metalness = 0.8; 
          child.material.roughness = 0.2;
        }

        // 🛞 2. TARGET: ONLY ALLOYS (Not Rubber)
        // Hum 'tire' aur 'rubber' ko exclude karenge taaki wo kaale hi rahein
        if ((name.includes('rim') || name.includes('wheel') || name.includes('alloy') || name.includes('spoke')) 
             && !name.includes('tire') && !name.includes('rubber')) {
          child.material = child.material.clone();
          child.material.color.set(rimColor);
          child.material.metalness = 1.0; // Chromic look
          child.material.roughness = 0.1; // Smooth metal
        }

        // 🔘 3. TARGET: TYRES (Keep them Matte Black)
        if (name.includes('tire') || name.includes('rubber')) {
          child.material = child.material.clone();
          child.material.color.set("#111111"); // Pure rubber black
          child.material.metalness = 0;
          child.material.roughness = 0.9; // No shine for rubber
        }
      }
    });
  }, [scene, customColor, rimColor]);

  return <primitive object={scene} scale={1.8} position={[0, 0.54, 0]} />;
}

export default function CarVisualizer() {
  const [paint, setPaint] = useState("#222222");
  const [rimColor, setRimColor] = useState("#c0c0c0"); // Silver Alloys default

  return (
    <div className="relative w-full h-[650px] bg-[#050505] rounded-3xl overflow-hidden border border-white/5 shadow-2xl">
      
      {/* 🖱️ MOVABLE (DRAGGABLE) UI PANEL */}
      <motion.div 
        drag 
        dragConstraints={{ left: -1000, right: 0, top: 0, bottom: 400 }} // Bounds set karein
        className="absolute top-6 right-6 z-20 w-64 cursor-move active:cursor-grabbing"
      >
        <div className="bg-black/60 backdrop-blur-2xl p-5 rounded-3xl border border-white/10 shadow-2xl">
          <div className="flex items-center justify-between mb-4">
             <h3 className="text-white font-bold text-[10px] tracking-widest uppercase italic">Configurator</h3>
             <div className="w-8 h-1 bg-white/20 rounded-full" /> {/* Drag handle indicator */}
          </div>

          {/* Paint Archive */}
          <div className="mb-6">
            <p className="text-white/40 text-[9px] font-bold uppercase tracking-widest mb-3">Paint Archive</p>
            <div className="flex flex-wrap gap-2">
              {["#dc2626", "#000000", "#1e3a8a", "#ffffff", "#4b5563"].map((c) => (
                <button key={c} onClick={() => setPaint(c)} style={{ backgroundColor: c }}
                  className={`w-7 h-7 rounded-full border-2 transition-transform ${paint === c ? 'border-white scale-110' : 'border-transparent'}`} />
              ))}
            </div>
          </div>

          {/* Alloy Finish */}
          <div>
            <p className="text-white/40 text-[9px] font-bold uppercase tracking-widest mb-3">Alloy Finish</p>
            <div className="grid grid-cols-2 gap-2">
              {[
                { name: "Silver", code: "#c0c0c0" },
                { name: "Gloss Black", code: "#080808" },
                { name: "Gunmetal", code: "#444444" },
                { name: "Gold", code: "#d4af37" }
              ].map((alloy) => (
                <button key={alloy.code} onClick={() => setRimColor(alloy.code)}
                  className={`py-2 rounded-lg text-[9px] font-bold border transition-all ${rimColor === alloy.code ? 'bg-white text-black border-white' : 'text-white border-white/10 hover:bg-white/5'}`}>
                  {alloy.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Studio View */}
      <Canvas shadows>
        <color attach="background" args={['#050505']} />
        <PerspectiveCamera makeDefault position={[6, 3, 6]} fov={30} />

        <ambientLight intensity={0.4} /> 
        <spotLight position={[10, 15, 10]} angle={0.25} penumbra={1} intensity={3} castShadow />
        <rectAreaLight width={5} height={5} intensity={5} position={[0, 5, 0]} rotation={[-Math.PI / 2, 0, 0]} />

        <Environment preset="studio" />

        <Suspense fallback={null}>
          <group position={[0, -0.7, 0]}>
            <RealCarModel customColor={paint} rimColor={rimColor} />
            
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
              <planeGeometry args={[100, 100]} />
              <MeshReflectorMaterial
                blur={[400, 100]}
                resolution={1024}
                mixBlur={1}
                mixStrength={80}
                roughness={1}
                color="#050505"
                metalness={0.8}
              />
            </mesh>
            <ContactShadows resolution={1024} scale={20} blur={2} opacity={0.7} far={10} />
          </group>
        </Suspense>

        <OrbitControls enablePan={false} minDistance={5} maxDistance={15} maxPolarAngle={Math.PI / 2.0} />
      </Canvas>
    </div>
  );
}