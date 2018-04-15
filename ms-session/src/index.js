import 'regenerator-runtime/runtime'
import { fromCallback } from 'bluebird'
import { handleError } from './error-handler'
import { initializeMongoose } from './mongo'
import service from './service'
import logger from './logger'

const port = process.env.SESSION_MS_PORT || 8080

process.on('unhandledRejection', (reason) => {
  throw reason
})

process.on('uncaughtException', (error) => {
  handleError(error)
})

;(async () => {
  await initializeMongoose()
  const app = service()
  await fromCallback(cb => app.listen(port, undefined, undefined, cb))
  logger.info('started session service')
})()
