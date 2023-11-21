import * as THREE from 'three'
import { OrbitControls, Text, Float } from '@react-three/drei'
import { useGLTF } from '@react-three/drei'
import { Perf } from 'r3f-perf'
import { RigidBody, Physics, CylinderCollider, InstancedRigidBodies, CuboidCollider, Debug } from '@react-three/rapier'
import { useLoader } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import { HeartGeometry } from './geometry'


export default function Experience()
{
    const like = useGLTF('./heartshape.glb')
   
    const tenK = useGLTF('./10K.glb')
   
    const textureLogo = useLoader(THREE.TextureLoader,'./IMG_59342.PNG')

    const logo = 150
    const heart = 300
    const logoRef = useRef()
    const heartshapeRef = useRef()

    const logoTransform  = useMemo(() => {
        const positions = []
        const rotations = []
        const scales = []

        for (let i = 0; i < logo; i++) {
            positions.push([(Math.random() - 0.5) * 8, 6 + i * 0.2,(Math.random() - 0.5) * 8 ])
            rotations.push([Math.random(), Math.random() , Math.random()])

            const scale = 0.2 + Math.random() * 0.8
            scales.push([scale, scale, scale])
            
        }
        return {positions, rotations, scales}
    },[])

    const heartTransform  = useMemo(() => {
        const positions = []
        const rotations = []
        const scales = []

        for (let i = 0; i < logo; i++) {
            positions.push([(Math.random() - 0.5) * 8, 6 + i * 0.2,(Math.random() - 0.5) * 8 ])
            rotations.push([Math.random(), Math.random() , Math.random()])

            const scale = 0.2 + Math.random() * 0.8
            scales.push([scale, scale, scale])
            
        }
        return {positions, rotations, scales}
    },[])

    

    return <>

      
        {/* <Perf position="top-left" /> */}

        <OrbitControls  enableZoom={false} enablePan={false} minPolarAngle={Math.PI / 4} maxPolarAngle={Math.PI / 4}/>

        <directionalLight castShadow position={ [ 1, 2, 3 ] } intensity={ 1.5 } />
        <ambientLight intensity={ 0.5 } />

        <Physics gravity={[0, -9.81, 0]}>
        {/* <Debug /> */}

        {/* SOL */}
        <RigidBody type='fixed' friction={0.7} >
        <mesh receiveShadow position-y={ - 1.25 }>
            <boxGeometry args={ [ 50, 0.5, 50 ] } />
            <meshStandardMaterial color='#fdf5e6' />
        </mesh>
        </RigidBody>

        {/* <RigidBody >
        <mesh receiveShadow position-y={3} rotation={[0,  -Math.PI * 0.35, Math.PI * 0.25]}>
            <circleGeometry args={[0.5, 64]} />
            <meshStandardMaterial map={textureLogo} side={THREE.DoubleSide} />
        </mesh>
        </RigidBody> */}

        <InstancedRigidBodies colliders="cuboid"
            positions={logoTransform.positions}
            rotations={logoTransform.rotations}
            scales={logoTransform.scales}     
            >
        <instancedMesh ref={logoRef} castShadow args={[null, null, logo]}>
            <boxGeometry />
            <meshStandardMaterial map={textureLogo}  />
        </instancedMesh>
        </InstancedRigidBodies>
    
        {/* MODEL DE LIKE */}
        <Float>
        <RigidBody type="fixed" colliders="trimesh" friction={0.7} scale={5} position={[- 5, 3, 6]}>
            <primitive object={like.scene}></primitive>
           
        </RigidBody>
        </Float>

        

        <InstancedRigidBodies colliders='hull'
        positions={heartTransform.positions}
            rotations={heartTransform.rotations}
            scales={heartTransform.scales}     
            >
        <instancedMesh ref={heartshapeRef} castShadow args={[null, null, heart]}>
            <HeartGeometry radius={0.6} depth={0.25} />
            <meshStandardMaterial color='red' roughness={0.25} metalness={0.5} />
        </instancedMesh>
        </InstancedRigidBodies>

        {/* <primitive castShadow object={tenK.scene} position={[0, - 1, 0]} scale={4}></primitive> */}
        
        </Physics>

        {/* <Text
    font="./Road_Rage.otf"
    fontSize={ 2 }
    rotation-y={ -2}
    color='green'
    position={[2, 3, 0]}
    >
    MERCI
    </Text> */}
    </>
}