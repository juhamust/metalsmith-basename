var plugin = require('../lib');

describe("basename-plugin", function() {
  var metalMock;

  beforeEach(function() {
    // Create metalsmith mock
    metalMock = {
      _metadata: {
        collections: {
          articles: [{
            title: 'Test document 1',
            filename: 'pages/test-document.md'
          }, {
            title: 'Test document 2',
            filename: 'test document 2.md'
          }]
        }
      },
      metadata: function() {
        return metalMock._metadata;
      }
    };
  });

  it('adds document basename in metadata', function() {
    // Run the plugin against metalsmith mock
    plugin()(['file.md'], metalMock, function(){});
    // Verify outcome
    expect(metalMock.metadata().collections['articles'][0].basename).toBe('test-document');
    expect(metalMock.metadata().collections['articles'][1].basename).toBe('test-document-2');
  });

  it('filters', function() {
    // Run the plugin against metalsmith mock
    plugin(['**', '!**2.md'])(['file.md'], metalMock, function(){});
    // Verify outcome
    expect(metalMock.metadata().collections['articles'][0].basename).toBe('test-document');
    expect(metalMock.metadata().collections['articles'][1].basename).toBe(undefined);
  });
});