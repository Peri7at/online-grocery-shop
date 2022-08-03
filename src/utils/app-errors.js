const STATUS_CODES = {
  OK: 200,
  BAD_REQUEST: 400,
  UN_AUTHORIZED: 401,
  NOT_FOUND: 404,
  INTERNAL_ERROR: 500,
};

class AppError extends Error {
  constructor(name, statusCode, description, isOperational, errorStack, loggingErrorResponse) {
    super(description);
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = name;
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.errorStack = errorStack;
    this.logError = loggingErrorResponse;
    Error.captureStackTrace(this);
  }
}

class APIError extends AppError {
  constructor(name, statusCode = STATUS_CODES.INTERNAL_ERROR, description = 'Internal Server Error', isOperational = true){
    super(name, statusCode, description, isOperational);
  }
}

class BadRequestError extends AppError {
  constructor(description = 'Bad Request', loggingErrorResponse) {
    super('NOT FOUND', STATUS_CODES.BAD_REQUEST, description, true, false, loggingErrorResponse);
  }
}

class ValidationError extends AppError {
  constructor(description = 'Validation Error', errorStack) {
    super('BAD REQUEST', STATUS_CODES.BAD_REQUEST, description,true, errorStack);
  }
}

module.exports = {
  AppError,
  APIError,
  BadRequestError,
  ValidationError,
  STATUS_CODES
}