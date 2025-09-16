import { useRef, useState, Suspense, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Box, Sphere } from "@react-three/drei";
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
  const [texture, setTexture] = useState<THREE.Texture | null>(null);

  // Load texture properly
  useEffect(() => {
    if (imageTexture) {
      const loader = new THREE.TextureLoader();
      loader.load(imageTexture, (loadedTexture) => {
        loadedTexture.format = THREE.RGBAFormat;
        loadedTexture.needsUpdate = true;
        setTexture(loadedTexture);
      });
    } else {
      setTexture(null);
    }
  }, [imageTexture]);

  // Update thickness dynamically
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.scale.z = thickness;
    }
  });

  // Determine color based on selection
  const getKeychainColor = () => {
    if (keychainColor === "rainbow") {
      return "#FF69B4";
    } else if (keychainColor === "sunset") {
      return "#FF7F50";
    } else if (keychainColor === "aurora") {
      return "#764ba2";
    } else if (keychainColor === "#FFFFFF" && texture) {
      return "#FFFFFF";
    } else if (keychainColor === "#FFFFFF" && !texture) {
      return material.color;
    } else {
      return keychainColor;
    }
  };

  // Don't render anything if no texture is loaded
  if (!imageTexture && !texture) {
    return (
      <>
        {/* Placeholder when no image */}
        <Box
          args={[size.width, size.height, thickness]}
          position={[0, 0, 0]}
        >
          <meshStandardMaterial 
            color={getKeychainColor()}
            roughness={material.roughness}
            metalness={material.metalness}
            opacity={0.3}
            transparent
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
  }

  return (
    <>
      {/* Main keychain body */}
      <Box
        ref={meshRef}
        args={[size.width, size.height, thickness]}
        position={[0, 0, 0]}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <meshStandardMaterial 
          color={hovered ? "#FFB6C1" : getKeychainColor()}
          map={texture}
          transparent={true}
          opacity={keychainColor === "#FFFFFF" && texture ? 0.9 : 1}
          alphaMap={texture}
          alphaTest={0.5}
          roughness={material.roughness}
          metalness={material.metalness}
          side={THREE.DoubleSide}
        />
      </Box>

      {/* Text overlay - Render on top of the keychain */}
      {textConfig && textConfig.text && (
        <mesh position={[textConfig.position.x, textConfig.position.y, thickness / 2 + 0.02]}>
          <planeGeometry args={[2, 0.5]} />
          <meshBasicMaterial transparent opacity={0}>
            <canvasTexture
              attach="map"
              image={(() => {
                const canvas = document.createElement('canvas');
                canvas.width = 512;
                canvas.height = 128;
                const ctx = canvas.getContext('2d');
                if (ctx) {
                  ctx.font = `${textConfig.fontSize * 2}px ${textConfig.fontFamily}`;
                  ctx.fillStyle = textConfig.color;
                  ctx.textAlign = 'center';
                  ctx.textBaseline = 'middle';
                  ctx.save();
                  ctx.translate(256, 64);
                  ctx.rotate((textConfig.rotation * Math.PI) / 180);
                  ctx.fillText(textConfig.text, 0, 0);
                  ctx.restore();
                }
                return canvas;
              })()}
            />
          </meshBasicMaterial>
        </mesh>
      )}

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