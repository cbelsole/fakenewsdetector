const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();

  await page.goto('https://www.cnn.com/2018/04/22/entertainment/avicii-death-foul-play-ruled-out/index.html', {waitUntil: 'networkidle2'});
  // Extract the results from the page.
  const links = await page.evaluate(resultsSelector => {
    const turner = ["cnn.com", "bleacherreport.com", "cnn.it", "cnnnewsource.com", "turner.com", "turnerjobs.com"];
    const advertizer = ["lendingtree.com", "truthfinder.com", "drmartypets.com", "privacy-protector.org", "icepop.com", "everquote.com", "aarp.org", "bankrate.com", "fool.com", "myfinance.com", "outbrain.com", "doubleclick.net", "clickntrax.com", "tinytrk.com", "trend-chaser.com", "rakuten.today", "energybillcruncher.com", "joinhoney.com"];
    const ignore = ["instagram.com", "yahoo.com", "twitter.com", "facebook.com"];
    const anchors = Array.from(document.querySelectorAll(resultsSelector));

    return anchors.reduce((acc, anchor) => {
      let url;
      try {
        url = new URL(anchor.href)
      } catch(error) {
        url = new URL("http://www.fake.com")
      }
      acc.debug.push(url.protocol)

      if (url.hostname === "www.fake.com" || url.protocol === "javascript:") {
        return acc;
      }

      for(let host of turner) {
        if (url.hostname.includes(host)) {
          acc.turners.push(url.href);
          return acc;
        }
      }

      for(let host of advertizer) {
        if (url.hostname.includes(host)) {
          acc.advertizes.push(url.href);
          return acc;
        }
      }

      for(let host of ignore) {
        if (url.hostname.includes(host)) {
          acc.ignored.push(url.href);
          return acc;
        }
      }

      acc.good.push(url.href)

      return acc;
    }, {
      good: [],
      debug: [],
      turners: [],
      advertizes: [],
      ignored: [],
    })
  }, "a");
  const json = JSON.stringify(links)
  console.log(json)
  // console.log("Good links")
  // console.log(links.good.join('\n'));
  // console.log("\n")

  // console.log("debug")
  // console.log(links.debug.join('\n'));
  // console.log("\n")

  // console.log("turners")
  // console.log(links.turners.join('\n'));
  // console.log("\n")

  // console.log("advertizer")
  // console.log(links.advertizes.join('\n'));
  // console.log("\n")

  // console.log("ignore")
  // console.log(links.ignored.join('\n'));
  // console.log("\n")

  await browser.close();
})();
