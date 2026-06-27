import { PlanetRepository } from '../repositories/planet.repository.js'
import type { Planet } from '../../../shared/types.js'
import type { PlanetSummary } from '../repositories/planet.repository.js'

export class PlanetService {
  constructor(private readonly repository = new PlanetRepository()) {}

  getAllPlanets(): PlanetSummary[] {
    return this.repository.findAll()
  }

  getPlanetById(id: string): Planet | null {
    return this.repository.findById(id)
  }

  getTotalCount(): number {
    return this.repository.count()
  }
}
