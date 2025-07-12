import { Suspense, useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment, Html } from '@react-three/drei';
import * as THREE from 'three';

interface GLBViewerProps {
  modelUrl?: string;
  width?: string;
  height?: string;
  activeScenario?: string | null;
}



// Simple arrow indicator component
function ArrowIndicator({ position, color, label, isVibrating = false }: { 
  position: THREE.Vector3; 
  color: number; 
  label: string;
  isVibrating?: boolean;
}) {
  const arrowRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (arrowRef.current) {
      if (isVibrating) {
        // Fast shaking animation for vibration
        const shake = Math.sin(state.clock.elapsedTime * 15) * 0.1;
        const shakeY = Math.sin(state.clock.elapsedTime * 12) * 0.1;
        arrowRef.current.position.set(
          position.x + shake,
          position.y + 2 + shakeY,
          position.z + Math.sin(state.clock.elapsedTime * 18) * 0.05
        );
        // Fast rotation for vibration effect
        arrowRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 8) * 0.3;
      } else {
        // Gentle floating animation for other scenarios
        arrowRef.current.position.y = position.y + 2 + Math.sin(state.clock.elapsedTime * 2) * 0.3;
        // Gentle rotation to make it more visible
        arrowRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 1.5) * 0.2;
      }
    }
  });
  
  return (
    <group ref={arrowRef} position={[position.x, position.y + 2, position.z]}>
      {/* Arrow pointing down */}
      <group rotation={[Math.PI, 0, 0]}>
        {/* Arrow shaft */}
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.05, 0.05, 1, 8]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.3} />
        </mesh>
        
        {/* Arrow head (cone) */}
        <mesh position={[0, -0.7, 0]}>
          <coneGeometry args={[0.2, 0.4, 8]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} />
        </mesh>
      </group>
      
      {/* Label */}
      <Html position={[0, 1, 0]} center>
        <div style={{
          background: `rgba(${color === 0xff0000 ? '255,0,0' : color === 0x0099ff ? '0,153,255' : '255,165,0'}, 0.9)`,
          color: 'white',
          padding: '4px 8px',
          borderRadius: '4px',
          fontSize: '10px',
          fontWeight: 'bold',
          whiteSpace: 'nowrap',
          textAlign: 'center',
          border: '1px solid rgba(255,255,255,0.3)',
          boxShadow: '0 2px 8px rgba(0,0,0,0.3)'
        }}>
          {label}
        </div>
      </Html>
    </group>
  );
}

function Model({ url, onModelLoaded, activeScenario }: { 
  url: string; 
  onModelLoaded: (boundingBox: THREE.Box3) => void;
  activeScenario?: string | null;
}) {
  const { scene } = useGLTF(url);
  const modelRef = useRef<THREE.Group>(null);
  const [selectedMeshes, setSelectedMeshes] = useState<{
    overheating: THREE.Mesh | null;
    waterLeak: THREE.Mesh | null;
    powerOutage: THREE.Mesh[];
    vibration: THREE.Mesh | null;
  }>({
    overheating: null,
    waterLeak: null,
    powerOutage: [],
    vibration: null
  });
  
  // Clone the scene to avoid issues with multiple instances
  const clonedScene = scene.clone();
  
  // Center the model and get bounding box info
  const box = new THREE.Box3().setFromObject(clonedScene);
  const center = box.getCenter(new THREE.Vector3());
  clonedScene.position.sub(center);
  
  // Find all meshes and randomly select ones for each scenario
  useEffect(() => {
    if (modelRef.current) {
      // Find all meshes in the model
      const meshes: THREE.Mesh[] = [];
      modelRef.current.traverse((child) => {
        if (child instanceof THREE.Mesh && child.name) {
          meshes.push(child);
        }
      });
      
      console.log('All mesh names in model:', meshes.map(m => m.name));
      
      if (meshes.length > 0) {
        // Randomly select meshes for each scenario
        const shuffled = [...meshes].sort(() => 0.5 - Math.random());
        
        const overheatingMesh = shuffled[0] || null;
        const waterLeakMesh = shuffled[1] || null;
        const powerOutageMeshes = shuffled.slice(2, 5); // Select 3 random meshes
        const vibrationMesh = shuffled[5] || null; // Assuming vibration is the 6th mesh
        
        setSelectedMeshes({
          overheating: overheatingMesh,
          waterLeak: waterLeakMesh,
          powerOutage: powerOutageMeshes,
          vibration: vibrationMesh
        });
        
        console.log('Selected meshes:', {
          overheating: overheatingMesh?.name,
          waterLeak: waterLeakMesh?.name,
          powerOutage: powerOutageMeshes.map(m => m.name),
          vibration: vibrationMesh?.name
        });
      }
    }
  }, []);
  
  // Call the callback with bounding box info
  useEffect(() => {
    if (modelRef.current) {
      onModelLoaded(box);
    }
  }, [onModelLoaded]);
  
  // Add rotation animation
  useFrame((_, delta) => {
    if (modelRef.current) {
      modelRef.current.rotation.y += delta * 0.2;
    }
  });
  
  return (
    <group ref={modelRef} scale={1.5}>
      <primitive object={clonedScene} />
      
      {/* Arrow indicators for each scenario */}
      {activeScenario === 'overheating' && selectedMeshes.overheating && (
        <ArrowIndicator 
          position={selectedMeshes.overheating.position} 
          color={0xff0000} 
          label="🔥 here"
        />
      )}
      
      {activeScenario === 'waterLeak' && selectedMeshes.waterLeak && (
        <ArrowIndicator 
          position={selectedMeshes.waterLeak.position} 
          color={0x0099ff} 
          label="💧 here"
        />
      )}
      
      {activeScenario === 'powerOutage' && selectedMeshes.powerOutage.map((mesh, index) => (
        <ArrowIndicator 
          key={`power-${index}`}
          position={mesh.position} 
          color={0xffa500} 
          label="⚡ here"
        />
      ))}

      {activeScenario === 'vibration' && selectedMeshes.vibration && (
        <ArrowIndicator 
          position={selectedMeshes.vibration.position} 
          color={0x9900ff} // Purple/Magenta color for vibration
          label="💥 here"
          isVibrating={true} // Pass true for vibration
        />
      )}
    </group>
  );
}

function GLBViewer({ modelUrl, width = '100%', height = '400px', activeScenario }: GLBViewerProps) {
  const [cameraDistance, setCameraDistance] = useState(5);
  
  const handleModelLoaded = (boundingBox: THREE.Box3) => {
    const size = boundingBox.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z);
    const distance = maxDim * 4.0;
    setCameraDistance(distance);
  };
  
  const getLightingIntensity = () => {
    return activeScenario === 'powerOutage' ? 0.3 : 0.8;
  };
  
  const getDirectionalLightIntensity = () => {
    return activeScenario === 'powerOutage' ? 0.5 : 1.2;
  };
  
  if (!modelUrl) {
    return (
      <div style={{ 
        width, 
        height, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        color: '#666',
        background: '#f8f9fa',
        borderRadius: '8px'
      }}>
        <p>No model URL provided</p>
      </div>
    );
  }

  return (
    <div style={{ width, height }}>
      <Canvas
        camera={{ position: [0, 0, cameraDistance], fov: 50 }}
        style={{ width: '100%', height: '100%' }}
      >
        <Suspense fallback={null}>
          <Model 
            url={modelUrl} 
            onModelLoaded={handleModelLoaded}
            activeScenario={activeScenario}
          />
          <Environment preset="apartment" />
        </Suspense>
        
        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minDistance={cameraDistance * 0.5}
          maxDistance={cameraDistance * 2}
        />
        
        <ambientLight intensity={getLightingIntensity()} />
        <directionalLight position={[10, 10, 5]} intensity={getDirectionalLightIntensity()} />
        <directionalLight position={[-10, -10, -5]} intensity={getDirectionalLightIntensity() * 0.3} />
      </Canvas>
    </div>
  );
}

export default GLBViewer; 