echo "yarn add chrome-aws-lambda"
yarn add chrome-aws-lambda@~2.0.1 puppeteer-core@~2.0.0
echo "before \n\n"
sed -i "/catch (error)/a console.warn(error);" ./node_modules/gatsby-source-notion-database/src/genApiData.js
head -n 10 ./node_modules/gatsby-source-notion-database/src/getPageHtml.js
sed -i "1i\const chrome = require('chrome-aws-lambda');" ./node_modules/gatsby-source-notion-database/src/getPageHtml.js
echo "after1 \n\n"
head -n 10 ./node_modules/gatsby-source-notion-database/src/getPageHtml.js
sed -i 's/puppeteer.launch();/puppeteer.launch({args: chrome.args,executablePath: await chrome.executablePath,headless:chrome.headless,});/' ./node_modules/gatsby-source-notion-database/src/getPageHtml.js
sed -i "s/require('puppeteer')/require('puppeteer-core')/" ./node_modules/gatsby-source-notion-database/src/getPageHtml.js
echo "after2 \n\n"
head -n 10 ./node_modules/gatsby-source-notion-database/src/getPageHtml.js
