import { Suspense, useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Stars, Environment, PerspectiveCamera } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import * as THREE from 'three'
import type { Planet } from '@shared/types'
import { makePlanetTexture } from '../../three/planetTextures'
import { getQualitySettings, useSettingsStore } from '../../store/settingsStore'

interface PlanetMeshProps {
  planet: Planet
  segments: number
}

function PlanetMesh({ planet, segments }: PlanetMeshProps) {
  const meshRef = useRef<THREE.Mesh>(null!)
  const { render } = planet
  const texture = useMemo(() => makePlanetTexture(planet), [planet])

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += render.axisSpeed * delta * 60
    }
  })

  return (
    <group>
      <mesh ref={meshRef} castShadow receiveShadow rotation={[0, 0, (render.tilt * Math.PI) / 180]}>
        <sphereGeometry args={[render.radius * 2.5, segments, segments]} />
        <meshStandardMaterial
          map={texture}
          emissive={new THREE.Color(render.emissive)}
          emissiveIntensity={0.25}
          roughness={planet.name === 'Earth' ? 0.6 : 0.85}
          metalness={0.1}
        />
      </mesh>

      {render.hasAtmosphere && (
        <mesh scale={1.06}>
          <sphereGeometry args={[render.radius * 2.5, segments / 2, segments / 2]} />
          <meshStandardMaterial
            color="#4488ff"
            transparent
            opacity={0.12}
            depthWrite={false}
            side={THREE.FrontSide}
          />
        </mesh>
      )}

      {render.hasRings && planet.name === 'Saturn' && (
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[render.radius * 3.5, render.radius * 6, 64]} />
          <meshStandardMaterial
            color="#e4d191"
            transparent
            opacity={0.7}
            side={THREE.DoubleSide}
            depthWrite={false}
          />
        </mesh>
      )}

      {render.hasRings && planet.name === 'Uranus' && (
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[render.radius * 3.8, render.radius * 4.5, 48]} />
          <meshStandardMaterial
            color="#7de8e8"
            transparent
            opacity={0.35}
            side={THREE.DoubleSide}
            depthWrite={false}
          />
        </mesh>
      )}

      {render.hasMoon && <MoonOrbit parentRadius={render.radius * 2.5} />}
    </group>
  )
}

function MoonOrbit({ parentRadius }: { parentRadius: number }) {
  const moonRef = useRef<THREE.Mesh>(null!)
  const pivotRef = useRef<THREE.Group>(null!)

  useFrame((_, delta) => {
    if (pivotRef.current) pivotRef.current.rotation.y += delta * 0.5
  })

  return (
    <group ref={pivotRef}>
      <mesh ref={moonRef} position={[parentRadius + 1.5, 0, 0]}>
        <sphereGeometry args={[0.35, 16, 16]} />
        <meshStandardMaterial color="#aaaaaa" roughness={0.9} />
      </mesh>
    </group>
  )
}

function SceneLighting({ shadows }: { shadows: boolean }) {
  return (
    <>
      <ambientLight intensity={0.15} />
      <directionalLight
        position={[8, 4, 6]}
        intensity={2.5}
        castShadow={shadows}
        shadow-mapSize={[1024, 1024]}
        color="#fff5e0"
      />
      <pointLight position={[-6, -2, -4]} intensity={0.3} color="#4466ff" />
    </>
  )
}

function CameraRig() {
  const sensitivity = useSettingsStore((s) => s.cameraSensitivity)
  return (
    <OrbitControls
      enablePan={false}
      minDistance={4}
      maxDistance={20}
      rotateSpeed={0.4 * sensitivity}
      zoomSpeed={0.6 * sensitivity}
      dampingFactor={0.05}
      enableDamping
    />
  )
}

function PostEffects({ enabled }: { enabled: boolean }) {
  if (!enabled) return null
  return (
    <EffectComposer>
      <Bloom intensity={0.4} luminanceThreshold={0.6} luminanceSmoothing={0.9} mipmapBlur />
    </EffectComposer>
  )
}

interface PlanetSceneProps {
  planet: Planet
}

function PlanetSceneInner({ planet }: PlanetSceneProps) {
  const quality = useSettingsStore((s) => s.graphicsQuality)
  const settings = getQualitySettings(quality)

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 1.5, 7]} fov={45} />
      <SceneLighting shadows={settings.shadows} />
      <Stars
        radius={100}
        depth={50}
        count={settings.stars}
        factor={4}
        saturation={0}
        fade
        speed={0.5}
      />
      <Suspense fallback={null}>
        <Environment preset="night" />
      </Suspense>
      <PlanetMesh planet={planet} segments={settings.segments} />
      <CameraRig />
      <PostEffects enabled={settings.bloom} />
    </>
  )
}

export default function PlanetScene({ planet }: PlanetSceneProps) {
  const quality = useSettingsStore((s) => s.graphicsQuality)
  const settings = getQualitySettings(quality)

  return (
    <Canvas
      shadows={settings.shadows}
      dpr={settings.dpr}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      style={{ width: '100%', height: '100%' }}
    >
      <color attach="background" args={['#020208']} />
      <fog attach="fog" args={['#020208', 15, 60]} />
      <Suspense fallback={null}>
        <PlanetSceneInner planet={planet} />
      </Suspense>
    </Canvas>
  )
}
