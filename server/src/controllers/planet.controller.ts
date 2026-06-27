import { Request, Response } from 'express'
import { PlanetService } from '../services/planet.service.js'

const planetService = new PlanetService()

export class PlanetController {
  getPlanets(req: Request, res: Response): void {
    try {
      const { limit, offset, sort } = req.query as Record<string, string>
      const planets = planetService.getAllPlanets()

      let result = [...planets]
      if (sort === 'desc') result.reverse()
      const offsetNum = Number(offset) || 0
      if (offset) result = result.slice(offsetNum)
      const limitNum = Number(limit) || result.length
      if (limit) result = result.slice(0, limitNum)

      res.json({
        success: true,
        data: result,
        pagination: {
          total: planets.length,
          limit: limitNum,
          offset: offsetNum,
        },
      })
    } catch {
      res.status(500).json({ success: false, error: 'Internal server error' })
    }
  }

  getPlanetById(req: Request, res: Response): void {
    try {
      const { id } = req.params
      if (typeof id !== 'string') {
        res.status(400).json({ success: false, error: 'Invalid planet id' })
        return
      }

      const planet = planetService.getPlanetById(id)
      if (!planet) {
        res.status(404).json({ success: false, error: `Planet "${id}" not found` })
        return
      }

      res.json({ success: true, data: planet })
    } catch {
      res.status(500).json({ success: false, error: 'Internal server error' })
    }
  }
}
