import { useEffect, useRef } from 'react'
import { useSettingsStore } from '../store/settingsStore'

export default function FPSCounter() {
  const enabled = useSettingsStore((s) => s.fpsCounterEnabled)
  const ref = useRef<HTMLDivElement>(null)
  const frames = useRef(0)
  const lastTime = useRef(0)

  useEffect(() => {
    if (!enabled) return
    lastTime.current = performance.now()

    let raf: number
    const tick = (now: number) => {
      frames.current++
      if (now - lastTime.current >= 1000) {
        if (ref.current) ref.current.textContent = `${frames.current} FPS`
        frames.current = 0
        lastTime.current = now
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [enabled])

  if (!enabled) return null

  return (
    <div
      ref={ref}
      style={{
        position: 'fixed',
        bottom: 16,
        right: 16,
        zIndex: 200,
        background: 'rgba(0,0,0,0.6)',
        padding: '4px 10px',
        borderRadius: 6,
        fontSize: 12,
        color: '#0f0',
        fontFamily: 'monospace',
        border: '1px solid rgba(0,255,0,0.2)',
      }}
    >
      60 FPS
    </div>
  )
}
