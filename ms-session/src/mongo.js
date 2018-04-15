import mongoose from 'mongoose'

const mongoUri = process.env.MONGO_URL || 'mongodb://localhost:27017/sessions'

export async function initializeMongoose() {
  await mongoose.connect(mongoUri)
}
