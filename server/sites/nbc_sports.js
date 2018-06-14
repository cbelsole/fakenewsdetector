export default {
  advertizer: [],
  ignore: ["instagram.com", "yahoo.com", "twitter.com", "facebook.com"],
  articleSelector: ".entry-content p > a:not(:has(b))",
  // this is likely not sustainable as the css is probably dynamic
  authorSelectors: [".author a"],
  titleSelector: ".entry-title"
};
