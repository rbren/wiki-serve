var FS = require('fs');
var Marked = require('marked');
var MARKED_DEFAULTS = {
  gfm: true,
  sanitize: true,
}

var HTML_TEMPLATE = FS.readFileSync(__dirname + '/../views/wiki.html', 'utf8');
var PAGE_TEMPLATE = FS.readFileSync(__dirname + '/../views/page.html', 'utf8');

var Wiki = module.exports = function(opts) {
  var self = this;
  self.o = opts || {};
  if (typeof self.o === 'string') self.o = {directory: self.o};
  if (!self.o.directory) throw new Error("No wiki found");
  if (typeof self.o.bootstrap !== 'string' && self.o.bootstrap !== false) {
    self.o.bootstrap = "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css";
  }
  self.pages = {};

  self.o.marked = self.o.marked || MARKED_DEFAULTS;
  self.o.marked.gfm = true;
  Marked.setOptions(self.o.marked);

  FS.readdirSync(self.o.directory).filter(function(file) {
    return file.indexOf('.md') === file.length - 3;
  }).map(function(file) {
    var name = file.substring(0, file.length - 3);
    name = name.replace(/\-/g, ' ');
    return {
      name: name,
      contents: FS.readFileSync(self.o.directory + '/' + file, 'utf8'),
    }
  }).forEach(function(page) {
    self.pages[page.name] = {
      markdown: page.contents,
      html: Marked(page.contents),
    }
  })
  self.sidebar = self.pages._Sidebar;
  for (var name in self.pages) {
    if (name === '_Sidebar') continue;
    var page = self.pages[name];
    page.combined = HTML_TEMPLATE
        .replace(/<sidebar>/, self.sidebar.html)
        .replace(/<content>/, page.html)
        .replace(/<name>/, name);
    if (self.o.bootstrap) {
      page.combined = '<link rel="stylesheet" href="' + self.o.bootstrap + '">' + page.combined;
    }
    page.full = PAGE_TEMPLATE.replace(/<page>/, page.combined);
  }

  Marked.setOptions(MARKED_DEFAULTS);
};

