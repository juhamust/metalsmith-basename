# metalsmith-basename

A [Metalsmith](http://www.metalsmith.io/) plugin that adds the collection
files into metadata, making it available for example for [permalinks](https://github.com/segmentio/metalsmith-permalinks)

## Installation

```
npm i -D metalsmith-basename
```

## Usage

Example usage of plugin with others:

```shell
npm i -D metalsmith \
  gulp-load-plugins \
  metalsmith-collections \
  metalsmith-remarkable \
  metalsmith-permalinks \
  metalsmith-basename 
```

```javascript
var Metalsmith = require('metalsmith');
var loadPlugins = require('gulp-load-plugins');

// Using gulp plugin loader to load metalsmith plugins
var plugins = loadPlugins({
  pattern: ['metalsmith-*', 'metalsmith.*'],
  replaceString: /^metalsmith(-|\.)/,
});

new Metalsmith(__dirname)
  .use(plugins.collections({
    articles: {
      pattern: '**/*.md',
      sortBy: 'date',
      reverse: true
    }))
  .use(plugins.markdownRemarkable({
    html: true
  }))
  .use(plugins.basename())
  .use(plugins.permalinks({
    // Using basename as output path
    pattern: ':basename'
  }))
  .build(function(err) {
    if (err) {
      console.error(err);
    }
  });

```