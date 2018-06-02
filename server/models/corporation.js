import yaml from "js-yaml";
import fs from "fs";
import path from "path";
import { forEach } from "lodash";

let corporations;

try {
  corporations = yaml.safeLoad(
    fs.readFileSync(path.join(__dirname, "../conf/corporations.yaml"), "utf8")
  ).corporations;
} catch (err) {
  throw `error loading corporation yaml: ${err}`;
}

export const find = origin => {
  let c;

  forEach(corporations, corporation => {
    forEach(corporation.sites, (url, site) => {
      const parsedURL = new URL(url);
      if (parsedURL.origin === origin) {
        c = corporation;
      }
    });
  });

  return c;
};

export default find;
