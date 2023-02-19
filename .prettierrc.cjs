/** @type {import('prettier').Config} */
module.exports = {
  trailingComma: 'none',
  semi: false,
  plugins: [require.resolve('prettier-plugin-astro')],
  overrides: [{ files: '*.astro', options: { parser: 'astro' } }]
}
