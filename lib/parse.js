module.exports = function(options) {
  "use strict";
  let defaults = require('./defaults.json');

  let object = options || {};

  if (typeof object === 'string') {
    object = {
      directory: object
    };
  }
  if (!object.directory) {
    // do some sort of directory finding algorithm.

  }
  if (typeof object.bootstrap !== 'string' && object.bootstrap !== false) {
    object.bootstrap = defaults.bootstrap;
  }

  object.marked = object.marked || defaults.marked;
  //object.marked.gfm = true;

  return object;
}
