import path from 'path';

const resolve: (dir: string) => string = (dir) => path.join(__dirname, `..`, dir);

const onCreateWebpackConfig = (
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  { stage, actions, plugins, getConfig, rules },
  { rule: ruleProps = {} },
) => {
  const isDevelop = stage === `develop` || stage === `develop-html`;
  const webpackConfig = {
    resolve: {
      alias: {
        '@': resolve(`./`),
      },
    },
  };

  if (isDevelop) {
    // adds sourcemaps for tsx in dev mode
    Object.assign(webpackConfig, {
      devtool: `eval-source-map`,
    });
  }

  actions.setWebpackConfig(webpackConfig);
};

module.exports = onCreateWebpackConfig;
