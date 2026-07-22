'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function FloatingIsland({
  position = [0, 0, 0],
  scale = 1,
}: {
  position?: [number, number, number];
  scale?: number;
}) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <group ref={groupRef} position={position} scale={scale}>
      {/* Island base (inverted cone) */}
      <mesh position={[0, -0.5, 0]} castShadow>
        <coneGeometry args={[2, 2, 32]} />
        <meshStandardMaterial color="#78350f" roughness={0.8} />
      </mesh>

      {/* Island top (flat disc) */}
      <mesh position={[0, 0.5, 0]} receiveShadow>
        <cylinderGeometry args={[2, 2, 0.3, 32]} />
        <meshStandardMaterial color="#16a34a" roughness={0.9} />
      </mesh>

      {/* Trees */}
      <Tree position={[0.8, 1.2, 0.5]} scale={0.4} />
      <Tree position={[-0.7, 1.1, -0.6]} scale={0.3} />
      <Tree position={[0.3, 1.3, -0.8]} scale={0.35} />

      {/* Rocks */}
      <Rock position={[-1, 0.8, 0.8]} scale={0.3} />
      <Rock position={[1.2, 0.9, -0.3]} scale={0.25} />

      {/* Waterfall */}
      <mesh position={[1.5, 0, 0]} rotation={[0, 0, Math.PI / 6]}>
        <boxGeometry args={[0.1, 1.5, 0.3]} />
        <meshStandardMaterial
          color="#0ea5e9"
          emissive="#0ea5e9"
          emissiveIntensity={0.5}
          transparent
          opacity={0.7}
        />
      </mesh>
    </group>
  );
}

function Tree({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
  return (
    <group position={position} scale={scale}>
      {/* Trunk */}
      <mesh position={[0, 0.5, 0]} castShadow>
        <cylinderGeometry args={[0.1, 0.15, 1, 8]} />
        <meshStandardMaterial color="#78350f" />
      </mesh>
      {/* Foliage */}
      <mesh position={[0, 1.2, 0]} castShadow>
        <coneGeometry args={[0.4, 1, 8]} />
        <meshStandardMaterial color="#16a34a" />
      </mesh>
    </group>
  );
}

function Rock({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
  return (
    <mesh position={position} scale={scale} castShadow>
      <dodecahedronGeometry args={[0.5, 0]} />
      <meshStandardMaterial color="#52525b" roughness={0.9} />
    </mesh>
  );
}
