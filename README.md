# wiki-serve
Turn any [GitHub wiki](https://help.github.com/articles/about-github-wikis/) into servable HTML

You can retrieve pages as Markdown, an HTML snippet, or a full HTML page.
Pages can optionally include the sidebar navigation described in _Sidebar.md

This package also works on any flat directory of Markdown files.

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

If you don't want to deal with submodules, you can also add your wiki as an npm dependency
by adding a package.json at the root directory of your wiki's repo.

## Options
```js
var wiki = new Wiki({
  directory: __dirname, // The path to a directory containing .md files
  bootstrap: false,     // A URL to Bootstrap CSS. Set to false to not include Bootstrap.
  basePath: '/wiki',    // The base at which you're serving this wiki. Used in order to follow relative links.
  marked: {},           // Pass-through options for Marked: https://github.com/chjj/marked
})
```

## Output
You can retrieve pages as Markdown, an HTML snippet, or a full HTML page.

```
console.log(wiki.pages.Home.markdown)      // Contents of Home.md, e.g. *Hello*, World!
console.log(wiki.pages.Home.html)          // <p><i>Hello</i>, World!</p>
console.log(wiki.sidebar.html)             // This is GitHub's special _Sidebar.md page
console.log(wiki.pages.Home.combined)      // HTML that combines both Home.md and _Sidebar.md
console.log(wiki.pages.Home.full)          // A full HTML page
```

This allows you to render the wiki HTML inside your own templates (e.g. with your login bar at the top)

```js
App.get('/wiki/:page', function(req, res) {
  var page = wiki.pages[req.params.page];
  res.render('my_layout', {content: page.combined})
})
```

## Relative Links
GitHub wikis use relative links to link between pages of the wiki.
For instance, Home.md might contain the markdown
```markdown
Read more [here](Page2)
```

Where Page2.md is another page in the wiki.

If you're not serving the wiki on the root of your domain (e.g. you're serving it at mydomain.com/wiki),
you'll need to set the base tag of wiki pages accordingly (eg. &lt;base href="/wiki/"&gt;)

If you're using the `full` output option, it will suffice to set the `basePath` option, e.g. to `/wiki`

## Testing

Install all modules
```
npm install --all

```

Run the tests
```
grunt
```
