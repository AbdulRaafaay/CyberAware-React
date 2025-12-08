const { getRedisClient, isRedisAvailable } = require('../config/redis');

/**
 * Cache middleware for GET requests
 * @param {number} duration - Cache duration in seconds (default: 300 = 5 minutes)
 */
const cache = (duration = 300) => {
  return async (req, res, next) => {
    // Only cache GET requests
    if (req.method !== 'GET') {
      return next();
    }

    // Skip caching if Redis is not available
    if (!isRedisAvailable()) {
      return next();
    }

    try {
      const redisClient = getRedisClient();
      
      // Generate cache key from URL and query parameters
      const key = `cache:${req.originalUrl || req.url}`;

      // Try to get cached data
      const cachedData = await redisClient.get(key);

      if (cachedData) {
        console.log(`Cache HIT: ${key}`);
        return res.json(JSON.parse(cachedData));
      }

      console.log(`Cache MISS: ${key}`);

      // Store original res.json function
      const originalJson = res.json.bind(res);

      // Override res.json to cache the response
      res.json = (data) => {
        // Cache the response
        redisClient
          .setEx(key, duration, JSON.stringify(data))
          .catch((err) => console.error('Redis cache set error:', err));

        // Send the response
        return originalJson(data);
      };

      next();
    } catch (error) {
      console.error('Cache middleware error:', error);
      // Continue without caching on error
      next();
    }
  };
};

/**
 * Clear cache by pattern
 * @param {string} pattern - Redis key pattern (e.g., 'cache:*')
 */
const clearCache = async (pattern) => {
  if (!isRedisAvailable()) {
    return;
  }

  try {
    const redisClient = getRedisClient();
    const keys = await redisClient.keys(pattern);

    if (keys.length > 0) {
      await redisClient.del(keys);
      console.log(`Cache cleared: ${keys.length} keys matching "${pattern}"`);
    }
  } catch (error) {
    console.error('Clear cache error:', error);
  }
};

/**
 * Clear all incident-related cache
 */
const clearIncidentCache = async () => {
  await clearCache('cache:/api/incidents*');
};

/**
 * Clear user-specific cache
 */
const clearUserCache = async (userId) => {
  await clearCache(`cache:/api/users/${userId}*`);
  await clearCache('cache:/api/users/dashboard*');
};

module.exports = {
  cache,
  clearCache,
  clearIncidentCache,
  clearUserCache,
};
