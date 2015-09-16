# metalsmith-basename

A [Metalsmith](http://www.metalsmith.io/) plugin that adds the collection
files into metadata, making it available for example for [permalinks](https://github.com/segmentio/metalsmith-permalinks)

## Installation

```
npm i -D metalsmith-basename
```

## Usage

`metalsmith-basename([matchers])`

Where matchers is optional, but makes it possible to process only selected documents. Example: `basename(['**', '!test-**.md'])`

## Example

Example usage of plugin with others.

Installation:
```sh
npm i -D metalsmith \
  harmonize \
  gulp-load-plugins \
  metalsmith-collections \
  metalsmith-markdown-remarkable \
  metalsmith-permalinks \
  metalsmith-basename 
```

Documents:
```sh
src/
  my-document.md
  my another document.md
package.json
```

Building:
```javascript
require('harmonize')();
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
      pattern: 'src/**/*.md',
      sortBy: 'date',
      reverse: true
    }}))
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

Output:
```sh
build/
  my-document.html
  my-another-document.md
src/
  my-document.md
  my another document.md
package.json
```

## License

MIT licensed