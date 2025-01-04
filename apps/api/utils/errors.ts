export class AppError extends Error {
  constructor(
    public statusCode: number,
    message: string
  ) {
    super(message)
    this.name = this.constructor.name
    Error.captureStackTrace(this, this.constructor)
  }
}

export class NotFoundError extends AppError {
  constructor(message: string = 'Resource not found') {
    super(404, message)
  }
}

export class BadRequestError extends AppError {
  constructor(message: string = 'Bad request') {
    super(400, message)
  }
}

export class DatabaseError extends AppError {
  constructor(message: string = 'Database error') {
    super(500, message)
  }
}

export class ExternalApiError extends AppError {
  constructor(message: string = 'External API error') {
    super(503, message)
  }
}
