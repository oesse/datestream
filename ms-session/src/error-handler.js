import logger from './logger'

export function handleError(err) {
  logger.error(err)
  process.exit(-1)
}
