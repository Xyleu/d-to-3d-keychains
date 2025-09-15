import { useRef, useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Box, Sphere, Text } from "@react-three/drei";
import * as THREE from "three";
import { MaterialOption } from "./MaterialSelector";
import { TextOverlayConfig } from "./TextOverlay";
import { SizeOption } from "./SizeSelector";

interface Canvas3DProps {
  thickness: number;
  keychainHolePosition: { x: number; y: number };
  imageTexture: string | null;
  material: MaterialOption;
  textConfig?: TextOverlayConfig;
  size: SizeOption;
  keychainColor: string;
}

const KeychainModel = ({ 
  thickness, 
  keychainHolePosition, 
  imageTexture, 
  material,
  textConfig,
  size,
  keychainColor
}: Canvas3DProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  // Create texture from image with proper transparency handling
  const texture = imageTexture ? new THREE.TextureLoader().load(imageTexture) : null;
  
  // Set texture properties for transparency
  if (texture) {
    texture.format = THREE.RGBAFormat;
  }

  // Determine color based on selection
  const getKeychainColor = () => {
    if (keychainColor === "rainbow") {
      return "#FF69B4"; // Use pink as base, will apply gradient via shader
    } else if (keychainColor === "sunset") {
      return "#FF7F50";
    } else if (keychainColor === "aurora") {
      return "#764ba2";
    } else if (keychainColor === "#FFFFFF" && texture) {
      // If white is selected and there's a texture, use transparent material
      return "transparent";
    } else if (keychainColor === "#FFFFFF" && !texture) {
      return material.color;
    } else {
      return keychainColor;
    }
  };

  return (
    <>
      {/* Main keychain body */}
      <Box
        ref={meshRef}
        args={[size.width, size.height, size.depth]}
        position={[0, 0, 0]}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <meshStandardMaterial 
          color={getKeychainColor() === "transparent" ? "#FFFFFF" : (hovered ? "#FFB6C1" : getKeychainColor())}
          map={texture}
          transparent={texture !== null}
          opacity={getKeychainColor() === "transparent" ? 0 : 1}
          alphaMap={texture}
          roughness={material.roughness}
          metalness={material.metalness}
          side={THREE.DoubleSide}
        />
      </Box>

      {/* Text overlay - Only render if texture exists to prevent model disappearing */}
      {textConfig && textConfig.text && texture !== null && (
        <Text
          position={[textConfig.position.x, textConfig.position.y, size.depth / 2 + 0.01]}
          fontSize={textConfig.fontSize / 100}
          color={textConfig.color}
          font={`https://fonts.googleapis.com/css2?family=${textConfig.fontFamily.replace(' ', '+')}`}
          anchorX="center"
          anchorY="middle"
          rotation={[0, 0, (textConfig.rotation * Math.PI) / 180]}
        >
          {textConfig.text}
        </Text>
      )}

      {/* Keychain hole indicator */}
      <Sphere
        args={[0.15, 16, 16]}
        position={[keychainHolePosition.x, keychainHolePosition.y, size.depth / 2 + 0.1]}
      >
        <meshStandardMaterial 
          color="#FFD700"
          emissive="#FFD700"
          emissiveIntensity={0.3}
        />
      </Sphere>

      {/* Hole ring */}
      <mesh position={[keychainHolePosition.x, keychainHolePosition.y, size.depth / 2]}>
        <torusGeometry args={[0.2, 0.05, 8, 32]} />
        <meshStandardMaterial color="#C0C0C0" metalness={0.8} roughness={0.2} />
      </mesh>
    </>
  );
};

export const Canvas3D = ({ 
  thickness, 
  keychainHolePosition, 
  imageTexture,
  material,
  textConfig,
  size,
  keychainColor
}: Canvas3DProps) => {
  return (
    <div className="w-full h-[400px] rounded-2xl overflow-hidden bg-gradient-aurora shadow-float">
      <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <pointLight position={[-10, -10, -5]} intensity={0.5} />
          
          <KeychainModel 
            thickness={thickness}
            keychainHolePosition={keychainHolePosition}
            imageTexture={imageTexture}
            material={material}
            textConfig={textConfig}
            size={size}
            keychainColor={keychainColor}
          />
          
          <OrbitControls 
            enablePan={false}
            maxDistance={15}
            minDistance={3}
            autoRotate
            autoRotateSpeed={2}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};