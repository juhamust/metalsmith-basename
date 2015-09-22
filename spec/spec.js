'use strict';

require('harmonize')();
var fs = require('fs');
var path = require('path');
var Metalsmith = require('metalsmith');
var basename = require('../lib');

describe("basename-plugin", function() {
  var metalsmith;
  var tester = function(opts, done) {
    return function(files, metalsmith, callback) {
      expect(files[opts.file].basename).toBe(opts.expect);
      done();
    }
  };

  beforeEach(function() {
    metalsmith = Metalsmith(path.join(__dirname, 'fixtures/'));
  });

  it('adds document basename in metadata', function(done) {
    metalsmith
    .use(basename({
      verbose: false,
      pattern: ['**/*.txt']
    }))
    .use(tester({
      file: 'document name.txt',
      expect: 'document-name'
    }, done))
    .build(function(err) {
      if (err) throw err;
    });
  });

  it('uses pattern', function(done) {
    metalsmith
    .use(basename({
      verbose: false,
      pattern: ['**/*.md']
    }))
    .use(tester({
      file: 'document name.txt',
      expect: undefined
    }, done))
    .build(function(err) {
      if (err) throw err;
    });
  });
});
