import { useSettingsStore } from '../store/settingsStore'

interface VideoBackgroundProps {
  src: string
  overlayOpacity?: number
  className?: string
}

export default function VideoBackground({
  src,
  overlayOpacity = 0.5,
  className = '',
}: VideoBackgroundProps) {
  const enabled = useSettingsStore((s) => s.backgroundVideoEnabled)

  if (!enabled) {
    return <div className={`fixed inset-0 bg-[#020208] z-0 ${className}`} />
  }

  return (
    <>
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        className={`fixed inset-0 w-full h-full object-cover z-0 ${className}`}
      >
        <source src={src} type="video/mp4" />
      </video>
      <div
        className="fixed inset-0 z-[1]"
        style={{ background: `rgba(0,0,0,${overlayOpacity})` }}
      />
    </>
  )
}
