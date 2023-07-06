const express = require('express');
const app = express();
const {
  responseTimeMiddleware,
} = require('./middlewares/responseTime.middleware');
const { morganMiddleware } = require('./middlewares/morgan.middleware');
const { helmetMiddleware } = require('./middlewares/helmet.middleware');

app.use(responseTimeMiddleware);
app.use(morganMiddleware);
app.use(helmetMiddleware,(req, res, next) => {
  // calling next middleware in the queue  
    next();
    })

app.get('/', function (req, res, next) {
  // ..
  res.send('jsdfssf');
});

app.listen(3000);