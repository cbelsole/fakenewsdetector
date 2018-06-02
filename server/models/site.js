import yaml from "js-yaml";
import fs from "fs";
import path from "path";
import { forEach } from "lodash";

let sites = {};

try {
  const siteList = yaml.safeLoad(
    fs.readFileSync(path.join(__dirname, "../conf/sites.yaml"), "utf8")
  ).sites;
  forEach(siteList, (url, site) => (sites[site] = { url: url }));
  forEach(sites, (conf, site) => {
    const external = require(`../sites/${site}`).default;
    sites[site] = { ...conf, ...external };
  });
} catch (err) {
  throw `error loading site yaml: ${err}`;
}

export const find = origin => {
  let s;
  forEach(sites, site => {
    const parsedURL = new URL(site.url);
    if (parsedURL.origin === origin) {
      s = site;
    }
  });

  return s;
};

export default find;
