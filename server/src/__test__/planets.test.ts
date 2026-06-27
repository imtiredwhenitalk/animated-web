import { describe, it, expect, vi } from 'vitest'
import request from 'supertest'
import { createApp } from '../app.js'

const mockPlanets = vi.hoisted(() => [
  { id: 'earth', name: 'Earth', slug: 'earth', route: '/planets/earth' },
  { id: 'jupiter', name: 'Jupiter', slug: 'jupiter', route: '/planets/jupiter' },
])

vi.mock('../services/planet.service.js', () => ({
  PlanetService: vi.fn(function (this: Record<string, unknown>) {
    this.getAllPlanets = vi.fn().mockReturnValue(mockPlanets)
    this.getPlanetById = vi.fn((id: string) =>
      mockPlanets.find((p) => p.id === id) || null,
    )
  }),
}))

vi.mock('../services/analytics.service.js', () => ({
  analytics: {
    logRequest: vi.fn(),
    getStats: vi.fn().mockReturnValue({}),
  },
}))

const app = createApp()

describe('GET /api/v1/planets', () => {
  it('returns planet list with 200', async () => {
    const res = await request(app).get('/api/v1/planets')
    expect(res.status).toBe(200)
    expect(res.body.success).toBe(true)
    expect(res.body.data).toHaveLength(2)
  })

  it('supports limit query', async () => {
    const res = await request(app).get('/api/v1/planets?limit=1')
    expect(res.body.data).toHaveLength(1)
  })
})

describe('GET /api/v1/planets/:id', () => {
  it('returns planet by id', async () => {
    const res = await request(app).get('/api/v1/planets/earth')
    expect(res.status).toBe(200)
    expect(res.body.data).toMatchObject({ id: 'earth', name: 'Earth' })
  })

  it('returns 404 for unknown planet', async () => {
    const res = await request(app).get('/api/v1/planets/pluto')
    expect(res.status).toBe(404)
  })
})

describe('GET /api/health', () => {
  it('returns ok status', async () => {
    const res = await request(app).get('/api/health')
    expect(res.status).toBe(200)
    expect(res.body.status).toBe('ok')
  })
})
