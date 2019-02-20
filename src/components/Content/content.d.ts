interface IMDNodeData {
  id: string;
  excerpt: string;
  timeToRead: number;
  frontmatter: {
    title: string;
    date: string;
    tags: string[] | null;
    categories: string[] | null;
  };
  fields: {
    slug: string;
  };
}
interface IAricleListData {
  allMarkdownRemark: {
    totalCount: number;
    edges: Array<{ node: IMDNodeData }>;
  };
}
