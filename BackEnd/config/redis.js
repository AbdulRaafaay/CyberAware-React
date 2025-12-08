const redis = require('redis');
const logger = require('./logger');

let redisClient = null;

const connectRedis = async () => {
  try {
    // Create Redis client
    redisClient = redis.createClient({
      url: process.env.REDIS_URL || 'redis://localhost:6379',
      socket: {
        reconnectStrategy: (retries) => {
          if (retries > 10) {
            logger.warn('⚠️  Redis: Too many retries, stopping reconnection');
            return new Error('Redis connection failed');
          }
          return retries * 100; // Reconnect after retries * 100ms
        },
      },
    });

    // Error handling
    redisClient.on('error', (err) => {
      logger.error(`Redis Client Error: ${err.message}`);
    });

    redisClient.on('connect', () => {
      logger.info('Redis: Attempting connection...');
    });

    redisClient.on('ready', () => {
      logger.info('Redis: Connected and ready!');
    });

    redisClient.on('reconnecting', () => {
      logger.info('Redis: Reconnecting...');
    });

    redisClient.on('end', () => {
      logger.info('Redis: Connection closed');
    });

    // Connect to Redis
    await redisClient.connect();

    return redisClient;
  } catch (error) {
    logger.error(`Redis Connection Error: ${error.message}`);
    logger.info('Application will continue without Redis caching');
    return null;
  }
};

// Get Redis client instance
const getRedisClient = () => {
  return redisClient;
};

// Check if Redis is available
const isRedisAvailable = () => {
  return redisClient && redisClient.isOpen;
};

// Disconnect Redis
const disconnectRedis = async () => {
  if (redisClient && redisClient.isOpen) {
    await redisClient.quit();
    console.log('Redis: Disconnected');
  }
};

module.exports = {
  connectRedis,
  getRedisClient,
  isRedisAvailable,
  disconnectRedis,
};
