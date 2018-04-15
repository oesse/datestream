import 'regenerator-runtime/runtime'
import { promisify } from 'bluebird'
import service from './service'

const port = process.env.SESSION_MS_PORT || 8080

;(async () => {
  const app = service()
  await promisify(app.listen)(port)
  console.log('started session service')
})()
