'use client';

import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Float, Stars, Environment } from '@react-three/drei';
import { PalworldEgg } from './PalworldEgg';
import { FloatingIsland } from './FloatingIsland';

export function HeroScene() {
  return (
    <div className="relative h-[450px] w-full">
      <Canvas
        camera={{ position: [0, 2, 8], fov: 50 }}
        dpr={[1, 2]}
        performance={{ min: 0.5 }}
      >
        <Suspense fallback={null}>
          <SceneContent />
        </Suspense>
      </Canvas>

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-dark-50 pointer-events-none" />

      {/* Loading indicator */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="skeleton h-8 w-8 rounded-full" />
      </div>
    </div>
  );
}

function SceneContent() {
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={1} color="#0ea5e9" />
      <pointLight position={[-5, -5, -5]} intensity={0.5} color="#d946ef" />

      {/* Stars background */}
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} />

      {/* Floating Palworld Egg */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <PalworldEgg position={[0, 1, 0]} />
      </Float>

      {/* Floating Island */}
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
        <FloatingIsland position={[3, -1, -2]} scale={0.5} />
      </Float>

      {/* Controls */}
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.5}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 3}
      />

      {/* Environment */}
      <Environment preset="night" />
    </>
  );
}
