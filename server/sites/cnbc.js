export default {
  advertizer: [],
  ignore: ["instagram.com", "yahoo.com", "twitter.com", "facebook.com"],
  articleSelector: 'div[itemprop="articleBody"] a',
  // this is likely not sustainable as the css is probably dynamic
  authorSelectors: ['div[itemprop="author"] a', 'div[itemprop="author"] span'],
  titleSelector: ".title"
};
