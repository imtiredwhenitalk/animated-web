import { Router } from 'express'
import { PlanetController } from '../../controllers/planet.controller.js'
import { MetricsController } from '../../controllers/metrics.controller.js'
import { HealthController } from '../../controllers/health.controller.js'
import { validate, planetIdSchema, querySchema } from '../../middleware/validate.middleware.js'

const router = Router()
const planetController = new PlanetController()
const metricsController = new MetricsController()
const healthController = new HealthController()

router.get('/health', (req, res) => healthController.check(req, res))

router.get('/planets/metrics', (req, res) => metricsController.getMetrics(req, res))
router.delete('/planets/metrics/alerts', (req, res) => metricsController.clearAlerts(req, res))

router.get('/planets', validate(querySchema), (req, res) => planetController.getPlanets(req, res))
router.get('/planets/:id', validate(planetIdSchema), (req, res) => planetController.getPlanetById(req, res))

export default router
