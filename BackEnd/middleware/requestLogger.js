const logger = require('../config/logger');

// Custom HTTP request logger middleware (Express 5.x compatible)
const requestLogger = (req, res, next) => {
  const start = Date.now();
  
  // Skip health check in production
  if (process.env.NODE_ENV === 'production' && req.url === '/api/health') {
    return next();
  }

  // Capture response
  res.on('finish', () => {
    const duration = Date.now() - start;
    const message = `${req.method} ${req.url} ${res.statusCode} ${duration}ms`;
    
    if (res.statusCode >= 400) {
      logger.error(message);
    } else {
      logger.info(message);
    }
  });

  next();
};

module.exports = requestLogger;
