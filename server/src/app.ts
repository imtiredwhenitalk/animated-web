import express from 'express'
import cors from 'cors'
import { env } from './config/env.js'
import v1Routes from './routes/v1/index.js'
import { loggerMiddleware } from './middleware/logger.middleware.js'
import { visitTracker } from './middleware/visitTracker.middleware.js'
import { notFoundHandler } from './middleware/notFound.middleware.js'
import { errorHandler } from './middleware/errorHandler.middleware.js'
import { logger } from './utils/logger.js'

export function createApp() {
  const app = express()

  app.use(cors({
    origin: env.allowedOrigins,
    credentials: true,
  }))

  app.use(express.json())
  app.use(loggerMiddleware)
  app.use(visitTracker)

  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() })
  })

  app.use('/api/v1', v1Routes)

  app.use(notFoundHandler)
  app.use(errorHandler)

  return app
}

export function startServer() {
  const app = createApp()
  const PORT = env.PORT

  app.listen(PORT, () => {
    logger.info(`Server running on http://localhost:${PORT}`, { env: env.NODE_ENV })
  })

  return app
}
