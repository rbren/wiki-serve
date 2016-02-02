var FS = require('fs');
var Marked = require('marked');
var MARKED_DEFAULTS = {
  gfm: true,
}

var Wiki = module.exports = function(opts) {
  var self = this;
  self.o = opts || {};
  if (typeof self.o === 'string') self.o = {directory: self.o};
  if (!self.o.directory) throw new Error("No wiki found");
  self.pages = {};

  self.o.marked = self.o.marked || MARKED_DEFAULTS;
  self.o.marked.gfm = true;
  Marked.setOptions(self.o.marked);

  FS.readdirSync(opts.directory).filter(function(file) {
    return file.indexOf('.md') === file.length - 3;
  }).map(function(file) {
    return {
      name: file.substring(0, file.length - 3),
      contents: FS.readFileSync(__dirname + '/' + file, 'utf8'),
    }
  }).forEach(function(page) {
    self.pages[page.name] = {
      markdown: page.contents,
      html: Marked(page.contents),
    }
  })

  Marked.setOptions(MARKED_DEFAULTS);
};

