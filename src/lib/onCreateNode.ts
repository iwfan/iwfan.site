import { createFilePath } from 'gatsby-source-filesystem';
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
const onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode });
    // const { relativePath } = getNode(node.parent);
    // const slug = `posts/${relativePath.replace('.md', '')}/`;
    createNodeField({
      name: `slug`,
      node,
      value: slug,
    });
  }
};

module.exports = onCreateNode;
