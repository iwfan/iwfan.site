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
      filter: { fileAbsolutePath: { regex: "/(articles)\/.*\\.mdx?$/" } }
    ) {
      totalCount
        edges {
          node {
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
                      {999999}
                      <sup>{'+'}</sup>
                    </li>
                    <li>
                      <strong>标签 </strong>
                      {999999}
                      <sup>{'+'}</sup>
                    </li>
                    <li>
                      <strong>字数 </strong>
                      {999999}
                      <sup>{'+'}</sup>{' '}
                    </li>
                    <li>
                      <strong>阅读时长 </strong>
                      {999999}
                      <sup>{'+'}</sup>
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
