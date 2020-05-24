echo $CI
yarn add chrome-aws-lambda
sed -i '' '1i\const chrome = require('chrome-aws-lambda');' /node_modules/gatsby-source-notion-database/src/getPageHtml.js
cat /node_modules/gatsby-source-notion-database/src/getPageHtml.js
