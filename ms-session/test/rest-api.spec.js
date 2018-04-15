import request from 'supertest'
import { OK } from 'http-status-codes'

import service from '../src/service'

describe('session MS - REST API', () => {
  describe('POST /new-session', () => {
    it('responds with OK', async () => {
      await request(service())
        .post('/new-session')
        .send({ userId: 'userId' })
        .expect(OK)
    })
  })

  describe('POST /join-session', () => {
    it('responds with OK', async () => {
      await request(service())
        .post('/join-session')
        .expect(OK)
    })
  })

  describe('POST /request-play', () => {
    it('responds with OK', async () => {
      await request(service())
        .post('/request-play')
        .expect(OK)
    })
  })

  describe('POST /request-pause', () => {
    it('responds with OK', async () => {
      await request(service())
        .post('/request-pause')
        .expect(OK)
    })
  })

  describe('POST /request-reset', () => {
    it('responds with OK', async () => {
      await request(service())
        .post('/request-reset')
        .expect(OK)
    })
  })
})
