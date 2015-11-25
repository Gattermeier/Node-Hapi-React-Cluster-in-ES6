'use strict';

// wrapper to enable es6 nice-a-nice in node app

require('babel-core/register')({
  presets: ['react', 'es2015', 'stage-1']
});

const app = require('./app.es6.js');
app();
