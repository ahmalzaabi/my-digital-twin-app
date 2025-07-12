import { Suspense, useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment } from '@react-three/drei';
import * as THREE from 'three';

interface GLBViewerProps {
  modelUrl?: string;
  width?: string;
  height?: string;
}

function Model({ url, onModelLoaded }: { url: string; onModelLoaded: (boundingBox: THREE.Box3) => void }) {
  const { scene } = useGLTF(url);
  const modelRef = useRef<THREE.Group>(null);
  
  // Clone the scene to avoid issues with multiple instances
  const clonedScene = scene.clone();
  
  // Center the model and get bounding box info
  const box = new THREE.Box3().setFromObject(clonedScene);
  const center = box.getCenter(new THREE.Vector3());
  clonedScene.position.sub(center);
  
  // Call the callback with bounding box info
  useEffect(() => {
    onModelLoaded(box);
  }, [onModelLoaded]);
  
  // Add rotation animation
  useFrame((_, delta) => {
    if (modelRef.current) {
      modelRef.current.rotation.y += delta * 0.2; // Slower rotation around Y-axis
    }
  });
  
  return <group ref={modelRef}><primitive object={clonedScene} /></group>;
}

function GLBViewer({ modelUrl, width = '100%', height = '400px' }: GLBViewerProps) {
  const [cameraDistance, setCameraDistance] = useState(5);
  
  const handleModelLoaded = (boundingBox: THREE.Box3) => {
    // Calculate the size of the model
    const size = boundingBox.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z);
    
    // Calculate appropriate camera distance to fit the model
    // Adding much more padding (4.0 multiplier) for optimal mobile/iPhone experience
    const distance = maxDim * 4.0;
    setCameraDistance(distance);
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
          <Model url={modelUrl} onModelLoaded={handleModelLoaded} />
          <Environment preset="apartment" />
        </Suspense>
        
        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minDistance={cameraDistance * 0.5}
          maxDistance={cameraDistance * 2}
        />
        
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
      </Canvas>
    </div>
  );
}

export default GLBViewer; 