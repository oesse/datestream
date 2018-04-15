import { OK } from 'http-status-codes'
import { Session as DbSession } from '../models'
import Session from '../domain/session'

export default async (req, res) => {
  const { userId } = req.body

  const dbSession = new DbSession(new Session(userId).serialize())
  console.log(dbSession)
  // await dbSession.save()

  res.sendStatus(OK)
}
