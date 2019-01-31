import { css } from '@emotion/core';

const headerStyle = css`
  width: 100%;
  height: 60px;
  line-height: 60px;
  border-bottom: 1px solid #ecf0f1;
  display: flex;
  justify-content: space-between;
  color: #424647;
  .brand {
    a {
      display: flex;
      width: 100%;
      height: 100%;

      .brand__logo {
        align-self: center;
        width: 50px;
        height: 50px;
        margin: 0 15px;
        &:hover {
          color: #38d39f;
        }
        svg {
          width: 100%;
          height: 100%;
        }
      }
      .brand__title {
        &--primary {
          font-size: 18px;
          font-weight: 400;
          height: 60%;
          line-height: 2.5;
          &:hover {
            color: #38d39f;
          }
        }
        &--secondary {
          font-size: 13px;
          font-weight: 400;
          color: #616566;
          height: 40%;
          line-height: 1.8;
          text-indent: 4em;
          &:hover {
            color: #38d39f;
          }
        }
      }
    }
  }

  .nav {
    .nav__container {
      display: flex;
      justify-content: space-around;
      align-items: center;
      list-style: none;
    }

    .nav__item {
      flex: 0 0 auto;
      margin: 0 10px;
      font-size: 14px;
      a {
        display: inline-block;
        padding: 0 1em;
        height: 60px;

        &:hover,
        &.nav__item--active {
          color: #38d39f;
          border-bottom: 2px solid #38d39f;
        }
      }
    }
  }
`;

export default headerStyle;
