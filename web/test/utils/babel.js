'use strict';

// --compilers jsx:babel-core/register compiles js files as well as jsx
// --require babel-register doesn't allow options (eg extensions) to be specified
// So we're left with this...
// Explicitely calling this function resets all extensions to old, then overrides in babel-register
// Only do the jsx/react translation, not es2015.
// Tests are run in node, so don't need to transpile.
require('babel-register')({
  presets   : ['react'],
  extensions: ['.jsx']
});
