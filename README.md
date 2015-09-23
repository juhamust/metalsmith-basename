# metalsmith-basename

A [Metalsmith](http://www.metalsmith.io/) plugin that adds file's basename as a metadate for the file, 
making it available for example for [permalinks](https://github.com/segmentio/metalsmith-permalinks) and helps
to generate files based on it.

```shell
npm i -D metalsmith-basename
```

```javascript
basename({
  pattern: ['**/*.html'],
  verbose: true
})
```

#### opts.pattern (array)

Process only selected documents. Example:
```javascript
basename({ 
  pattern: ['**/*', '!test-**.md'] 
})
```

#### opts.verbose (boolean)

Log the files that gets processed and skipped. Defaults to false.

## Example

Example usage of plugin with others.

Installation:
```sh
npm i -D metalsmith \
  harmonize \
  gulp-load-plugins \
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
// Harmonize is required with metalsmith when using node <= 0.12 
require('harmonize')();
var Metalsmith = require('metalsmith');
var loadPlugins = require('gulp-load-plugins');

// Using gulp plugin loader to load metalsmith plugins
var plugins = loadPlugins({
  pattern: ['metalsmith-*', 'metalsmith.*'],
  replaceString: /^metalsmith(-|\.)/,
});

new Metalsmith(__dirname)
  .use(plugins.markdownRemarkable({
    html: true
  }))
  .use(plugins.basename({
    pattern: ['**/*.html'],
    verbose: false
  }))
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
  my-document/index.html
  my-another-document/index.html
src/
  my-document.md
  my another document.md
package.json
```

## License

MIT licensed
