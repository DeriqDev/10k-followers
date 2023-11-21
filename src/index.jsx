import './style.css'
import * as THREE from 'three'
import ReactDOM from 'react-dom/client'
import { Canvas} from '@react-three/fiber'
import { Addition } from '@react-three/csg'

import Experience from './Experience.jsx'
import { Environment, Lightformer, AccumulativeShadows, RandomizedLight } from '@react-three/drei'
import { RigidBody, Physics } from '@react-three/rapier'
import { EffectComposer, DepthOfField } from '@react-three/postprocessing'
import Like from './Like.jsx'
import Tenk from './Tenk.jsx'

const root = ReactDOM.createRoot(document.querySelector('#root'))

root.render(
    <Canvas
        shadows
        gl={{antialias: false}}
        camera={ {
            fov: 12,
            near: 30,
            far: 55,
            position: [ -30, 35, -15 ]
        } }
    >
    <color attach="background" args={['#f0f0f0']} />
    <ambientLight intensity={0.5} />
    <directionalLight position={[-10, 10, 5]} shadow-mapSize={[256, 256]} shadow-bias={-0.0001} castShadow>
      <orthographicCamera attach="shadow-camera" args={[-10, 10, -10, 10]} />
    </directionalLight>
    {/* <Environment resolution={32}>
      <Lightformer position={[10, 10, 10]} scale={10} color="green" intensity={4} />
      <Lightformer position={[10, 0, -10]} scale={10} color="green" intensity={6} />
      <Lightformer position={[-10, -10, -10]} scale={10} color="green" intensity={4} />
    </Environment> */}

    <AccumulativeShadows temporal frames={Infinity} alphaTest={1} blend={200} limit={1500} scale={25} position={[0, -0.05, 0]}>
      <RandomizedLight amount={1} mapSize={512} radius={5} ambient={0.5} position={[-10, 10, 5]} size={10} bias={0.001} />
    </AccumulativeShadows>
    <EffectComposer>
        <DepthOfField target={[0, 0, 0]} focusRange={0.15} bokehScale={8}/>
    </EffectComposer>
        <Experience />
        {/* <Like scale={4}/> */}
        <Physics >
        <RigidBody type='fixed' colliders="cuboid">
        <Tenk scale={4.5} rotation={[0, Math.PI * 0.75, 0]} position-y={1} />
        </RigidBody>

          

        </Physics>

    </Canvas>
)