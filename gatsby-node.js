'use strict';

require('source-map-support').install();
require('ts-node').register();

exports.onCreateWebpackConfig = require('./lib/onCreateWebpackConfig');
exports.onCreateNode = require('./lib/onCreateNode');
exports.createPages = require('./lib/createPages');
