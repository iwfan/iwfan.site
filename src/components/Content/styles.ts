import Card from '@/styles/elements/Card';
import { px2rem } from '@/styles/helper';
import styled from 'styled-components';
export const ContentWrap = styled(Card).attrs({
  as: 'article',
})`
  flex-grow: 1;
`;

export const ArticleWrap = styled.section`
  padding: ${px2rem(20)};
  :not(:last-child) {
    border-bottom: 1px solid #f6f6f6;
  }
`;

export const ArticleTitle = styled.h1`
  color: #424647;
  font-size: ${px2rem(18)};
  :hover {
    text-decoration: underline;
  }
`;
export const ArticleExcerpt = styled.p`
  color: #666;
  font-size: ${px2rem(13)};
  line-height: 1.5;
  margin: 10px 0;
  text-indent: 2em;
`;
