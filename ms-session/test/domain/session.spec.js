import { expect } from 'chai'

import Session from '../../src/domain/session'


describe('Session class', () => {
  it('can be constructed from an initial user', () => {
    const s = new Session('userId')
    expect(s.users()).to.eql(['userId'])
    expect(s.id()).to.be.a('string')
  })

  it('another user can join the session', () => {
    const s = new Session('firstUser')
    s.joinSession('secondUser')
    expect(s.users()).to.eql(['firstUser', 'secondUser'])
  })

  it('there can be at most 2 users in a session', () => {
    const s = new Session('firstUser')
    s.joinSession('secondUser')
    expect(() => s.joinSession('secondUser')).to.throw()
  })

  it('a user can request for the session to start playback', () => {
    const s = new Session('firstUser')
    s.joinSession('secondUser')

    s.requestStatusToggle('firstUser')
    expect(s.isPlaying()).to.equal(false)
  })

  it('the other user can accept the request for the session to start playback', () => {
    const s = new Session('firstUser')
    s.joinSession('secondUser')

    s.requestStatusToggle('firstUser')
    s.acceptStatusToggle('secondUser')
    expect(s.isPlaying()).to.equal(true)
  })

  it('a user can not accept play when there was no request', () => {
    const s = new Session('firstUser')
    s.joinSession('secondUser')

    expect(() => s.acceptStatusToggle('secondUser')).to.throw()
  })

  it('a user can not accept her own play request', () => {
    const s = new Session('firstUser')
    s.joinSession('secondUser')

    s.requestStatusToggle('firstUser')

    expect(() => s.acceptStatusToggle('firstUser')).to.throw()
  })

  it('request and accept can be used to toggle play status', () => {
    const s = new Session('firstUser')
    s.joinSession('secondUser')

    s.requestStatusToggle('secondUser')
    s.acceptStatusToggle('firstUser')

    s.requestStatusToggle('firstUser')
    s.acceptStatusToggle('secondUser')

    expect(s.isPlaying()).to.equal(false)
  })

  it('when request is accepted the requesting user is cleared', () => {
    const s = new Session('firstUser')
    s.joinSession('secondUser')

    s.requestStatusToggle('secondUser')
    s.acceptStatusToggle('firstUser')

    expect(s.hasToggleRequest()).to.equal(false)
  })

  it('can be serialized for database storage', () => {
    const s = new Session('firstUser')
    s.joinSession('secondUser')

    expect(s.serialize()).to.have.keys(
      '_id',
      'users',
      'status',
      'statusRequestBy',
      'statusRequestAt',
    )
  })

  it('can be deserialized from database storage', () => {
    const dbEntry = {
      _id: 'sessionId',
      users: ['user1', 'user2'],
      status: 'playing',
      statusRequestBy: 'user2',
      statusRequestAt: 1234567,
    }

    const s = Session.fromDb(dbEntry)
    expect(s.id()).to.equal('sessionId')
    expect(s.users()).to.eql(['user1', 'user2'])
    expect(s.isPlaying()).to.equal(true)
    expect(s.hasToggleRequest()).to.equal(true)
  })
})
