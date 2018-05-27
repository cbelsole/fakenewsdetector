# Fake News Detector

This project aims to be non-partisan and fair in it's access to data and methodology. It aims to judge an article on quality by looking at factors such as:
- Who wrote the article?
- Who published the article?
- What are the political leanings of the author/publisher?
- Are the sources for the article internal or external?
- What external sources are saying about the issue the article on?

Eventually, it will score articles on their sources to and provide some context on why it made the decision.

## Supported Sites

- [CNN](https://www.cnn.com/)

## Unsupported Sites (PRs wanted)

- [Fox News](http://www.foxnews.com/)
- [MSNBC](http://www.msnbc.com/)
- [Breitbart](http://www.breitbart.com/)
- [NBC News](https://www.nbcnews.com/)
- [New York Times](https://www.nytimes.com/)
- [Washington Post](https://www.washingtonpost.com/)
- [Huffington Post](https://www.huffingtonpost.com/)
- [Buzzfeed](https://www.buzzfeed.com/)
- [The Guardian](https://www.theguardian.com/us)
- [Daily Beast](https://www.thedailybeast.com/)
- [The Hill](http://thehill.com/)
- [Blaze](https://www.theblaze.com/)
- [Slate](https://slate.com/)
- [Bloomberg](https://www.bloomberg.com/)
- etc.

## How do I add a site?

Sites are kept in [server/sites](https://github.com/cbelsole/fakenewsdetector/tree/master/server/sites) as a flat file for configuration for now.

```json
{
  "corp": [], // hostnames of corporate affiliated sites
  "advertizer": [], // hostnames of advertizers to filter out of results
  "ignore": [], // ignored hostnames
  "articleSelector": "css selector", // css selector to find the article text
  "authorSelector": "css selector" // css selector to find the author of the article
}
```

## Start the dev server

```
# this will take a while because it needs to download headless chrome
yarn install && cd client && yarn install && cd ..
yarn run dev
```

## How do I contribute?

1. Clone the repo.
2. Start the dev server and make sure everything is working.
3. Once your changes are done please submit a PR with a title and description describing the feature/enhancement you want to add.
