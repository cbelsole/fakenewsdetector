export default {
  corp: [
    "nbcnews.com",
    "cnbc.com",
    "msnbc.com",
    "nbcsports.com",
    "nbcboston.com"
  ],
  advertizer: [],
  ignore: ["instagram.com", "yahoo.com", "twitter.com", "facebook.com"],
  articleSelector: 'div[itemprop="articleBody"] a',
  // this is likely not sustainable as the css is probably dynamic
  authorSelectors: ['div[itemprop="author"] a', 'div[itemprop="author"] span'],
  authorCleanup: authorCleanup,
  titleSelector: ".title"
};

const authorCleanup = function(element) {
  remove = new RegExp(/^By (.*), CNN/);
  return author.replace(remove, "$1");
};
