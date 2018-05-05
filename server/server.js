import express from "express";
import winston from "winston";
import expressWinston from "express-winston";
import fnd from "./fnd";
import cnn from "./sites/cnn";

const app = express();
const port = process.env.PORT || 5000;

app.use(
  expressWinston.logger({
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
    ignoreRoute: function(req, res) {
      return false;
    }
  })
);

app.get("/api/hello", (req, res) => {
  // res.status(200);
  res.send({ express: "Hello From Express" });
});

app.post("/api/articles", (req, res) => {
  fnd(cnn)
    .then(result => {
      if (result.error) {
        res.statusCode = 500;
        return res.send(JSON.stringify({ error: error }));
      }

      return res.send(JSON.stringify(result));
    })
    .catch(error => {
      res.statusCode = 500;
      return res.send(JSON.stringify({ error: error }));
    });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
