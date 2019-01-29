module.exports = {
  siteMetadata: {
    title: '清白之年',
    logo: './static/svg/deer.svg',
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
  // pathPrefix: '.',
  plugins: [
    `gatsby-plugin-typescript`,
    `gatsby-plugin-emotion`,
    `gatsby-plugin-catch-links`,
    `gatsby-plugin-react-helmet`,

    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `posts`,
        path: `${__dirname}/src/posts/`,
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
    {
      resolve: `gatsby-transformer-remark`,
      options: { plugins: [] },
    },
  ],
};
