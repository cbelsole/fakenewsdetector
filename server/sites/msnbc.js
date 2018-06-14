export default {
  advertizer: [],
  ignore: ["instagram.com", "yahoo.com", "twitter.com", "facebook.com"],
  articleSelector: 'div[itemprop="articleBody"] p a',
  // this is likely not sustainable as the css is probably dynamic
  authorSelectors: [".author a"],
  titleSelector: '[itemprop="headline"]'
};
