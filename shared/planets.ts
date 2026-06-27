import type { Planet } from './types'

export const PLANETS: Planet[] = [
  {
    id: 'mercury',
    slug: 'mercury',
    name: 'Mercury',
    latinName: 'Mercurius',
    route: '/planets/mercury',
    title: 'The Swift Planet',
    description:
      'Mercury is the smallest planet in our Solar System and the closest to the Sun. Its surface is scarred by craters and experiences extreme temperature swings from -180°C to 430°C.',
    facts: ['Diameter: 4,879 km', 'Day length: 59 Earth days', 'No atmosphere'],
    render: {
      radius: 0.38,
      distance: 8,
      orbitSpeed: 0.047,
      axisSpeed: 0.003,
      tilt: 0.03,
      color: '#b5b5b5',
      emissive: '#2a2a2a',
    },
  },
  {
    id: 'venus',
    slug: 'venus',
    name: 'Venus',
    latinName: 'Venus',
    route: '/planets/venus',
    title: 'The Morning Star',
    description:
      'Venus is the hottest planet in our Solar System, shrouded in thick clouds of sulfuric acid. Its runaway greenhouse effect creates surface temperatures of 465°C.',
    facts: ['Diameter: 12,104 km', 'Retrograde rotation', 'Thick CO₂ atmosphere'],
    render: {
      radius: 0.95,
      distance: 13,
      orbitSpeed: 0.035,
      axisSpeed: -0.001,
      tilt: 177.4,
      color: '#e8cda0',
      emissive: '#3d2a00',
    },
  },
  {
    id: 'earth',
    slug: 'earth',
    name: 'Earth',
    latinName: 'Terra',
    route: '/planets/earth',
    title: 'Our Home',
    description:
      "Earth is the third planet from the Sun and the only astronomical object known to harbor life. About 29.2% of Earth's surface is land with remaining 70.8% covered with water.",
    facts: ['Diameter: 12,742 km', '1 natural satellite', 'Only known planet with life'],
    videoUrl: '/assets/earth2.mp4',
    render: {
      radius: 1.0,
      distance: 19,
      orbitSpeed: 0.029,
      axisSpeed: 0.02,
      tilt: 23.4,
      color: '#4fa3e0',
      emissive: '#001a33',
      hasAtmosphere: true,
      hasMoon: true,
    },
  },
  {
    id: 'mars',
    slug: 'mars',
    name: 'Mars',
    latinName: 'Mars',
    route: '/planets/mars',
    title: 'The Red Planet',
    description:
      'Mars is the fourth planet from the Sun, known for its reddish appearance due to iron oxide on its surface. It has the largest volcano and canyon in the Solar System.',
    facts: ['Diameter: 6,779 km', '2 moons: Phobos & Deimos', 'Average temp: -63°C'],
    render: {
      radius: 0.53,
      distance: 26,
      orbitSpeed: 0.024,
      axisSpeed: 0.019,
      tilt: 25.2,
      color: '#c1440e',
      emissive: '#2a0800',
    },
  },
  {
    id: 'jupiter',
    slug: 'jupiter',
    name: 'Jupiter',
    latinName: 'Iuppiter',
    route: '/planets/jupiter',
    title: 'King of Planets',
    description:
      'Jupiter is the largest planet in our Solar System, a gas giant with a Great Red Spot storm larger than Earth. It has at least 95 known moons.',
    facts: ['Diameter: 139,820 km', '95+ moons', 'Great Red Spot storm'],
    render: {
      radius: 2.5,
      distance: 40,
      orbitSpeed: 0.013,
      axisSpeed: 0.045,
      tilt: 3.1,
      color: '#c88b3a',
      emissive: '#1a0800',
      hasStripes: true,
    },
  },
  {
    id: 'saturn',
    slug: 'saturn',
    name: 'Saturn',
    latinName: 'Saturnus',
    route: '/planets/saturn',
    title: 'Lord of the Rings',
    description:
      'Saturn is famous for its spectacular ring system, composed of ice and rock particles. It is the second-largest planet and has 146 known moons.',
    facts: ['Diameter: 116,460 km', '146 moons', '687 km/h winds'],
    render: {
      radius: 2.1,
      distance: 55,
      orbitSpeed: 0.009,
      axisSpeed: 0.038,
      tilt: 26.7,
      color: '#e4d191',
      emissive: '#1a1500',
      hasRings: true,
    },
  },
  {
    id: 'uranus',
    slug: 'uranus',
    name: 'Uranus',
    latinName: 'Uranus',
    route: '/planets/uranus',
    title: 'The Sideways Planet',
    description:
      'Uranus is an ice giant that rotates on its side, likely due to a ancient collision. Its atmosphere contains methane, giving it a blue-green hue.',
    facts: ['Diameter: 50,724 km', 'Rotates at 97.8° tilt', 'Average temp: -224°C'],
    render: {
      radius: 1.6,
      distance: 68,
      orbitSpeed: 0.006,
      axisSpeed: 0.025,
      tilt: 97.8,
      color: '#7de8e8',
      emissive: '#002222',
      hasRings: true,
    },
  },
  {
    id: 'neptune',
    slug: 'neptune',
    name: 'Neptune',
    latinName: 'Neptunus',
    route: '/planets/neptune',
    title: 'The Windy Giant',
    description:
      'Neptune is the farthest known planet from the Sun, an ice giant with the strongest winds in the Solar System reaching 2,100 km/h.',
    facts: ['Diameter: 49,244 km', '14 known moons', '2100 km/h winds'],
    render: {
      radius: 1.55,
      distance: 80,
      orbitSpeed: 0.005,
      axisSpeed: 0.028,
      tilt: 28.3,
      color: '#3f54ba',
      emissive: '#000a2a',
    },
  },
  {
    id: 'moon',
    slug: 'moon',
    name: 'Moon',
    latinName: 'Luna',
    route: '/planets/moon',
    title: "Earth's Companion",
    description:
      "The Moon is Earth's only natural satellite, tidally locked so we always see the same face. It influences Earth's tides and has been visited by twelve astronauts.",
    facts: ['Diameter: 3,474 km', 'Gravity: 1/6 of Earth', '384,400 km from Earth'],
    videoUrl: '/assets/moon.mp4',
    render: {
      radius: 0.27,
      distance: 2.2,
      orbitSpeed: 0.05,
      axisSpeed: 0.01,
      tilt: 6.7,
      color: '#aaaaaa',
      emissive: '#111111',
    },
  },
]

export const SOLAR_PLANETS = PLANETS.filter((p) => p.id !== 'moon')

export function getPlanetBySlug(slug: string): Planet | undefined {
  return PLANETS.find((p) => p.slug === slug)
}

export function getPlanetByRoute(route: string): Planet | undefined {
  return PLANETS.find((p) => p.route === route)
}

export function getAdjacentPlanets(route: string): {
  current: Planet | null
  previous: Planet | null
  next: Planet | null
  index: number
} {
  const index = SOLAR_PLANETS.findIndex((p) => p.route === route)
  if (index === -1) {
    const moon = PLANETS.find((p) => p.route === route)
    return { current: moon ?? null, previous: null, next: null, index: -1 }
  }
  return {
    current: SOLAR_PLANETS[index] ?? null,
    previous: index > 0 ? (SOLAR_PLANETS[index - 1] ?? null) : null,
    next: index < SOLAR_PLANETS.length - 1 ? (SOLAR_PLANETS[index + 1] ?? null) : null,
    index,
  }
}

export function generatePlanetRoutes(): { path: string; slug: string }[] {
  return PLANETS.map((p) => ({ path: p.route, slug: p.slug }))
}
