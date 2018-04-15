import express from 'express'
import { OK } from 'http-status-codes'

export default () => {
  const service = express()

  service.post('/new-session', (req, res) => res.sendStatus(OK))
  service.post('/join-session', (req, res) => res.sendStatus(OK))
  service.post('/request-play', (req, res) => res.sendStatus(OK))
  service.post('/request-pause', (req, res) => res.sendStatus(OK))
  service.post('/request-reset', (req, res) => res.sendStatus(OK))

  return service
}
