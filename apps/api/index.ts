/**
 * Express server setup and initialization.
 *
 * Features:
 * - Configures environment variables using `dotenv`.
 * - Sets up CORS to allow requests from the frontend.
 * - Includes a JSON body parser for handling API requests.
 * - Provides routes for root (`/`), testing (`/test`), and API endpoints (`/api`).
 * - Handles undefined routes with a 404 error using `NotFoundError`.
 * - Implements centralized error handling for custom and unexpected errors.
 * - Initializes the cat data at server startup.
 */
import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import cors from 'cors'
import catRoutes from './routes/catRoutes'
import { AppError, NotFoundError } from './utils/errors'
import initCats from './scripts/initCats'

const app = express()
const PORT = process.env.PORT || 3001

app.use(
  cors({
    origin: process.env.NEXT_PUBLIC_FRONTEND_URL || 'http://localhost:3000'
  })
)

app.use(express.json())

app.get('/', (req: express.Request, res: express.Response) => res.send('Express on Vercel'))

app.get('/test', (req: express.Request, res: express.Response) => {
  res.json({ message: 'API is working' })
})

app.use('/api', catRoutes)

app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
  next(new NotFoundError(`Route not found - ${req.originalUrl}`))
})

app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err)

  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      status: 'error',
      statusCode: err.statusCode,
      message: err.message
    })
  } else {
    res.status(500).json({
      status: 'error',
      statusCode: 500,
      message: 'An unexpected error occurred',
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    })
  }
})

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`)
  await initCats()
})
