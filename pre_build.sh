echo "yarn add chrome-aws-lambda"
yarn add chrome-aws-lambda
head -n 10 /node_modules/gatsby-source-notion-database/src/getPageHtml.js
sed -i '' '1i\const chrome = require('chrome-aws-lambda');' /node_modules/gatsby-source-notion-database/src/getPageHtml.js
head -n 10 /node_modules/gatsby-source-notion-database/src/getPageHtml.js
