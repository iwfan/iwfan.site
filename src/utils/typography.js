import Typography from 'typography';
import theme from 'typography-theme-github';

theme.overrideThemeStyles = () => {
  return {
    h1: {
      fontSize: `1.5rem`,
    },
    h2: {
      fontSize: `1.3rem`,
      borderBottom: `none`,
    },
    'h1 a, h2 a, h3 a, h4 a, h5 a, h6 a': {
      color: `#18191b`,
    },
    blockquote: {
      fontSize: `0.9em`,
      border: `1px solid hsla(0, 0%, 0%, 0.2)`,
      borderRadius: `0.75em`,
      padding: `1.25em`,
      background: `rgba(255, 229, 100, 0.2)`,
    },
  };
};

delete theme.googleFonts;

const typography = new Typography(theme);

// Hot reload typography in development.
if (process.env.NODE_ENV !== `production`) {
  typography.injectStyles();
}

export default typography;
export const rhythm = typography.rhythm;
export const scale = typography.scale;
