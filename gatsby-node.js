'use strict';
const path = require('path');
const resolve = dir => path.join(__dirname, dir);

exports.onCreateWebpackConfig = (
  { stage, actions, plugins, getConfig, rules },
  { rule: ruleProps = {} },
) => {
  const isDevelop = stage === `develop` || stage === `develop-html`;

  const webpackConfig = {
    resolve: {
      alias: {
        '@': resolve('src'),
        '@svg': resolve('static/svg'),
      },
    },
  };

  if (isDevelop) {
    // adds sourcemaps for tsx in dev mode
    Object.assign(webpackConfig, {
      devtool: 'eval-source-map',
    });
  }

  actions.setWebpackConfig(webpackConfig);
};
