import React, { useState, useEffect, useRef } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import * as THREE from "three"

const Plot3D = ({ equation, precision = 0.5 }) => {
  const [points, setPoints] = useState([])
  const meshRef = useRef<THREE.Points>(null)
  const ambientLightRef = useRef<THREE.AmbientLight>(null)
  const pointLightRef = useRef<THREE.PointLight>(null)
  const sphereMeshRef = useRef<THREE.Mesh>(null)

  useEffect(() => {
    const worker = new Worker(
      new URL("./generatePoints.worker.ts", import.meta.url),
      { type: "module" }
    )

    worker.onmessage = (e) => {
      const pointsArray = e.data.map(
        ({ x, y, z }) => new THREE.Vector3(x, y, z)
      )
      setPoints(pointsArray)
    }

    worker.postMessage({ equation, precision })

    return () => worker.terminate()
  }, [equation, precision])

  useEffect(() => {
    if (meshRef.current && points.length > 0) {
      if (ambientLightRef.current) ambientLightRef.current.intensity = 0.8
      pointLightRef.current?.position.set(0, 0, 0)
      sphereMeshRef.current?.position.set(0, 0, 0)
      const positions = new Float32Array(points.length * 3)
      points.forEach((point, i) => {
        positions[i * 3] = point.x
        positions[i * 3 + 1] = point.y
        positions[i * 3 + 2] = point.z
      })

      meshRef.current.geometry.setAttribute(
        "position",
        new THREE.BufferAttribute(positions, 3)
      )
      meshRef.current.geometry.attributes.position.needsUpdate = true
    }
  }, [points])

  return (
    <Canvas>
      <ambientLight ref={ambientLightRef} />
      <pointLight ref={pointLightRef} />
      <points ref={meshRef}>
        <bufferGeometry />
        <pointsMaterial color="red" size={0.5} />
      </points>
      <gridHelper />
      <axesHelper />
      <OrbitControls enableZoom={false} enablePan={false} />
      <mesh ref={sphereMeshRef}>
        <sphereGeometry />
        <meshBasicMaterial color="blue" />
      </mesh>
    </Canvas>
  )
}

export default Plot3D
