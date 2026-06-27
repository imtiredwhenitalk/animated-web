import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { SOLAR_PLANETS } from '@shared/planets'
import VideoBackground from '../components/VideoBackground'

export default function SolarSystemPage() {
  const { t } = useTranslation()

  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      <VideoBackground src="/assets/cosmos.mp4" overlayOpacity={0.55} />

      <div className="relative z-10 pt-28 px-6 lg:px-12 pb-16 min-h-screen">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl sm:text-6xl font-bold text-white tracking-tight">
            {t('solarSystem.title')}
          </h1>
          <p className="mt-4 text-lg text-gray-400">{t('solarSystem.subtitle')}</p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
          {SOLAR_PLANETS.map((planet, i) => (
            <motion.div
              key={planet.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <Link
                to={planet.route}
                className="group block p-5 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md hover:bg-white/10 hover:border-indigo-400/40 transition-all duration-300"
              >
                <div
                  className="w-10 h-10 rounded-full mb-3 mx-auto transition-transform duration-300 group-hover:scale-110"
                  style={{
                    background: `radial-gradient(circle at 35% 35%, ${planet.render.color}, ${planet.render.emissive})`,
                    boxShadow: `0 0 20px ${planet.render.color}66`,
                  }}
                />
                <h3 className="text-white font-semibold text-center text-sm tracking-wide">
                  {planet.name}
                </h3>
                <p className="text-gray-500 text-xs text-center mt-1">{planet.latinName}</p>
                <p className="text-indigo-400 text-xs text-center mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  {t('solarSystem.explore')} →
                </p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
