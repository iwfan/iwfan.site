import Card from '@/styles/elements/Card';
import styled from 'styled-components';
const ContentWrap = styled(Card).attrs({
  as: 'article',
})`
  section {
    padding: 10px 20px;
    margin-bottom: 20px;
    border-radius: 2px;

    border-bottom: 1px solid #f6f6f6;

    color: #424647;
    h1 {
      font-size: 18px;
    }
    p {
      color: #616566;
    }
    footer p {
      color: #999;
    }
  }
`;

export default ContentWrap;
