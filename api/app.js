import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import cors from 'cors'
import userRoutes from './routes/userRoutes.js'
import blogRoutes from './routes/blogRoutes.js'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const PORT = process.env.PORT
const DB_URL = `${process.env.MONGODB_URL}/${process.env.DB_NAME}`

app.use(bodyParser.json())
app.use(cors())

app.use('/users', userRoutes)
app.use('/blogs', blogRoutes)

mongoose.connect(DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

mongoose.connection.on('connected', () => {
  console.log('Connected to mongodb')
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
