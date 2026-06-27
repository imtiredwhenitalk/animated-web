import { useState, useEffect, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import './Loader.css'

export default function Loader() {
  const { t } = useTranslation()
  const [progress, setProgress] = useState(0)
  const [visible, setVisible] = useState(true)

  const dismiss = useCallback(() => setVisible(false), [])

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(dismiss, 200)
          return 100
        }
        return prev + 2
      })
    }, 30)
    return () => clearInterval(interval)
  }, [dismiss])

  useEffect(() => {
    const skip = () => dismiss()
    window.addEventListener('keydown', skip)
    return () => window.removeEventListener('keydown', skip)
  }, [dismiss])

  if (!visible) return null

  return (
    <div className="fixed inset-0 z-[9999] overflow-hidden">
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/assets/cosmos.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black/60" />

      <div className="relative z-10 flex flex-col items-center justify-center h-full gap-8">
        <div style={{ width: 200, height: 200 }}>
          <video autoPlay muted loop playsInline className="w-full h-full object-contain">
            <source src="/assets/planet.webm" type="video/webm" />
            <source src="/assets/planet.mp4" type="video/mp4" />
          </video>
        </div>

        <div className="text-center">
          <p className="text-white/90 text-sm font-semibold tracking-[0.25em] uppercase mb-2">
            {t('loader.loading')}
          </p>
        </div>

        <div className="flex flex-col items-center gap-2">
          <div className="w-48 h-[2px] bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-indigo-600 to-indigo-300 rounded-full transition-all duration-100"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="text-white/30 text-[11px] font-mono">{progress}%</span>
        </div>
      </div>
    </div>
  )
}
