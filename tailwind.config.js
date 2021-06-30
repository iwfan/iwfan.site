module.exports = {
  mode: 'jit',
  purge: ['./**/{pages,components}/**/*.{js,jsx,ts,tsx,css}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      rotate: {
        360: '360deg',
        '-360': '-360deg'
      }
    },
    typography: {
      default: {
        css: {
          color: '#333',
          maxWidth: '100%',
          'ul, ol': {
            listStyle: 'none',
            padding: '0'
          },
          img: {
            marginTop: '0',
            marginBottom: '0'
          },
          code: {
            fontSize: `1.2em`
          }
        }
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: [require('@tailwindcss/typography')],
  corePlugins: {
    preflight: false
  }
}
