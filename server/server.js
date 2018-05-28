import express from "express";
import winston from "winston";
import expressWinston from "express-winston";
import bodyParser from "body-parser";
import path from "path";
import fs from "fs";

import fnd from "./fnd";
import cnn from "./sites/cnn";
import { find as findCorporation } from "./models/corporation";

const app = express();
const port = process.env.PORT || 5000;

const contentTypes = {
  ".ico": "image/x-icon",
  ".html": "text/html",
  ".js": "text/javascript",
  ".json": "application/json",
  ".css": "text/css",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".svg": "image/svg+xml"
};

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
app.use(bodyParser.json());

app.use("/public", express.static(path.join(__dirname, "public")));

app.get("/*", (req, res) => {
  const parsedUrl = url.parse(req.url);
  let pathname = parsedUrl.pathname;
  let ext = path.parse(pathname).ext;

  if (pathname === "/") {
    pathname = "/index.html";
    ext = ".html";
  }

  console.log("Pathname: ", pathname, " extention: ", ext);
  // whitelist file extensions .js and .html for now
  if (ext !== ".js" && ext !== ".html" && ext !== ".svg") {
    res.status(404).send(JSON.stringify({ error: "resource not found" }));
    return;
  }

  fs.open(pathname, "r", err => {
    // 404 if you cannot access the file
    // 404 if the file does not exist
    // 404 if the file is a directory
    if (
      err.code === "EACCES" ||
      err.code === "EEXIST" ||
      err.code === "EISDIR"
    ) {
      res.status(404).send(JSON.stringify({ error: "resource not found" }));
      return;
    }

    // whitelist files
    if (
      pathname === "/index.html" ||
      pathname === "/main.js" ||
      pathname === "/vendor.js" ||
      pathname.match(/.*\.svg/)
    ) {
      res.sendFile(path.join(__dirname, "../client/dist", pathname));
    } else {
      res.status(404).send(JSON.stringify({ error: "resource not found" }));
    }
  });
});

app.post("/api/articles", (req, res) => {
  const url = req.body.url;
  fnd(url, cnn)
    .then(result => {
      if (result.error) {
        res.statusCode = 500;
        return res.send(JSON.stringify({ error: result.error }));
      }

      const parsedURL = new URL(url);
      const corporation = findCorporation(parsedURL.origin);
      console.log(corporation);
      if (corporation) {
        result.corporation = corporation;
      }

      return res.send(JSON.stringify(result));
    })
    .catch(error => {
      res.statusCode = 500;
      console.log(error);
      return res.send(JSON.stringify({ error: error }));
    });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
