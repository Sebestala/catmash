import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import cors from 'cors'
import catRoutes from './routes/catRoutes'
import { AppError } from './utils/errors'

const app = express()
const PORT = process.env.PORT || 3002

app.use(
  cors({
    origin: 'http://localhost:3000'
  })
)

app.use(express.json())

app.use('/api', catRoutes)

app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({ error: err.message })
  } else {
    res.status(500).json({ error: 'An unexpected error occurred' })
  }
})

app.get('/', (req, res) => res.send('Express on Vercel'))

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
