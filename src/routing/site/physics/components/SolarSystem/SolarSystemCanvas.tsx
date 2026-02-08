/* eslint-disable react/no-unknown-property */
import React, { Suspense, useMemo, useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Stars, Text, Line } from "@react-three/drei"
import * as THREE from "three"
import { usePlanets } from "./PlanetContext"
import styled from "styled-components"

const InfoPanel = styled.div`
  position: absolute;
  bottom: 20px;
  right: 20px;
  background: linear-gradient(
    135deg,
    rgba(10, 16, 28, 0.85),
    rgba(6, 8, 12, 0.75)
  );
  padding: 14px 16px;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.45);
  color: rgba(255, 255, 255, 0.92);
  pointer-events: none;
  font-family: "Courier New", Courier, monospace;
  backdrop-filter: blur(8px);
`

const Planet = ({ planet }) => {
  const meshRef = useRef()
  const groupRef = useRef()

  // Orbit visualization
  const orbitPoints = useMemo(() => {
    const points = []
    const segments = 128
    for (let i = 0; i <= segments; i++) {
      const angle = (i / segments) * Math.PI * 2
      points.push(
        new THREE.Vector3(
          Math.cos(angle) * planet.distance * 0.4,
          0,
          Math.sin(angle) * planet.distance * 0.4
        )
      )
    }
    return points
  }, [planet.distance])

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime()

    if (planet.name !== "Sun") {
      const angle = time * planet.speed * 0.1 + (planet.angle || 0)
      const x = Math.cos(angle) * planet.distance * 0.4
      const z = Math.sin(angle) * planet.distance * 0.4

      if (groupRef.current) {
        groupRef.current.position.set(x, 0, z)
      }
    }

    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.5
    }
  })

  return (
    <group>
      {/* Orbit Line */}
      {planet.distance > 0 && (
        <Line
          points={orbitPoints}
          color={planet.fillColor}
          lineWidth={0.5}
          transparent
          opacity={0.2}
        />
      )}

      {/* Planet / Sun Group */}
      <group ref={groupRef}>
        <mesh ref={meshRef}>
          <sphereGeometry args={[planet.radius * 0.15, 32, 32]} />
          <meshStandardMaterial
            color={planet.fillColor}
            emissive={
              planet.name === "Sun" ? planet.fillColor : planet.fillColor
            }
            emissiveIntensity={planet.name === "Sun" ? 1.3 : 0.12}
            roughness={planet.name === "Sun" ? 0.35 : 0.55}
            metalness={planet.name === "Sun" ? 0.0 : 0.25}
          />

          {/* Sun specific features */}
          {planet.name === "Sun" && (
            <>
              <pointLight intensity={4.5} distance={400} decay={2} />
              <mesh>
                <sphereGeometry args={[planet.radius * 0.16, 32, 32]} />
                <meshBasicMaterial
                  color={planet.fillColor}
                  transparent
                  opacity={0.22}
                  blending={THREE.AdditiveBlending}
                  depthWrite={false}
                />
              </mesh>
            </>
          )}

          {/* Saturn's Rings */}
          {planet.hasRings && (
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <ringGeometry
                args={[planet.radius * 0.2, planet.radius * 0.35, 64]}
              />
              <meshStandardMaterial
                color="#C5AB6E"
                transparent
                opacity={0.6}
                side={THREE.DoubleSide}
              />
            </mesh>
          )}
        </mesh>

        {/* Planet Label */}
        {/* Text can suspend while loading fonts; keep scene rendering */}
        <Suspense fallback={null}>
          <Text
            position={[0, planet.radius * 0.15 + 1.2, 0]}
            fontSize={0.6}
            color="white"
            anchorX="center"
            anchorY="middle"
            outlineWidth={0.05}
            outlineColor="#000000"
          >
            {planet.name}
          </Text>
        </Suspense>
      </group>
    </group>
  )
}

const SolarSystemCanvas = () => {
  const { planets } = usePlanets()

  return (
    <>
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [50, 50, 80], fov: 45 }}
        gl={{ antialias: true, powerPreference: "high-performance" }}
        onCreated={({ gl }) => {
          gl.outputColorSpace = THREE.SRGBColorSpace
          gl.toneMapping = THREE.ACESFilmicToneMapping
          gl.toneMappingExposure = 1.25
        }}
      >
        <color attach="background" args={["#030305"]} />
        <fog attach="fog" args={["#03060f", 60, 240]} />
        <ambientLight intensity={0.1} />
        <hemisphereLight
          intensity={0.22}
          color={"#d9e8ff"}
          groundColor={"#0a0d14"}
        />
        <Stars
          radius={200}
          depth={50}
          count={4500}
          factor={4}
          saturation={0}
          fade
          speed={1.2}
        />

        <group rotation={[Math.PI * 0.05, 0, 0]}>
          {planets.map((planet) => (
            <Planet key={planet.name} planet={planet} />
          ))}
        </group>

        <OrbitControls
          makeDefault
          minDistance={5}
          maxDistance={250}
          enableDamping={true}
          dampingFactor={0.05}
        />
      </Canvas>
      <InfoPanel>
        <div
          style={{ color: "#fbac61", fontWeight: "bold", marginBottom: "5px" }}
        >
          SYSTEM STATUS: ONLINE
        </div>
        <div>Real-time Orbital Mechanics</div>
        <div style={{ fontSize: "0.8em", marginTop: "10px", color: "#888" }}>
          DRAG TO ROTATE • SCROLL TO ZOOM • RIGHT CLICK TO PAN
        </div>
      </InfoPanel>
    </>
  )
}

export default SolarSystemCanvas
