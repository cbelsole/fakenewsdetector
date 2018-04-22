const express = require('express'),
      winston = require('winston'),
      expressWinston = require('express-winston');

const app = express();
const port = process.env.PORT || 5000;

app.use(expressWinston.logger({
  transports: [
    new winston.transports.Console({
      json: true,
      colorize: true
    })
  ],
  meta: true,
  msg: "HTTP {{req.method}} {{req.url}}",
  expressFormat: true,
  colorize: false,
  ignoreRoute: function (req, res) { return false; }
}));

app.get('/api/hello', (req, res) => {
  // res.status(200);
  res.send({ express: 'Hello From Express' });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
