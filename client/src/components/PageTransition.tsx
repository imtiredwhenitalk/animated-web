import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { useSettingsStore } from '../store/settingsStore'

interface PageTransitionProps {
  children: ReactNode
}

export default function PageTransition({ children }: PageTransitionProps) {
  const animationsEnabled = useSettingsStore((s) => s.animationsEnabled)

  if (!animationsEnabled) return <>{children}</>

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      style={{ width: '100%', height: '100%' }}
    >
      {children}
    </motion.div>
  )
}
