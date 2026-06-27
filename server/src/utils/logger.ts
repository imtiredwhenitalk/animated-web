type LogLevel = 'debug' | 'info' | 'warn' | 'error'

const LEVELS: Record<LogLevel, number> = { debug: 0, info: 1, warn: 2, error: 3 }

class Logger {
  constructor(private level: LogLevel = 'info') {}

  private log(level: LogLevel, message: string, meta?: unknown) {
    if (LEVELS[level] < LEVELS[this.level]) return
    const entry = {
      timestamp: new Date().toISOString(),
      level,
      message,
      ...(meta !== undefined ? { meta } : {}),
    }
    const fn = level === 'error' ? console.error : level === 'warn' ? console.warn : console.log
    fn(JSON.stringify(entry))
  }

  debug(message: string, meta?: unknown) { this.log('debug', message, meta) }
  info(message: string, meta?: unknown) { this.log('info', message, meta) }
  warn(message: string, meta?: unknown) { this.log('warn', message, meta) }
  error(message: string, meta?: unknown) { this.log('error', message, meta) }
}

export const logger = new Logger(
  (process.env.LOG_LEVEL as LogLevel) ?? 'info',
)
