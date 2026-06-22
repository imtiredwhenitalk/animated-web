import { useState, useEffect } from 'react'

function Animated_Loader({ children }: { children: React.ReactNode }) {
  const [progress, setProgress] = useState(0)
  const [phase, setPhase] = useState<'loading' | 'fadeout' | 'done'>('loading')

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) { clearInterval(interval); return 100 }
        return prev + 1
      })
    }, 28)

    const timer = setTimeout(() => startExit(), 3000)

    return () => { clearInterval(interval); clearTimeout(timer) }
  }, [])

  useEffect(() => {
    const skip = (e: KeyboardEvent) => {
      if (phase === 'loading') startExit()
    }
    window.addEventListener('keydown', skip)
    return () => window.removeEventListener('keydown', skip)
  }, [phase])

  const startExit = () => {
    if (phase !== 'loading') return
    setPhase('fadeout')
    setTimeout(() => setPhase('done'), 1000)
  }

  return (
    <>
      {/* ── Головний сайт — ЗАВЖДИ в DOM, просто захований під лоадером ── */}
      <div className={`transition-all duration-1000 ease-in-out ${
        phase === 'loading'
          ? 'opacity-0 scale-[1.03] blur-sm pointer-events-none'
          : phase === 'fadeout'
          ? 'opacity-100 scale-100 blur-none'
          : 'opacity-100 scale-100 blur-none'
      }`}>
        {children}
      </div>

      {/* ── Лоадер — поверх сайту, зникає ── */}
      {phase !== 'done' && (
        <div
          className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center gap-8 bg-[#00000F] overflow-hidden transition-all duration-1000 ease-in-out ${
            phase === 'fadeout'
              ? 'opacity-0 scale-110 blur-md pointer-events-none'
              : 'opacity-100 scale-100 blur-none'
          }`}
        >
          {/* Зірки */}
          <Stars />

          {/* Земля */}
          <EarthScene />

          {/* Текст */}
          <div className="text-center z-10 relative">
            <h1 className="text-2xl font-bold tracking-[0.3em] text-white mb-2 uppercase">
              Exploring
              <span className="text-sky-400 animate-[dotpulse_1.4s_ease-in-out_infinite]">.</span>
              <span className="text-sky-400 animate-[dotpulse_1.4s_ease-in-out_0.2s_infinite]">.</span>
              <span className="text-sky-400 animate-[dotpulse_1.4s_ease-in-out_0.4s_infinite]">.</span>
            </h1>
            <p className="text-xs text-sky-200/60 tracking-[0.2em] uppercase">
              Preparing your experience
            </p>
          </div>

          {/* Прогрес */}
          <div className="flex items-center gap-3 z-10 relative">
            <div className="w-56 h-[3px] bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-600 to-sky-400 rounded-full transition-all duration-100 shadow-[0_0_8px_rgba(56,189,248,0.6)]"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-xs text-sky-300/60 min-w-[36px] font-mono">
              {progress}%
            </span>
          </div>

          {/* Skip */}
          <p className="absolute bottom-8 text-xs text-white/20 tracking-widest uppercase animate-pulse">
            Press any key to skip
          </p>
        </div>
      )}
    </>
  )
}

/* ── Зірки (3 шари через inline style бо Tailwind не генерує bg-image) ── */
function Stars() {
  return (
    <>
      <div
        className="absolute inset-0 animate-pulse"
        style={{
          backgroundImage: `
            radial-gradient(1px 1px at 20px 30px, white, transparent),
            radial-gradient(1px 1px at 80px 10px, white, transparent),
            radial-gradient(1px 1px at 140px 70px, white, transparent),
            radial-gradient(1px 1px at 60px 150px, white, transparent),
            radial-gradient(1px 1px at 170px 120px, white, transparent),
            radial-gradient(1px 1px at 10px 100px, white, transparent),
            radial-gradient(1px 1px at 100px 50px, white, transparent),
            radial-gradient(1px 1px at 190px 180px, white, transparent)
          `,
          backgroundSize: '200px 200px',
          opacity: 0.5,
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            radial-gradient(1px 1px at 50px 80px, #bae6fd, transparent),
            radial-gradient(1px 1px at 120px 40px, #bae6fd, transparent),
            radial-gradient(1px 1px at 30px 160px, #bae6fd, transparent),
            radial-gradient(1px 1px at 160px 90px, #bae6fd, transparent),
            radial-gradient(2px 2px at 90px 130px, white, transparent)
          `,
          backgroundSize: '300px 300px',
          opacity: 0.35,
        }}
      />
    </>
  )
}

/* ── Земля ── */
function EarthScene() {
  return (
    <div className="relative w-48 h-48 flex items-center justify-center z-10">
      {/* Свічення навколо */}
      <div className="absolute w-44 h-44 rounded-full bg-blue-500/10 blur-2xl animate-pulse" />

      {/* Сама планета */}
      <div
        className="relative w-36 h-36 rounded-full overflow-hidden shadow-[inset_-16px_-8px_32px_rgba(0,0,0,0.7),0_0_32px_rgba(96,165,250,0.25)]"
      >
        {/* Поверхня — крутиться */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: `
              radial-gradient(ellipse at 30% 40%, #1a6b3c 0%, transparent 35%),
              radial-gradient(ellipse at 65% 30%, #1a5c35 0%, transparent 28%),
              radial-gradient(ellipse at 50% 65%, #1d7a42 0%, transparent 30%),
              radial-gradient(ellipse at 80% 55%, #1a6b3c 0%, transparent 22%),
              linear-gradient(135deg, #1565c0 0%, #0d47a1 40%, #1976d2 70%, #0d47a1 100%)
            `,
            backgroundSize: '200% 200%',
            animation: 'surfaceMove 12s linear infinite',
          }}
        />

        {/* Хмари */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: `
              radial-gradient(ellipse at 20% 30%, rgba(255,255,255,0.55) 0%, transparent 22%),
              radial-gradient(ellipse at 70% 20%, rgba(255,255,255,0.35) 0%, transparent 18%),
              radial-gradient(ellipse at 50% 72%, rgba(255,255,255,0.28) 0%, transparent 16%),
              radial-gradient(ellipse at 85% 55%, rgba(255,255,255,0.45) 0%, transparent 20%)
            `,
            backgroundSize: '200% 200%',
            animation: 'cloudsMove 8s linear infinite',
          }}
        />

        {/* Відблиск */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: 'radial-gradient(ellipse at 35% 32%, rgba(255,255,255,0.13) 0%, transparent 55%)',
          }}
        />
      </div>

      {/* Орбіта з супутником */}
      <div
        className="absolute w-48 h-48 rounded-full border border-sky-400/15"
        style={{ animation: 'orbitSpin 4s linear infinite' }}
      >
        <div className="absolute -top-[5px] left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-sky-300 shadow-[0_0_8px_#7dd3fc]" />
      </div>
    </div>
  )
}

export default Animated_Loader