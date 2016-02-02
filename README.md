# wiki-serve
Turn any GitHub wiki into servable HTML

You can retrieve pages as Markdown, an HTML snippet, or a full HTML page.

## Demo
You can see this package in action [on DataFire](https://datafire.io/wiki)

## Usage
```bash
npm install --save wiki-serve
git add submodule https://github.com/$USER/$REPO.wiki.git
```

```js
var Wiki = require('wiki-serve');
var wiki = new Wiki(__dirname + '/$REPO.wiki');

var App = require('express');

App.get('/', function(req, res, next) {
  res.send(wiki.pages.Home.full);
})
App.get('/:page', function(req, res, next) {
  var page = wiki.pages[req.params.page];
  if (!page) return res.status(404).send("Not Found");
  res.send(page.full);
})
```

## Options
```js
var wiki = new Wiki({
  directory: __dirname, // The path to a directory containing .md files
  bootstrap: false,     // A URL to Bootstrap CSS. Set to false to not include Bootstrap.
  marked: {},           // Pass-through options for Marked: https://github.com/chjj/marked
})

console.log(wiki.pages.Home.markdown)      // Contents of Home.md, e.g. *Hello*, World!
console.log(wiki.pages.Home.html)          // <p><i>Hello</i>, World!</p>
console.log(wiki.sidebar.html)             // This is GitHub's special _Sidebar.md page
console.log(wiki.pages.Home.combined)      // HTML that combines both Home.md and _Sidebar.md
console.log(wiki.pages.Home.full)          // A full HTML page
```
