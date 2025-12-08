const morgan = require('morgan');
const logger = require('../config/logger');

// Custom Morgan format
const format = process.env.NODE_ENV === 'production'
  ? ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent" :response-time ms'
  : ':method :url :status :response-time ms - :res[content-length]';

// Create Morgan middleware with custom stream
const requestLogger = morgan(format, {
  stream: logger.stream,
  skip: (req, res) => {
    // Skip logging health check in production
    return process.env.NODE_ENV === 'production' && req.url === '/api/health';
  }
});

module.exports = requestLogger;
