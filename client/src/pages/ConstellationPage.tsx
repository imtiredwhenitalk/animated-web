import { Suspense, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Stars } from '@react-three/drei'
import * as THREE from 'three'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { CONSTELLATIONS } from '@shared/constellations'
import type { Constellation } from '@shared/types'
import { useSettingsStore, getQualitySettings } from '../store/settingsStore'

interface StarFieldProps {
  onHover: (c: Constellation | null) => void
  onSelect: (c: Constellation | null) => void
}

function ConstellationLines({
  constellation,
  hovered,
  selected,
}: {
  constellation: Constellation
  hovered: boolean
  selected: boolean
}) {
  const points = useMemo(() => {
    return constellation.lines.flatMap(([a, b]) => {
      const s = constellation.stars[a]
      const e = constellation.stars[b]
      return [new THREE.Vector3(s.x, s.y, s.z), new THREE.Vector3(e.x, e.y, e.z)]
    })
  }, [constellation])

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry().setFromPoints(points)
    return geo
  }, [points])

  const active = hovered || selected

  return (
    <lineSegments geometry={geometry}>
      <lineBasicMaterial
        color={active ? '#88aaff' : '#334466'}
        transparent
        opacity={active ? 0.9 : 0.35}
        linewidth={1}
      />
    </lineSegments>
  )
}

function ConstellationStars({
  constellation,
  onHover,
  onSelect,
  hoveredId,
  selectedId,
}: {
  constellation: Constellation
  onHover: (c: Constellation | null) => void
  onSelect: (c: Constellation | null) => void
  hoveredId: string | null
  selectedId: string | null
}) {
  const groupRef = useRef<THREE.Group>(null!)
  const active = hoveredId === constellation.id || selectedId === constellation.id

  useFrame((state) => {
    if (groupRef.current && active) {
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 3) * 0.15
      groupRef.current.scale.setScalar(pulse)
    } else if (groupRef.current) {
      groupRef.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1)
    }
  })

  return (
    <group ref={groupRef}>
      <ConstellationLines
        constellation={constellation}
        hovered={hoveredId === constellation.id}
        selected={selectedId === constellation.id}
      />
      {constellation.stars.map((star, i) => (
        <mesh
          key={i}
          position={[star.x, star.y, star.z]}
          onPointerOver={(e) => {
            e.stopPropagation()
            onHover(constellation)
          }}
          onPointerOut={() => onHover(null)}
          onClick={(e) => {
            e.stopPropagation()
            onSelect(constellation)
          }}
        >
          <sphereGeometry args={[0.08 + star.brightness * 0.06, 8, 8]} />
          <meshStandardMaterial
            color={active ? '#aaccff' : '#ffffff'}
            emissive={active ? '#4488ff' : '#222244'}
            emissiveIntensity={active ? 2 : 0.5}
          />
        </mesh>
      ))}
    </group>
  )
}

function SkyScene({
  onHover,
  onSelect,
  hoveredId,
  selectedId,
}: StarFieldProps & { hoveredId: string | null; selectedId: string | null }) {
  const quality = useSettingsStore((s) => s.graphicsQuality)
  const settings = getQualitySettings(quality)
  const sensitivity = useSettingsStore((s) => s.cameraSensitivity)
  const groupRef = useRef<THREE.Group>(null!)

  useFrame(() => {
    if (groupRef.current) groupRef.current.rotation.y += 0.0002
  })

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.1} />
      <Stars
        radius={80}
        depth={40}
        count={settings.stars}
        factor={3}
        saturation={0}
        fade
        speed={0.3}
      />
      {CONSTELLATIONS.map((c) => (
        <ConstellationStars
          key={c.id}
          constellation={c}
          onHover={onHover}
          onSelect={onSelect}
          hoveredId={hoveredId}
          selectedId={selectedId}
        />
      ))}
      <OrbitControls
        enablePan={false}
        minDistance={5}
        maxDistance={30}
        rotateSpeed={0.3 * sensitivity}
        enableDamping
        dampingFactor={0.05}
      />
    </group>
  )
}

export default function ConstellationPage() {
  const { t } = useTranslation()
  const [hovered, setHovered] = useState<Constellation | null>(null)
  const [selected, setSelected] = useState<Constellation | null>(null)
  const quality = useSettingsStore((s) => s.graphicsQuality)
  const settings = getQualitySettings(quality)

  const display = selected ?? hovered

  return (
    <div className="relative w-full h-screen bg-[#020208] overflow-hidden">
      <div className="absolute inset-0 z-0 pt-16">
        <Canvas dpr={settings.dpr} camera={{ position: [0, 0, 12], fov: 60 }}>
          <color attach="background" args={['#020208']} />
          <Suspense fallback={null}>
            <SkyScene
              onHover={setHovered}
              onSelect={(c) => setSelected(c?.id === selected?.id ? null : c)}
              hoveredId={hovered?.id ?? null}
              selectedId={selected?.id ?? null}
            />
          </Suspense>
        </Canvas>
      </div>

      <div className="relative z-10 pt-24 px-6 pointer-events-none">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
          <h1 className="text-4xl font-bold text-white">{t('constellation.title')}</h1>
          <p className="text-gray-500 text-sm mt-2">{t('constellation.subtitle')}</p>
        </motion.div>
      </div>

      <AnimatePresence>
        {display && (
          <motion.div
            key={display.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 w-full max-w-md px-4 pointer-events-none"
          >
            <div className="bg-black/80 backdrop-blur-xl border border-indigo-500/30 rounded-2xl p-6 shadow-2xl">
              <h2 className="text-2xl font-bold text-white">{display.name}</h2>
              <p className="text-indigo-400 text-sm mt-1">{display.latinName}</p>

              <div className="mt-4 space-y-2 text-sm">
                {display.zodiacSign && (
                  <div className="flex justify-between">
                    <span className="text-gray-500">{t('constellation.zodiacSign')}</span>
                    <span className="text-gray-300">{display.zodiacSign}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-gray-500">{t('constellation.distance')}</span>
                  <span className="text-gray-300">{display.distance}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">{t('constellation.visibilitySeason')}</span>
                  <span className="text-gray-300">{display.visibilitySeason}</span>
                </div>
                <div>
                  <span className="text-gray-500">{t('constellation.mainStars')}: </span>
                  <span className="text-gray-300">{display.mainStars.join(', ')}</span>
                </div>
              </div>

              <p className="mt-4 text-gray-400 text-sm leading-relaxed">{display.description}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-gray-600 text-xs tracking-widest uppercase pointer-events-none z-10">
        {t('constellation.hint')}
      </p>
    </div>
  )
}
