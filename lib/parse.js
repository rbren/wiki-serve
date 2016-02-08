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
    // TODO some sort of directory finding algorithm.
    // TODO Something else to note, even if a directory is passed, there may not be a wiki within the directory.
    throw new Error("No wiki found");
  }

  if (typeof object.bootstrap !== 'string' && object.bootstrap !== false) {
    object.bootstrap = defaults.bootstrap;
  }

  object.marked = object.marked || defaults.marked;

  return object;
}
