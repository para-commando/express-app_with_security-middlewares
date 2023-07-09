const rateLimit = require('express-rate-limit');
const RedisStore = require('rate-limit-redis');
const redisClient = require('../configurations/redis.configurations');

module.exports.expressRateLimiterMiddleware =  function expressRateLimiterMiddleware ({
    endpoint,
    windowDurationInMinutes,
    requestLimit,
    statusCode,
    ErrorMessage,
  }) {
  return rateLimit({
    windowMs: windowDurationInMinutes * 60 * 1000, // Convert minutes to milliseconds
    max: requestLimit, // Limit each IP to <requestLimit> requests per `window` (here, per 30 seconds)
    message: ErrorMessage,
    statusCode: statusCode,
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: true, // Disable the `X-RateLimit-*` header

    // Redis store configuration to store the client ip along with the number of hits made by it in the given time window specified above
    // example keyname is like =>  keyname::<ip> and value would be the number of hits made in the given time window  6
    store: new RedisStore({
      sendCommand: (...args) => {
        return redisClient.sendCommand(args);
      },
      prefix: `EndPoint::/${endpoint}_IP`,
    }),
  });
};
