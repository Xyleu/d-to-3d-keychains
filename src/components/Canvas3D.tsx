import { useRef, useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Box, Sphere } from "@react-three/drei";
import * as THREE from "three";

interface Canvas3DProps {
  thickness: number;
  keychainHolePosition: { x: number; y: number };
  imageTexture: string | null;
}

const KeychainModel = ({ thickness, keychainHolePosition, imageTexture }: Canvas3DProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  // Create texture from image
  const texture = imageTexture ? new THREE.TextureLoader().load(imageTexture) : null;

  return (
    <>
      {/* Main keychain body */}
      <Box
        ref={meshRef}
        args={[3, 3, thickness]}
        position={[0, 0, 0]}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <meshStandardMaterial 
          color={hovered ? "#FFB6C1" : "#FF69B4"}
          map={texture}
          roughness={0.3}
          metalness={0.1}
        />
      </Box>

      {/* Keychain hole indicator */}
      <Sphere
        args={[0.15, 16, 16]}
        position={[keychainHolePosition.x, keychainHolePosition.y, thickness / 2 + 0.1]}
      >
        <meshStandardMaterial 
          color="#FFD700"
          emissive="#FFD700"
          emissiveIntensity={0.3}
        />
      </Sphere>

      {/* Hole ring */}
      <mesh position={[keychainHolePosition.x, keychainHolePosition.y, thickness / 2]}>
        <torusGeometry args={[0.2, 0.05, 8, 32]} />
        <meshStandardMaterial color="#C0C0C0" metalness={0.8} roughness={0.2} />
      </mesh>
    </>
  );
};

export const Canvas3D = ({ thickness, keychainHolePosition, imageTexture }: Canvas3DProps) => {
  return (
    <div className="w-full h-[400px] rounded-2xl overflow-hidden bg-gradient-aurora shadow-float">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <pointLight position={[-10, -10, -5]} intensity={0.5} />
          
          <KeychainModel 
            thickness={thickness}
            keychainHolePosition={keychainHolePosition}
            imageTexture={imageTexture}
          />
          
          <OrbitControls 
            enablePan={false}
            maxDistance={10}
            minDistance={3}
            autoRotate
            autoRotateSpeed={2}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};