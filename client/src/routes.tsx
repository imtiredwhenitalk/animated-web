import { lazy } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

const SolarSystemPage = lazy(() => import('./pages/SolarSystemPage'))
const PlanetPage = lazy(() => import('./pages/PlanetPage'))
const ConstellationPage = lazy(() => import('./pages/ConstellationPage'))
const SettingsPage = lazy(() => import('./pages/SettingsPage'))

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/solar-system" replace />} />
      <Route path="/solar-system" element={<SolarSystemPage />} />
      <Route path="/constellation" element={<ConstellationPage />} />
      <Route path="/settings" element={<SettingsPage />} />
      <Route path="/planets/:slug" element={<PlanetPage />} />
      <Route path="*" element={<Navigate to="/solar-system" replace />} />
    </Routes>
  )
}
