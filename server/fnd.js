const puppeteer = require("puppeteer");

export default async (url, site) => {
  const browser = await puppeteer.launch({
    headless: true /*, dumpio: true */
  });

  try {
    const page = await browser.newPage();
    page.on("console", msg => {
      console.log(msg.text());
    });

    await page.goto(url, { waitUntil: "networkidle2" });

    // Extract the results from the page.
    const links = await page
      .evaluate(site => {
        let anchors = [];
        // Use jQuery if you can since it supports more css selectors than
        // Chromium such as a:not(:has(span)) for money.cnn.com
        if (jQuery) {
          console.log("using jQuery");
          anchors = jQuery.find(site.articleSelector);
        } else {
          anchors = Array.from(document.querySelectorAll(site.articleSelector));
        }

        return anchors.reduce(
          (acc, anchor) => {
            // filter mailto links
            if (anchor.href.includes("mailto")) {
              return acc;
            }

            let url;
            try {
              url = new URL(anchor.href);
            } catch (error) {
              url = new URL("http://www.fake.com");
            }

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

    let authors = await page
      .evaluate(site => {
        if (!site.authorSelectors) {
          return "";
        }

        let element = document.querySelector(site.authorSelectors);
        if (element !== null) {
          return element.textContent;
        }

        return "";
      }, site)
      .catch(error => {
        console.error(error);

        return "";
      });

    authors = authors.split(/[Bb]y|,|and|\//).reduce((acc, author) => {
      let a = author.trim();
      if (a && a.toLowerCase() !== "cnn") {
        acc.push(author);
      }
      return acc;
    }, []);

    let title = await page
      .evaluate(site => {
        return document.querySelector(site.titleSelector).textContent;
      }, site)
      .catch(error => {
        console.error(error);
        return "title not found";
      });

    await browser.close();
    return { links, authors, title };
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
      authors: [],
      title: ""
    };
  }
};
