const puppeteer = require("puppeteer");

export default async (url, site) => {
  const browser = await puppeteer.launch({
    headless: true /*, dumpio: true */
  });

  try {
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "networkidle2" });

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
        console.error(error);
        return {
          good: [],
          corps: [],
          advertizes: [],
          ignored: []
        };
      });

    const authors = await page
      .evaluate(site => {
        if (!site.authorSelectors) {
          return [];
        }

        // document.querySelector(site.authorSelector).textContent;
        let authors = site.authorSelectors.reduce((acc, selector) => {
          let element = document.querySelector(selector);
          if (element !== null) {
            const authorText = element.textContent;
            if (site.authorCleanup) {
              acc = acc.concat(acc, site.authorCleanup(authorText));
            } else {
              acc.push(authorText);
            }
          }
          return acc;
        }, []);
        // console.log("debug authorCleanup", site.authorCleanup(authors[0]));
        // return site.authorCleanup(authors[0]);
        return authors;
      }, site)
      .catch(error => {
        console.error(error);
        return [];
      });

    await browser.close();
    return { links, authors };
  } catch (error) {
    console.error(error);
    await browser.close();
    return {
      links: {
        good: [],
        corps: [],
        advertizes: [],
        ignored: []
      },
      authors: []
    };
  }
};
