import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { GraphicsQuality, ThemeMode } from '@shared/types'

export interface SettingsState {
  theme: ThemeMode
  language: 'en' | 'uk'
  graphicsQuality: GraphicsQuality
  animationsEnabled: boolean
  backgroundVideoEnabled: boolean
  musicEnabled: boolean
  soundEffectsEnabled: boolean
  fpsCounterEnabled: boolean
  cameraSensitivity: number
  setTheme: (theme: ThemeMode) => void
  setLanguage: (language: 'en' | 'uk') => void
  setGraphicsQuality: (quality: GraphicsQuality) => void
  setAnimationsEnabled: (enabled: boolean) => void
  setBackgroundVideoEnabled: (enabled: boolean) => void
  setMusicEnabled: (enabled: boolean) => void
  setSoundEffectsEnabled: (enabled: boolean) => void
  setFpsCounterEnabled: (enabled: boolean) => void
  setCameraSensitivity: (value: number) => void
  resetSettings: () => void
}

const DEFAULTS = {
  theme: 'dark' as ThemeMode,
  language: 'en' as const,
  graphicsQuality: 'high' as GraphicsQuality,
  animationsEnabled: true,
  backgroundVideoEnabled: true,
  musicEnabled: false,
  soundEffectsEnabled: true,
  fpsCounterEnabled: false,
  cameraSensitivity: 1,
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      ...DEFAULTS,
      setTheme: (theme) => set({ theme }),
      setLanguage: (language) => set({ language }),
      setGraphicsQuality: (graphicsQuality) => set({ graphicsQuality }),
      setAnimationsEnabled: (animationsEnabled) => set({ animationsEnabled }),
      setBackgroundVideoEnabled: (backgroundVideoEnabled) => set({ backgroundVideoEnabled }),
      setMusicEnabled: (musicEnabled) => set({ musicEnabled }),
      setSoundEffectsEnabled: (soundEffectsEnabled) => set({ soundEffectsEnabled }),
      setFpsCounterEnabled: (fpsCounterEnabled) => set({ fpsCounterEnabled }),
      setCameraSensitivity: (cameraSensitivity) => set({ cameraSensitivity }),
      resetSettings: () => set(DEFAULTS),
    }),
    { name: 'cosmos-settings' },
  ),
)

export function getQualitySettings(quality: GraphicsQuality) {
  const map = {
    low: { dpr: 0.75, stars: 2000, bloom: false, shadows: false, segments: 24 },
    medium: { dpr: 1, stars: 4000, bloom: false, shadows: true, segments: 32 },
    high: {
      dpr: Math.min(window.devicePixelRatio, 1.5),
      stars: 6000,
      bloom: true,
      shadows: true,
      segments: 48,
    },
    ultra: {
      dpr: Math.min(window.devicePixelRatio, 2),
      stars: 8000,
      bloom: true,
      shadows: true,
      segments: 64,
    },
  }
  return map[quality]
}
