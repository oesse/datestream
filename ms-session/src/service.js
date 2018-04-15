import bodyParser from 'body-parser'
import express from 'express'
import Router from 'express-promise-router'
import { INTERNAL_SERVER_ERROR } from 'http-status-codes'
import { handleRequestError } from './error-handler'

import {
  newSessionEndpoint,
  joinSessionEndpoint,
  requestPlayEndpoint,
  requestPauseEndpoint,
  requestResetEndpoint,
} from './rest-endpoints'

export default () => {
  const service = express()
  service.use(bodyParser.json())

  const router = Router()

  router.post('/new-session', newSessionEndpoint)
  router.post('/join-session', joinSessionEndpoint)
  router.post('/request-play', requestPlayEndpoint)
  router.post('/request-pause', requestPauseEndpoint)
  router.post('/request-reset', requestResetEndpoint)

  service.use(router)
  service.use((err, req, res, next) => {
    res.sendStatus(INTERNAL_SERVER_ERROR)
    handleRequestError(req, err)
  })
  return service
}
