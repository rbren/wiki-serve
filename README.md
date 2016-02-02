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

App.get('/wiki', function(req, res, next) {
  res.send(wiki.pages.Home.full);
})
App.get('/wiki/:page', function(req, res, next) {
  var page = wiki.pages[req.params.page];
  if (!page) return res.status(404).send("Not Found");
  res.send(page.full);
})
```

