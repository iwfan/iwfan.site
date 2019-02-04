'use strict';

require('source-map-support').install();
require('ts-node').register();

exports.onCreateWebpackConfig = require('./src/lib/onCreateWebpackConfig');
exports.onCreateNode = require('./src/lib/onCreateNode');
exports.createPages = require('./src/lib/createPages');
