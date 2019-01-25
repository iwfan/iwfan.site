'use strict';
const path = require('path');
const resolve = dir => path.join(__dirname, dir);

exports.onCreateWebpackConfig = (
  { stage, actions, plugins, getConfig, rules },
  { rule: ruleProps = {} },
) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        '@': resolve('src'),
        '@svg': resolve('static/svg'),
      },
    },
  });
};
