import mongoose from 'mongoose'

const sessionSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  users: [String],
  status: String,
  statusRequestBy: { type: String, default: null },
  statusRequestAt: { type: Date, default: null },
})

export const Session = mongoose.model('Session', sessionSchema)
