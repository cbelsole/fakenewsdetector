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
  articleSelector: 'div[itemprop="articleBody"] p a',
  // this is likely not sustainable as the css is probably dynamic
  authorSelectors: [".author a"]
};
