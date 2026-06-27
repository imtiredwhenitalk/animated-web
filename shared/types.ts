export type GraphicsQuality = 'low' | 'medium' | 'high' | 'ultra'
export type ThemeMode = 'dark' | 'light' | 'auto'

export interface PlanetRenderConfig {
  radius: number
  distance: number
  orbitSpeed: number
  axisSpeed: number
  tilt: number
  color: string
  emissive: string
  hasRings?: boolean
  hasAtmosphere?: boolean
  hasStripes?: boolean
  hasMoon?: boolean
}

export interface Planet {
  id: string
  slug: string
  name: string
  latinName: string
  route: string
  title: string
  description: string
  facts: string[]
  videoUrl?: string
  render: PlanetRenderConfig
}

export interface Constellation {
  id: string
  name: string
  latinName: string
  zodiacSign?: string
  description: string
  distance: string
  mainStars: string[]
  visibilitySeason: string
  stars: { x: number; y: number; z: number; brightness: number }[]
  lines: [number, number][]
}

export interface NavItem {
  name: string
  route: string
  type: 'page' | 'planet'
}
