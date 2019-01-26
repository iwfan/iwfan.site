'use strict';

require('source-map-support').install();
require('ts-node').register();
exports.onCreateWebpackConfig = require('./lib/onCreateWebpackConfig');
