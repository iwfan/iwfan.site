const fs = require('fs');
const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
  webpack: (config, { webpack }) => {
    config.plugins.push(new webpack.IgnorePlugin(/\/__tests__\//));
    config.plugins.push(new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'source/_posts/assets'),
          to: path.resolve(__dirname, 'public/post/assets'),
          cacheTransform: true
        },
      ],
    }))
    return config;
  },
  webpackDevMiddleware: (config) => {
    return config;
  }
}
