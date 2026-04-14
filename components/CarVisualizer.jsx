// src/components/CarVisualizer.jsx
"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { 
  OrbitControls, 
  Environment, 
  useGLTF, 
  MeshReflectorMaterial, 
  ContactShadows,
  PerspectiveCamera
} from "@react-three/drei";

function RealCarModel() {
  const { scene } = useGLTF('/creta.glb');
  
  // 💡 Agar car bohot choti dikhe toh scale badha dena (e.g., scale={2})
  // Isko exactly [0, 0, 0] par rakhte hain bina kisi extra wrapper ke
  return <primitive object={scene} scale={1.5} position={[0, 0.45, 0]} />;
}

export default function CarVisualizer() {
  return (
    <div className="relative w-full h-[600px] bg-[#111] rounded-3xl overflow-hidden border border-gray-800 shadow-2xl">
      
      {/* Label Overlay */}
      <div className="absolute top-6 left-6 z-10 pointer-events-none">
        <h2 className="text-white text-2xl font-black tracking-tighter uppercase italic">
          <span className="text-red-600">Octane</span> Studio
        </h2>
      </div>

      <Canvas shadows>
        {/* Background Light Grey/Black mix */}
        <color attach="background" args={['#0a0a0a']} />
        
        <PerspectiveCamera makeDefault position={[5, 3, 5]} fov={40} />

        {/* 1. POWERFUL LIGHTING (Ghar ki saari lights on kar di) */}
        <ambientLight intensity={1.5} /> 
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} castShadow />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#red" />

        {/* 2. ENVIRONMENT (Shiny reflections ke liye) */}
        <Environment preset="city" /> 

        <Suspense fallback={null}>
          <group position={[0, -0.5, 0]}>
            <RealCarModel />

            {/* 3. PREMIUM FLOOR REFLECTION (Floor exactly car ke neeche) */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
              <planeGeometry args={[20, 20]} />
              <MeshReflectorMaterial
                blur={[300, 100]}
                resolution={1024}
                mixBlur={1}
                mixStrength={60}
                roughness={1}
                depthScale={1.2}
                minDepthThreshold={0.4}
                maxDepthThreshold={1.4}
                color="#151515"
                metalness={0.5}
              />
            </mesh>
            
            {/* Real shadows on the ground */}
            <ContactShadows resolution={1024} scale={10} blur={2} opacity={0.75} far={5} color="#000000" />
          </group>
        </Suspense>

        <OrbitControls 
          enablePan={false} 
          autoRotate={true} 
          autoRotateSpeed={1.0}
          maxPolarAngle={Math.PI / 2.1} 
          minDistance={2}
          maxDistance={10}
        />
      </Canvas>
    </div>
  );
}