export default {
  advertizer: [],
  ignore: ["instagram.com", "yahoo.com", "twitter.com", "facebook.com"],
  articleSelector: ".body___vDyiy p a",
  // this is likely not sustainable as the css is probably dynamic
  authorSelectors: [".inlineAuthor___2FfYY"],
  titleSelector: ".headline___nhqI9",
  authorCleanup: function(author) {
    const re = /by (\w+( \w*))( and (\w+( \w*)))?/;
    let authors = re.exec(author);
    // remove nulls
    authors = authors.reduce((accum, author) => {
      if (author) {
        accum.push(author);
      }
      return accum;
    }, []);

    if (authors.length > 3) {
      return [authors[1], authors[4]];
    } else {
      return [authors[1]];
    }
  }
};
