// Centralized error handler
// Normalizes common Mongoose/JWT/validation errors into consistent responses.
const logger = require('../config/logger');

const formatValidationErrors = (err) => {
  const errors = Object.values(err.errors || {}).map((e) => e.message);
  return { statusCode: 400, message: 'Validation error', errors };
};

const formatDuplicateKeyError = (err) => {
  const fields = Object.keys(err.keyValue || {});
  const message = `Duplicate value for field(s): ${fields.join(', ')}`;
  return { statusCode: 400, message };
};

const formatCastError = (err) => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return { statusCode: 400, message };
};

const formatJwtError = () => ({ statusCode: 401, message: 'Invalid token. Please log in again.' });
const formatJwtExpiredError = () => ({ statusCode: 401, message: 'Token expired. Please log in again.' });

const errorHandler = (err, req, res, next) => {
  // Log error details
  logger.error(`${err.message}`, {
    method: req.method,
    url: req.originalUrl,
    ip: req.ip,
    user: req.user?.id || 'unauthenticated',
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });

  // Default response
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Internal Server Error';
  let errors;

  // Joi validation errors (from validate middleware)
  if (err.isJoi) {
    statusCode = 400;
    errors = err.details?.map((d) => d.message) || [message];
    message = 'Validation error';
  }

  // Mongoose-specific errors
  if (err.name === 'ValidationError') {
    ({ statusCode, message, errors } = formatValidationErrors(err));
  }

  if (err.code === 11000) {
    ({ statusCode, message } = formatDuplicateKeyError(err));
  }

  if (err.name === 'CastError') {
    ({ statusCode, message } = formatCastError(err));
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    ({ statusCode, message } = formatJwtError());
  }

  if (err.name === 'TokenExpiredError') {
    ({ statusCode, message } = formatJwtExpiredError());
  }

  // Multer file upload errors
  if (err.code === 'LIMIT_FILE_SIZE') {
    statusCode = 400;
    message = 'File too large';
  }

  res.status(statusCode).json({
    success: false,
    message,
    ...(errors ? { errors } : {}),
    ...(process.env.NODE_ENV !== 'production' ? { stack: err.stack } : {}),
  });
};

module.exports = errorHandler;

