const puppeteer = require("puppeteer");

export default async (url, site) => {
  const browser = await puppeteer.launch({
    headless: true /*, dumpio: true */
  });

  const page = await browser.newPage().catch(error => {
    browser.close();
    return { error: error };
  });

  await page.goto(url, { waitUntil: "networkidle2" }).catch(error => {
    browser.close();
    return { error: error };
  });

  // Extract the results from the page.
  const links = await page
    .evaluate(site => {
      const anchors = Array.from(
        document.querySelectorAll(site.articleSelector)
      );

      return anchors.reduce(
        (acc, anchor) => {
          let url;
          try {
            url = new URL(anchor.href);
          } catch (error) {
            url = new URL("http://www.fake.com");
          }
          // acc.debug.push(url.protocol);

          if (
            url.hostname === "www.fake.com" ||
            url.protocol === "javascript:"
          ) {
            return acc;
          }

          for (let host of site.corp) {
            if (url.hostname.includes(host)) {
              acc.corps.push(url.href);
              return acc;
            }
          }

          for (let host of site.advertizer) {
            if (url.hostname.includes(host)) {
              acc.advertizes.push(url.href);
              return acc;
            }
          }

          for (let host of site.ignore) {
            if (url.hostname.includes(host)) {
              acc.ignored.push(url.href);
              return acc;
            }
          }

          acc.good.push(url.href);
          return acc;
        },
        {
          good: [],
          // debug: [],
          corps: [],
          advertizes: [],
          ignored: []
        }
      );
    }, site)
    .catch(error => {
      browser.close();
      return { error: error };
    });

  const author = await page
    .evaluate(
      site => document.querySelector(site.authorSelector).textContent,
      site
    )
    .catch(error => {
      browser.close();
      return { error: error };
    });
  links.author = author;

  await browser.close();
  return links;
};
