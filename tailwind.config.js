module.exports = {
  content: ['./app/**/*.{ts,tsx,md,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        Jost: [
          'Jost',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'Noto Sans',
          'sans-serif',
          'Apple Color Emoji',
          'Segoe UI Emoji',
          'Segoe UI Symbol',
          'Noto Color Emoji',
        ],
      },
      colors: {
        fg: '#ECF8FF',
        green: '#83F9A2',
        blue: '#5E8CA7',
        border: 'rgb(28, 44, 53)',
        light: 'rgba(130, 249, 161, 0.07)',
        bar: 'rgb(222, 255, 231)',
        ['deep-green']: 'rgb(22, 33, 41)',
      },
      boxShadow: {
        emanate: 'rgb(14 255 77 / 50%) 3px 0px 22px',
      },
      keyframes: {
        expand: {
          '0%': { transform: 'scale(1.1)' },
          '100%': { transform: 'scale(1)' },
        },
        shrink: {
          '0%': { transform: 'scale(0.9)' },
          '100%': { transform: 'scale(1)' },
        },
      },
      animation: {
        expand: 'expand 1000ms infinite alternate-reverse',
        shrink: 'shrink 1000ms infinite alternate-reverse',
      },
    },
  },
  variants: {},
  plugins: [],
}
