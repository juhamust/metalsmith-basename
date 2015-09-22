var path = require('path');
var _ = require('lodash');
var multimatch = require('multimatch');

function getBasename(filePath) {
  basename = path.basename(filePath);
  // Remove extension and replace spaces with dash
  basename = basename
    .replace(path.extname(basename), '')
    .replace(/\s/g, '-');

  return basename;
}

module.exports = function(opts) {
  opts = opts || {};

  // Handle optional parameters
  var log = opts.verbose === true ? console.log : function() {};
  if (opts.pattern) {
    opts.pattern = typeof opts.pattern === 'string' ? [opts.pattern] : opts.pattern;
  }

  return function basename(files, metalsmith, done) {
    _.each(files, function(data, filename) {

      // If matcher if given, use it - and skip if no matches
      if (opts.pattern && opts.pattern.length > 0 && multimatch([filename], opts.pattern).length === 0) {
        log('Skip:', filename);
        return;
      }
      log('Process:', filename);
      data['basename'] = getBasename(filename);
    });
    done();
  };
};
