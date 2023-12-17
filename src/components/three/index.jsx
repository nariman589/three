import React, { useEffect, useRef } from 'react'
import { angleToRadians } from '../../utils/angle'
import { Environment, OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'

import * as THREE from 'three'
import gsap from 'gsap'

function Three() {

    const orbitControlRef = useRef(null)
    useFrame((state) => {
        if(orbitControlRef.current) {
            const {x, y} = state.pointer
            orbitControlRef.current.setAzimuthalAngle(-x * angleToRadians(45))
            orbitControlRef.current.setPolarAngle((y + 1) * angleToRadians(60))
            orbitControlRef.current.update()
        }
    })

    const ballRef = useRef(null)
    useEffect(()=>{
        if(ballRef.current) {
            const timeline = gsap.timeline({paused: true})
            gsap.to(ballRef.current.position, {
                x: 1.2,
                duration: 2,
                ease: 'power2.out'
            })

            gsap.to(ballRef.current.position, {
                y: 0.5,
                duration: 0.5,
                ease: 'bounce.out'
            }, '<')

            timeline.play()
        }
    },[ballRef.current])

  return (
   <>
   <PerspectiveCamera makeDefault position={[0,1,5]}/>

   <OrbitControls ref={orbitControlRef} minPolarAngle={angleToRadians(60)} maxPolarAngle={angleToRadians(80)}/>

   <mesh ref={ballRef} position={[-2,1.75,0]} castShadow >
    <sphereGeometry args={[0.5, 32, 32]} />
    <meshStandardMaterial color='#ffffff'metalness={0.9} roughness={0.1}/>
   </mesh>

   <mesh rotation={[-angleToRadians(90), 0,0]} receiveShadow>
    <planeGeometry args={[20,20]}/>
    <meshStandardMaterial color='#1ea3d8'/>
   </mesh>

   <ambientLight args={['#ffffff', 0.25]}/>

   <spotLight args={['#ffffff',5, 7 , angleToRadians(45), 0.4]} position={[-3, 1 ,0]} castShadow/>

    <Environment background>
        <mesh >
            <sphereGeometry args={[50,100,100]}/>
            <meshBasicMaterial side={THREE.BackSide} color='#2266cc'/>
        </mesh>
    </Environment>

   </>
  )
}

export default Three