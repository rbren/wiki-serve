var chai = require('chai');

describe('Parse', function() {

  it('should throw "No wiki found" Error', function() {
    var options;
    chai.expect(function() {
      require('../../lib/parse.js')();
    }).to.throw("No wiki found");
  });
  it('should return default constants plus directory name', function() {
    var input = "tmp";
    var options = require('../../lib/parse.js')(input);
    var obj = require('../../lib/defaults.json');
    obj.directory = "tmp";
    chai.expect(options).to.eql(obj);
  });
  it('should return object as passed in', function() {

    var input = {
      "bootstrap": "bootstrap",
      "directory": "testdirectory",
      "marked": [{
        "gfm": true,
        "sanitize": true
      }]
    };
    var options = require('../../lib/parse.js')(input);
    chai.expect(options).to.eql(input);
  });
});
