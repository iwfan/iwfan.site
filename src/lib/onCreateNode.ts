const { createFilePath } = require(`gatsby-source-filesystem`);
// @ts-ignore
const onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;
  if (node.internal.type === `MarkdownRemark`) {
    // const slug = createFilePath({ node, getNode, basePath: `pages` });
    const { relativePath } = getNode(node.parent);
    const slug = `posts/${relativePath.replace('.md', '')}/`;
    createNodeField({
      name: `slug`,
      node,
      value: slug,
    });
  }
};

module.exports = onCreateNode;
