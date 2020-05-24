import Typography from 'typography';

const theme = {
  title: `Fork GitHub`,
  baseFontSize: `16px`,
  baseLineHeight: 1.625,
  headerFontFamily: [
    `-apple-system`,
    `BlinkMacSystemFont`,
    `Segoe UI`,
    `Roboto`,
    `Helvetica`,
    `Arial`,
    `sans-serif`,
    `Apple Color Emoji`,
    `Segoe UI Emoji`,
    `Segoe UI Symbol`,
  ],
  bodyFontFamily: [
    `-apple-system`,
    `BlinkMacSystemFont`,
    `Segoe UI`,
    `Roboto`,
    `Helvetica`,
    `Arial`,
    `sans-serif`,
    `Apple Color Emoji`,
    `Segoe UI Emoji`,
    `Segoe UI Symbol`,
  ],
  scaleRatio: 2,
  bodyColor: `var(--bodyFontColor)`,
  headerWeight: 600,
  bodyWeight: `normal`,
  boldWeight: 600,
  // Github has all block elements use 1/2 rhythm not a full rhythm.
  blockMarginBottom: 1 / 2,
  overrideStyles: ({ rhythm }) => ({
    'ol,ul': {
      marginLeft: rhythm(1.25),
    },
    'li>ol,li>ul': {
      marginLeft: rhythm(1.25),
    },
    a: {
      color: `var(--bodyFontColor)`,
      textDecoration: `none`,
    },
    'a:hover,a:active': {
      textDecoration: `underline`,
    },
    small: {
      color: `var(--bodyGreyFontColor)`,
    },
  }),
};

const typography = new Typography(theme);

// Hot reload typography in development.
if (process.env.NODE_ENV !== `production`) {
  typography.injectStyles();
}

export default typography;
export const rhythm = typography.rhythm;
export const scale = typography.scale;
