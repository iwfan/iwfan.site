const path = require('path');
const resolve: (dir: string) => string = dir => path.join(__dirname, '..', dir);
const onCreateWebpackConfig = (
  // @ts-ignore
  { stage, actions, plugins, getConfig, rules },
  // @ts-ignore
  { rule: ruleProps = {} },
) => {
  const isDevelop = stage === `develop` || stage === `develop-html`;
  const webpackConfig = {
    resolve: {
      alias: {
        '@': resolve('./'),
        '@svg': resolve('../static/svg'),
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

module.exports = onCreateWebpackConfig;
