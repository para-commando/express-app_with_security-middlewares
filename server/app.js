const express = require('express');
const app = express();
const {
  responseTimeMiddleware,
} = require('./middlewares/responseTime.middleware');
const { morganMiddleware } = require('./middlewares/morgan.middleware');
const { helmetMiddleware } = require('./middlewares/helmet.middleware');
const { authenticateJsonWebToken } = require('./middlewares/jwt.middleware');
const { ddosMiddleware } = require('./middlewares/ddos.middleware');
const {
  expressRateLimiterMiddleware,
} = require('./middlewares/expressRateLimit.middleware');

app.use(responseTimeMiddleware);
app.use(ddosMiddleware.express, (req, res, next) => {
  // calling next middleware in the queue
  next();
});

app.use(morganMiddleware);
app.use(authenticateJsonWebToken);
app.use(helmetMiddleware, (req, res, next) => {
  // calling next middleware in the queue
  next();
});
// API specific Rate-limiting Middleware
app.use(
  '/myEndPoint',
  expressRateLimiterMiddleware({
    endpoint: 'myEndPoint',
    windowDurationInMinutes: 0.5, // 30 seconds
    requestLimit: 2, // Limit each IP to 2 requests per 30 seconds
    statusCode: 429, // HTTP status code for rate limit exceeded
    ErrorMessage: 'Too many requests from your IP. Please try again later.',
  }),
  (req, res, next) => {
    // calling next middleware in the queue
    next();
  }
);
app.get('/myEndPoint', function (req, res, next) {
  // ..
  res.send('This is my EndPoint');
});

app.listen(3000);
