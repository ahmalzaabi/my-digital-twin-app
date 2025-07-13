import { Suspense, useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment, Html } from '@react-three/drei';
import * as THREE from 'three';

interface GLBViewerProps {
  modelUrl?: string;
  width?: string;
  height?: string;
  activeScenario?: string | null;
}

// Simple problem indicator overlay
function ProblemIndicator({ 
  position, 
  scenario,
  index 
}: { 
  position: THREE.Vector3;
  scenario: string;
  index: number;
}) {
  const indicatorRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (indicatorRef.current) {
      // Gentle floating animation
      indicatorRef.current.position.y = position.y + Math.sin(state.clock.elapsedTime * 2 + index) * 0.1;
      
      // Gentle rotation
      indicatorRef.current.rotation.y = state.clock.elapsedTime * 0.5;
    }
  });
  
  const getIndicatorConfig = () => {
    switch (scenario) {
      case 'overheating':
        return {
          color: '#ff0000',
          label: 'here',
          bgColor: 'rgba(255, 0, 0, 0.9)'
        };
      case 'waterLeak':
        return {
          color: '#0099ff',
          label: 'here',
          bgColor: 'rgba(0, 153, 255, 0.9)'
        };
      case 'powerOutage':
        return {
          color: '#ffa500',
          label: 'here',
          bgColor: 'rgba(255, 165, 0, 0.9)'
        };
      case 'vibration':
        return {
          color: '#9900ff',
          label: 'here',
          bgColor: 'rgba(153, 0, 255, 0.9)'
        };
      default:
        return {
          color: '#ffffff',
          label: 'here',
          bgColor: 'rgba(255, 255, 255, 0.9)'
        };
    }
  };
  
  const config = getIndicatorConfig();
  
  return (
    <group ref={indicatorRef} position={[position.x, position.y + 0.5, position.z]}>
      {/* Glowing sphere */}
      <mesh>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshBasicMaterial 
          color={config.color}
          transparent
          opacity={0.8}
        />
      </mesh>
      
      {/* Arrow pointing down */}
      <group position={[0, 0.1, 0]} rotation={[0, 0, 0]}>
        {/* Arrow shaft */}
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.01, 0.01, 0.3, 8]} />
          <meshBasicMaterial color={config.color} />
        </mesh>
        
        {/* Arrow head */}
        <mesh position={[0, -0.2, 0]}>
          <coneGeometry args={[0.03, 0.08, 8]} />
          <meshBasicMaterial color={config.color} />
        </mesh>
      </group>
      
      {/* Floating label */}
      <Html position={[0, 0.4, 0]} center>
        <div style={{
          background: config.bgColor,
          color: 'white',
          padding: '6px 12px',
          borderRadius: '15px',
          fontSize: '12px',
          fontWeight: 'bold',
          fontFamily: 'Orbitron, monospace',
          textAlign: 'center',
          whiteSpace: 'nowrap',
          border: `2px solid ${config.color}`,
          boxShadow: `0 0 15px ${config.color}`,
          transform: 'scale(0.85)',
          userSelect: 'none',
          pointerEvents: 'none'
        }}>
          {config.label}
        </div>
      </Html>
      
      {/* Warning ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.15, 0.2, 32]} />
        <meshBasicMaterial 
          color={config.color}
          transparent
          opacity={0.3}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}



// Main Model component
function Model({ url, onModelLoaded, activeScenario }: { 
  url: string; 
  onModelLoaded: (boundingBox: THREE.Box3) => void;
  activeScenario?: string | null;
}) {
  const { scene } = useGLTF(url);
  const modelRef = useRef<THREE.Group>(null);
  const [problemAreas, setProblemAreas] = useState<{
    overheating: THREE.Vector3[];
    waterLeak: THREE.Vector3[];
    powerOutage: THREE.Vector3[];
    vibration: THREE.Vector3[];
  }>({
    overheating: [],
    waterLeak: [],
    powerOutage: [],
    vibration: []
  });
  
  const [modelMeshes, setModelMeshes] = useState<THREE.Mesh[]>([]);
  
  // Clone the scene
  const clonedScene = scene.clone();
  
  // Center the model
  const box = new THREE.Box3().setFromObject(clonedScene);
  const center = box.getCenter(new THREE.Vector3());
  clonedScene.position.sub(center);
  
  // Extract meshes from the model
  useEffect(() => {
    if (modelRef.current) {
      const meshes: THREE.Mesh[] = [];
      modelRef.current.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          meshes.push(child);
        }
      });
      setModelMeshes(meshes);
    }
  }, []);
  
  // Call the callback with bounding box info
  useEffect(() => {
    if (modelRef.current) {
      onModelLoaded(box);
    }
  }, [onModelLoaded]);
  
  // Auto-place random indicators when scenario changes
  useEffect(() => {
    if (activeScenario && modelMeshes.length > 0) {
      // Clear existing indicators for this scenario
      setProblemAreas(prev => ({
        ...prev,
        [activeScenario]: []
      }));
      
      // Create random positions based on mesh locations
      const shuffledMeshes = [...modelMeshes].sort(() => 0.5 - Math.random());
      const numIndicators = Math.min(3, shuffledMeshes.length); // Maximum 3 indicators
      const randomPositions: THREE.Vector3[] = [];
      
      for (let i = 0; i < numIndicators; i++) {
        const mesh = shuffledMeshes[i];
        const worldPos = new THREE.Vector3();
        mesh.getWorldPosition(worldPos);
        
        // Add some random offset
        worldPos.x += (Math.random() - 0.5) * 0.5;
        worldPos.y += (Math.random() - 0.5) * 0.5;
        worldPos.z += (Math.random() - 0.5) * 0.5;
        
        randomPositions.push(worldPos);
      }
      
      // Set the random positions after a short delay for better UX
      setTimeout(() => {
        setProblemAreas(prev => ({
          ...prev,
          [activeScenario]: randomPositions
        }));
      }, 500);
    } else if (!activeScenario) {
      // Clear all indicators when no scenario is active
      setProblemAreas({
        overheating: [],
        waterLeak: [],
        powerOutage: [],
        vibration: []
      });
    }
  }, [activeScenario, modelMeshes]);
  
  // Add rotation animation
  useFrame((_, delta) => {
    if (modelRef.current) {
      modelRef.current.rotation.y += delta * 0.2;
      
      // Add vibration effect for vibration scenario
      if (activeScenario === 'vibration') {
        const time = Date.now() * 0.01;
        modelRef.current.position.x = Math.sin(time * 2) * 0.02;
        modelRef.current.position.z = Math.cos(time * 2.5) * 0.02;
      } else {
        modelRef.current.position.set(0, 0, 0);
      }
    }
  });
  

  
  return (
    <group ref={modelRef} scale={1.5}>
      <primitive object={clonedScene} />
      
      {/* Problem indicators for active scenario */}
      {activeScenario && problemAreas[activeScenario as keyof typeof problemAreas].map((point, index) => (
        <ProblemIndicator
          key={`${activeScenario}-${index}`}
          position={point}
          scenario={activeScenario}
          index={index}
        />
      ))}
    </group>
  );
}

// Main GLBViewer component
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