import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { InstancedRigidBodies, RigidBody } from "@react-three/rapier";
import { MathUtils, MeshStandardMaterial } from "three";
import { Addition } from "@react-three/csg";


export default function Model(props) {
  const { nodes, materials } = useGLTF("/10K.glb");
  return (
     <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Text.geometry}
       
        rotation={[Math.PI / 2, 0, -Math.PI / 2]}
      >
      <meshStandardMaterial  color='#cd853f' roughness={0.25}/>
      </mesh>
     </group>
  );
}

useGLTF.preload("/10K.glb");
