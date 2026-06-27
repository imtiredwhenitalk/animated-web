import { BrowserRouter, useLocation } from 'react-router-dom'
import { Suspense, useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import { I18nextProvider } from 'react-i18next'
import i18n from './i18n'
import Navbar from './components/Navbar'
import Loader from './components/Loader'
import FPSCounter from './components/FPSCounter'
import PageTransition from './components/PageTransition'
import AppRoutes from './routes'
import { useSettingsStore } from './store/settingsStore'
import './App.css'

function PageLoader({ children }: { children: React.ReactNode }) {
  const animationsEnabled = useSettingsStore((s) => s.animationsEnabled)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!animationsEnabled) return
    const timer = setTimeout(() => setLoading(false), 1500)
    return () => clearTimeout(timer)
  }, [animationsEnabled])

  if (!animationsEnabled) return <>{children}</>
  if (loading) return <Loader />
  return <>{children}</>
}

function AppContent() {
  const location = useLocation()
  const language = useSettingsStore((s) => s.language)

  useEffect(() => {
    i18n.changeLanguage(language)
  }, [language])

  return (
    <>
      <Navbar />
      <FPSCounter />
      <PageLoader key={location.pathname}>
        <AnimatePresence mode="wait">
          <PageTransition key={location.pathname}>
            <Suspense fallback={<Loader />}>
              <AppRoutes />
            </Suspense>
          </PageTransition>
        </AnimatePresence>
      </PageLoader>
    </>
  )
}

function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </I18nextProvider>
  )
}

export default App
