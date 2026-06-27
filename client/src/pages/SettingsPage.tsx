import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useSettingsStore } from '../store/settingsStore'
import type { GraphicsQuality, ThemeMode } from '@shared/types'
import i18n from '../i18n'

const APP_VERSION = '1.0.0'
const GITHUB_URL = 'https://github.com'

function SettingRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between py-4 border-b border-white/5">
      <span className="text-gray-300 text-sm">{label}</span>
      {children}
    </div>
  )
}

function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className={`relative w-11 h-6 rounded-full transition-colors ${checked ? 'bg-indigo-600' : 'bg-gray-700'}`}
      role="switch"
      aria-checked={checked}
    >
      <span
        className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${checked ? 'translate-x-5' : ''}`}
      />
    </button>
  )
}

function SelectButton<T extends string>({
  value,
  options,
  onChange,
}: {
  value: T
  options: { value: T; label: string }[]
  onChange: (v: T) => void
}) {
  return (
    <div className="flex gap-1">
      {options.map((opt) => (
        <button
          key={opt.value}
          onClick={() => onChange(opt.value)}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
            value === opt.value
              ? 'bg-indigo-600 text-white'
              : 'bg-white/5 text-gray-400 hover:bg-white/10'
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  )
}

export default function SettingsPage() {
  const { t } = useTranslation()
  const store = useSettingsStore()

  useEffect(() => {
    i18n.changeLanguage(store.language)
  }, [store.language])

  useEffect(() => {
    const root = document.documentElement
    const theme =
      store.theme === 'auto'
        ? window.matchMedia('(prefers-color-scheme: dark)').matches
          ? 'dark'
          : 'light'
        : store.theme
    root.setAttribute('data-theme', theme)
    root.classList.toggle('dark', theme === 'dark')
  }, [store.theme])

  return (
    <div className="min-h-screen bg-[#020208] pt-24 px-6 pb-16">
      <div className="max-w-2xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-4xl font-bold text-white mb-2">{t('settings.title')}</h1>
          <div className="h-px bg-gradient-to-r from-indigo-500/50 to-transparent mb-8" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md"
        >
          <h2 className="text-indigo-400 text-xs font-semibold uppercase tracking-widest mb-4">
            {t('settings.localization')}
          </h2>
          <SettingRow label={t('settings.language')}>
            <SelectButton
              value={store.language}
              options={[
                { value: 'en', label: 'English' },
                { value: 'uk', label: 'Українська' },
              ]}
              onChange={store.setLanguage}
            />
          </SettingRow>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md mt-4"
        >
          <SettingRow label={t('settings.theme')}>
            <SelectButton<ThemeMode>
              value={store.theme}
              options={[
                { value: 'dark', label: t('settings.themeDark') },
                { value: 'light', label: t('settings.themeLight') },
                { value: 'auto', label: t('settings.themeAuto') },
              ]}
              onChange={store.setTheme}
            />
          </SettingRow>

          <SettingRow label={t('settings.graphicsQuality')}>
            <SelectButton<GraphicsQuality>
              value={store.graphicsQuality}
              options={[
                { value: 'low', label: t('settings.qualityLow') },
                { value: 'medium', label: t('settings.qualityMedium') },
                { value: 'high', label: t('settings.qualityHigh') },
                { value: 'ultra', label: t('settings.qualityUltra') },
              ]}
              onChange={store.setGraphicsQuality}
            />
          </SettingRow>

          <SettingRow label={t('settings.animations')}>
            <Toggle checked={store.animationsEnabled} onChange={store.setAnimationsEnabled} />
          </SettingRow>

          <SettingRow label={t('settings.backgroundVideo')}>
            <Toggle
              checked={store.backgroundVideoEnabled}
              onChange={store.setBackgroundVideoEnabled}
            />
          </SettingRow>

          <SettingRow label={t('settings.music')}>
            <Toggle checked={store.musicEnabled} onChange={store.setMusicEnabled} />
          </SettingRow>

          <SettingRow label={t('settings.soundEffects')}>
            <Toggle checked={store.soundEffectsEnabled} onChange={store.setSoundEffectsEnabled} />
          </SettingRow>

          <SettingRow label={t('settings.fpsCounter')}>
            <Toggle checked={store.fpsCounterEnabled} onChange={store.setFpsCounterEnabled} />
          </SettingRow>

          <SettingRow label={t('settings.cameraSensitivity')}>
            <input
              type="range"
              min={0.2}
              max={3}
              step={0.1}
              value={store.cameraSensitivity}
              onChange={(e) => store.setCameraSensitivity(parseFloat(e.target.value))}
              className="w-32 accent-indigo-500"
            />
          </SettingRow>

          <button
            onClick={store.resetSettings}
            className="mt-6 w-full py-2.5 rounded-xl border border-red-500/30 text-red-400 text-sm hover:bg-red-500/10 transition-colors"
          >
            {t('settings.resetSettings')}
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md mt-4"
        >
          <h2 className="text-indigo-400 text-xs font-semibold uppercase tracking-widest mb-4">
            {t('settings.about')}
          </h2>
          <SettingRow label={t('settings.version')}>
            <span className="text-gray-400 text-sm font-mono">{APP_VERSION}</span>
          </SettingRow>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white/5 border border-white/10 text-gray-300 text-sm hover:bg-white/10 transition-colors"
          >
            {t('settings.github')} →
          </a>
        </motion.div>
      </div>
    </div>
  )
}
