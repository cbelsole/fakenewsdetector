const puppeteer = require("puppeteer");

export default async site => {
  const browser = await puppeteer.launch({
    headless: true /*, dumpio: true */
  });
  try {
    const page = await browser.newPage();
    console.log("created a new page");
    await page.goto(
      "https://www.cnn.com/2018/04/22/entertainment/avicii-death-foul-play-ruled-out/index.html",
      { waitUntil: "networkidle2" }
    );
    console.log("going to a new page ", site);
    // Extract the results from the page.
    const links = await page.evaluate(site => {
      const anchors = Array.from(
        document.querySelectorAll(site.articleSelector)
      );
      console.log("finding links");
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
          console.log("returning ", acc);
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
    }, site);

    await browser.close();
    return links;
  } catch (error) {
    await browser.close();
    return { error: error };
  }
};
