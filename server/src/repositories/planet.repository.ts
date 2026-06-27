import { PLANETS } from '../../../shared/planets.js'
import type { Planet } from '../../../shared/types.js'

export interface PlanetSummary {
  id: string
  name: string
  slug: string
  route: string
}

export class PlanetRepository {
  private readonly planets: Planet[] = PLANETS

  findAll(): PlanetSummary[] {
    return this.planets.map(({ id, name, slug, route }) => ({ id, name, slug, route }))
  }

  findById(id: string): Planet | null {
    return this.planets.find((p) => p.id === id || p.slug === id) ?? null
  }

  count(): number {
    return this.planets.length
  }
}
