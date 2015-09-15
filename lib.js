var path = require('path');
var _ = require('lodash');

module.exports = function(){
  return function basename(files, metalsmith, done) {
    var basename;
    var metadata = metalsmith.metadata();
    // Iterate over collections and
    // add file name without suffix into entry metadata: 'basename'
    _.each(metadata.collections || [], function(entries, key) {
      _.each(entries, function(entry, index) {
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
