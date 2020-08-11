module.exports = {
  purge: ["./**/{pages,components,tailwind}/**/*.{js,jsx,ts,tsx,css}"],
  theme: {
    extend: {},
    typography: {
      default: {
        css: {
          color: '#333',
          a: {
            color: '#3182ce',
            '&:hover': {
              color: '#2c5282',
            },
          },
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
