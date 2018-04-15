import 'regenerator-runtime/runtime'
import { promisify } from 'bluebird'
import { handleError } from './error-handler'
import { initializeMongoose } from './mongo'
import service from './service'

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
  await promisify(app.listen)(port)
  console.log('started session service')
})()