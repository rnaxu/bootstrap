const handlebars = require('handlebars');
const Metalsmith = require('metalsmith');
const layouts = require('metalsmith-layouts');
const watch = require('metalsmith-watch');

const TARGET = process.env.npm_lifecycle_event;

const BUILD_MAP = {
  'build:html': {
    watch: () => null
  },
  'dev:html': {
    watch: () => watch({
      "paths": {
        "${source}/**/*": true,
        "./src/hbs/layouts/**/*": "**/*",
        "./src/hbs/partials/**/*": "**/*"
      }
    })
  },
};

Metalsmith(__dirname)
  .source('./src/hbs/pages')
  .destination('./dist')
  .use(layouts({
    "engine": "handlebars",
    "directory": "./src/hbs/layouts",
    "partials": "./src/hbs/partials",
    "default": "default.hbs",
    "pattern": "**/*.hbs",
    "rename": true
  }))
  .use(BUILD_MAP[TARGET].watch())
  .build(function(err) {
    if (err) throw err;
  });
