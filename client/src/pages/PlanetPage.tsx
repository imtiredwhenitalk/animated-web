import { lazy, Suspense } from 'react'
import { useParams, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { getPlanetBySlug } from '@shared/planets'
import { useSettingsStore } from '../store/settingsStore'
import VideoBackground from '../components/VideoBackground'

const PlanetScene = lazy(() => import('../components/three/PlanetScene'))

export default function PlanetPage() {
  const { slug } = useParams<{ slug: string }>()
  const { t } = useTranslation()
  const planet = slug ? getPlanetBySlug(slug) : undefined
  const videoEnabled = useSettingsStore((s) => s.backgroundVideoEnabled)

  if (!planet) return <Navigate to="/planets/mercury" replace />

  const showVideo = planet.videoUrl && videoEnabled

  return (
    <div className="relative w-full min-h-screen bg-black overflow-hidden">
      {showVideo ? (
        <VideoBackground src={planet.videoUrl!} overlayOpacity={0.45} />
      ) : (
        <div className="fixed inset-0 z-0">
          <Suspense fallback={<div className="w-full h-full bg-[#020208]" />}>
            <PlanetScene planet={planet} />
          </Suspense>
        </div>
      )}

      <div className="relative z-10 pt-24 px-6 lg:px-12 min-h-screen flex items-center pointer-events-none">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-xl lg:max-w-2xl pointer-events-auto"
        >
          <p className="text-indigo-400 text-sm font-medium tracking-widest uppercase mb-2">
            {planet.latinName}
          </p>
          <h1 className="text-5xl font-semibold tracking-tight text-white sm:text-7xl leading-tight">
            {planet.title}
          </h1>
          <p className="mt-6 text-lg text-gray-300 sm:text-xl leading-relaxed">
            {planet.description}
          </p>

          <div className="mt-8">
            <h3 className="text-sm font-semibold text-indigo-300 uppercase tracking-wider mb-3">
              {t('planet.facts')}
            </h3>
            <ul className="space-y-2">
              {planet.facts.map((fact) => (
                <li key={fact} className="flex items-center gap-2 text-gray-400 text-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 flex-shrink-0" />
                  {fact}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
