var path = require('path');
var _ = require('lodash');
var multimatch = require('multimatch');

module.exports = function(matcher) {
  switch (typeof matcher) {
    case 'undefined':
      matcher = [];
      break;

    case 'string':
      matcher = [matcher];
      break;
  }

  console.log('matcher', matcher);

  return function basename(files, metalsmith, done) {
    var basename;
    var metadata = metalsmith.metadata();
    // Iterate over collections and
    // add file name without suffix into entry metadata: 'basename'
    _.each(metadata.collections || [], function(entries, key) {
      _.each(entries, function(entry, index) {
        console.log('entry.filename', entry.filename);
        // If matcher if given, use it - and skip if no matches
        console.log('out', multimatch([entry.filename], matcher));
        if (matcher.length > 0 && multimatch([entry.filename], matcher).length === 0) {
          return;
        }

        basename = path.basename(entry.filename);
        // Remove extension and replace spaces with dash
        basename = basename
          .replace(path.extname(basename), '')
          .replace(/\s/g, '-');
        metadata.collections[key][index]['basename'] = basename;
      });
    });
    done();
  };
};
