module.exports = {
  purge: ["./**/{pages,components,tailwind}/**/*.{js,jsx,ts,tsx,css}"],
  theme: {
    extend: {
      rotate: {
        '360': '360deg',
        '-360': '-360deg'
      }
    },
    typography: {
      default: {
        css: {
          color: '#333',
          maxWidth: '100%',
          a: {
            color: '#3182ce',
            '&:hover': {
              color: '#2c5282',
            },
          },
          'ul, ol': {
            listStyle: 'none',
            padding: '0'
          },
          img: {
            marginTop: '0',
            marginBottom: '0'
          }
        },
      },
    },
  },
  variants: {},
  plugins: [
    require('@tailwindcss/typography'),
  ],
  corePlugins: {
    preflight: false,
  },
}
