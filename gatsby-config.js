module.exports = {
  siteMetadata: {
    title: '清白之年',
    logo: 'svg/deer.svg',
    description: '此时的庸忙 诺诺慌张<br/> 可否已成你的日常',
    keywords: ['清白之年', 'Zi莱卷', '博客', 'blog', 'iwfan'],
    author: {
      name: 'Zi莱卷',
      bio: '',
      avatar: './static/svg/deer.svg',
      email: 'i.wangfancn@gmail.com',
    },
    menus: [
      {
        title: 'Home',
        path: '/',
      },
      {
        title: 'About',
        path: '/about/',
      },
      {
        title: '404',
        path: '/404/',
      },
    ],
  },
  // pathPrefix: '/',
  plugins: [
    `gatsby-plugin-typescript`,
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-catch-links`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-react-svg`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `articles`,
        path: `${__dirname}/articles/`,
        ignore: [`**/\.*`],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `static`,
        path: `${__dirname}/static/`,
        ignore: [`**/\.*`],
      },
    },
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-transformer-remark`,
      options: { plugins: [] },
    },
  ],
};
