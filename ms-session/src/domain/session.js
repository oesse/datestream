import generateId from '../generate-id'

export default class Session {
  static fromDb(dbEntry) {
    const session = new Session()
    session._id = dbEntry._id
    session._users = dbEntry.users
    session._isPlaying = dbEntry.status === 'playing'
    session._playRequest = dbEntry.statusRequestBy || {
      user: dbEntry.statusRequestBy,
      timestamp: dbEntry.statusRequestAt,
    }

    return session
  }
  constructor(initialUserId) {
    if (!initialUserId) { return }
    this._users = [initialUserId]
    this._id = generateId()
    this._isPlaying = false
  }

  users() { return this._users }
  id() { return this._id }
  isPlaying() { return this._isPlaying }
  hasToggleRequest() { return !!this._playRequest }

  joinSession(userId) {
    if (this._users.length > 1) { throw Error('at most 2 people are allowed in a session') }
    this._users.push(userId)
  }

  requestStatusToggle(userId) {
    this._playRequest = { user: userId, timestamp: Date.now() }
  }
  acceptStatusToggle(userId) {
    if (!this.hasToggleRequest()) { throw Error('user cannot accept when there is no request') }
    if (this._playRequest.user === userId) { throw Error('user cannot accept her own play request') }
    this._isPlaying = !this._isPlaying
    this._playRequest = undefined
  }

  serialize() {
    return {
      _id: this.id(),
      users: this.users(),
      status: this.isPlaying() ? 'playing' : 'paused',
      statusRequestBy: this._playRequest && this._playRequest.user,
      statusRequestAt: this._playRequest && this._playRequest.timestamp,
    }
  }
}
