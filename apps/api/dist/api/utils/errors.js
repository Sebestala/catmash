"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExternalApiError = exports.DatabaseError = exports.BadRequestError = exports.NotFoundError = exports.AppError = void 0;
class AppError extends Error {
    constructor(statusCode, message) {
        super(message);
        this.statusCode = statusCode;
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.AppError = AppError;
class NotFoundError extends AppError {
    constructor(message = 'Resource not found') {
        super(404, message);
    }
}
exports.NotFoundError = NotFoundError;
class BadRequestError extends AppError {
    constructor(message = 'Bad request') {
        super(400, message);
    }
}
exports.BadRequestError = BadRequestError;
class DatabaseError extends AppError {
    constructor(message = 'Database error') {
        super(500, message);
    }
}
exports.DatabaseError = DatabaseError;
class ExternalApiError extends AppError {
    constructor(message = 'External API error') {
        super(503, message);
    }
}
exports.ExternalApiError = ExternalApiError;
