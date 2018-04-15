import express from 'express'

import {
  newSessionEndpoint,
  joinSessionEndpoint,
  requestPlayEndpoint,
  requestPauseEndpoint,
  requestResetEndpoint,
} from './rest-endpoints'

export default () => {
  const service = express()

  service.post('/new-session', newSessionEndpoint)
  service.post('/join-session', joinSessionEndpoint)
  service.post('/request-play', requestPlayEndpoint)
  service.post('/request-pause', requestPauseEndpoint)
  service.post('/request-reset', requestResetEndpoint)

  return service
}
