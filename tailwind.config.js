module.exports = {
  content: ['./app/**/*.{ts,tsx,md,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        Jost: ['Jost', 'sans-serif'],
      },
      colors: {
        fg: '#ECF8FF',
        green: '#83F9A2',
        blue: '#5E8CA7',
        ['deep-green']: 'rgb(22, 33, 41)',
      },
    },
  },
  variants: {},
  plugins: [],
}
