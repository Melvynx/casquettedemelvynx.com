// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Float } from '@react-three/drei';
import { extend, useFrame, useThree } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { CasquetteModel } from './CasquetteModel';

extend({ OrbitControls });

export const Experience = () => {
  const { camera, gl } = useThree();

  return (
    <>
      {/* @ts-ignore */}
      <orbitControls args={[camera, gl.domElement]} />

      <CustomGeometryParticles count={200} />

      <color attach="background" args={['black']} />

      <CasquetteModel rotation={[Math.PI * 1.5, 0, 0]} position-y={-0.2} />

      <Torus1 color="#82D8F7" rayon={1.8} x={-1.8} y={Math.PI / 3 - 0.2} />
      <Torus1 color="#82D8F7" rayon={1.88} x={-1.8} y={(Math.PI / 3) * 2 + 0.2} />
      <Torus1 color="#82D8F7" rayon={1.96} x={1.8} y={(Math.PI / 3) * 3} />

      <ambientLight intensity={0.4} />
      <directionalLight color="white" intensity={5} position={[0, 2, -8]} />
      <directionalLight color="white" intensity={2} position={[0, 0, 5]} />
      <directionalLight color="white" intensity={3} position={[0, 1, -4]} />
    </>
  );
};

const Torus1 = ({
  color,
  rayon,
  y,
  x = Math.PI / 2,
  z = 0,
}: {
  color: string;
  rayon: number;
  y: number;
  x?: number;
  z?: number;
}) => {
  const thickness = 0.03;

  return (
    <>
      <Float rotationIntensity={0.4}>
        <mesh position={[0, 0, 0]} rotation={[x, y, z]}>
          <torusGeometry args={[rayon, thickness, 16, 100]} />
          <meshStandardMaterial color={color} metalness={0.9} roughness={0.5} />
        </mesh>
      </Float>

      {/* <mesh position={[x, z, y]}>
        <sphereGeometry args={[sphereSize, 32, 32]} />
        <meshStandardMaterial color="#f1f1f1" />
      </mesh> */}
    </>
  );
};

const CustomGeometryParticles = (props) => {
  const { count } = props;

  // This reference gives us direct access to our points
  const points = useRef();

  // Generate our positions attributes array
  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const distance = 1;

    for (let i = 0; i < count; i++) {
      const theta = THREE.MathUtils.randFloatSpread(360);
      const phi = THREE.MathUtils.randFloatSpread(360);

      const x = distance * Math.sin(theta) * Math.cos(phi);
      const y = distance * Math.sin(theta) * Math.sin(phi);
      const z = distance * Math.cos(theta);

      positions.set([x, y, z], i * 3);
    }

    return positions;
  }, [count]);

  const slow = 0.0002;

  useFrame((state) => {
    const { clock } = state;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      points.current.geometry.attributes.position.array[i3] +=
        Math.sin(clock.elapsedTime + Math.random() * 10) * slow;
      points.current.geometry.attributes.position.array[i3 + 1] +=
        Math.cos(clock.elapsedTime + Math.random() * 10) * slow;
      points.current.geometry.attributes.position.array[i3 + 2] +=
        Math.sin(clock.elapsedTime + Math.random() * 10) * slow;
    }

    points.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={points} scale={2.5}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particlesPosition.length / 3}
          array={particlesPosition}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.005}
        color="#5786F5"
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
};
