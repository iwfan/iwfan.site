import { throttle } from '@/utils';
import { graphql, StaticQuery } from 'gatsby';
import Img from 'gatsby-image';
import * as React from 'react';
import { ImgDesc, ImgWrap, SideInner, SideNav, SideWrap } from './styles';

const query = graphql`
  query SidebarQuery {
    welcome: file(relativePath: { eq: "images/undraw_happy_2019_jq3f.png" }) {
      childImageSharp {
        fluid(maxWidth: 240) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    site {
      siteMetadata {
        title
        menus {
          title
          path
        }
      }
      buildTime(fromNow: true, locale: "zh-cn")
      pathPrefix
    }
    allMarkdownRemark(      
      filter: { fileAbsolutePath: { regex: "/(articles)/.*\\.mdx?$/" } }
    ) {
      totalCount
        edges {
          node {
            frontmatter {
              title
              tags
              categories
            }
            timeToRead
            wordCount {
              paragraphs
              sentences
              words
            }
          }
        }
      }
  }
`;
class Sidebar extends React.PureComponent<any, any> {
  public state = { fixed: false };
  public scrollListener: any = null;
  public ref = React.createRef<HTMLDivElement>();
  public onWindowScroll(): void {
    const sideInner: HTMLDivElement | null = this.ref.current;
    if (sideInner) {
      if (window.scrollY > 0) {
        if (this.state.fixed !== true) {
          this.setState({ fixed: true });
        }
      } else {
        if (this.state.fixed !== false) {
          this.setState({ fixed: false });
        }
      }
    }
  }
  public componentDidMount(): void {
    this.scrollListener = throttle(this.onWindowScroll, 500).bind(this);
    window.addEventListener('scroll', this.scrollListener);
  }

  public componentWillUnmount(): void {
    window.removeEventListener('scroll', this.scrollListener);
  }

  public render(): React.ReactNode {
    return (
      <StaticQuery query={query}>
        {(data: any) => {
          // console.log(data);
          const articleTags = new Set<string>();
          const articleCategories = new Set<string>();
          let totalWords = 0;
          let totalReadTime = 0;

          data.allMarkdownRemark.edges.forEach((item: any) => {
            const { timeToRead, wordCount } = item.node;
            const { categories, tags } = item.node.frontmatter;
            totalWords += wordCount.words;
            totalReadTime += timeToRead;
            if (categories !== null) {
              if (Array.isArray(categories)) {
                categories.forEach((cate: any) => {
                  articleCategories.add(cate);
                });
              } else {
                articleCategories.add(categories);
              }
            }
            if (tags !== null) {
              if (Array.isArray(tags)) {
                tags.forEach((tag: any) => {
                  articleTags.add(tag);
                });
              } else {
                articleTags.add(tags);
              }
            }
          });

          return (
            <SideWrap>
              <SideInner ref={this.ref} fixed={this.state.fixed}>
                <ImgWrap>
                  <Img fluid={data.welcome.childImageSharp.fluid} />
                  <ImgDesc>
                    <h1>Overview</h1>
                    <p>
                      此时的庸忙 诺诺慌张 <br />
                      可否已成你的日常
                    </p>
                  </ImgDesc>
                </ImgWrap>
                <SideNav>
                  <ul>
                    <li>
                      <strong>文章</strong> {data.allMarkdownRemark.totalCount}
                      <sup>{'+'}</sup>
                    </li>
                    <li>
                      <strong>分类 </strong>
                      {articleCategories.size}
                      <sup>{'+'}</sup>
                    </li>
                    <li>
                      <strong>标签 </strong>
                      {articleTags.size}
                      <sup>{'+'}</sup>
                    </li>
                    <li>
                      <strong>字数 </strong>
                      {totalWords}
                      <sup>{'+'}</sup>{' '}
                    </li>
                    <li>
                      <strong>阅读时长 </strong>
                      {totalReadTime}
                      <sup>{'+'}</sup>
                      分钟
                    </li>
                    <li>
                      <strong>站点运行于 </strong>
                      {data.site.buildTime}
                    </li>
                  </ul>
                </SideNav>
              </SideInner>
            </SideWrap>
          );
        }}
      </StaticQuery>
    );
  }
}

export default Sidebar;
