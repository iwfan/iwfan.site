module.exports = {
  parser: `@typescript-eslint/parser`,
  extends: [
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
    "prettier/@typescript-eslint"
  ],
  plugins: ["@typescript-eslint", "prettier"],
  parserOptions: {
    ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
    ecmaFeatures: {
      jsx: true
    }
  },
  env: {
    browser: true,
    node: true,
  },
  settings: {
    react: { version: 'detect' },
  },
  rules: {
    quotes: "off",
    "@typescript-eslint/quotes": [
      2,
      "backtick",
      {
        "avoidEscape": true
      }
    ],
    "@typescript-eslint/camelcase": 1,
    "react/prop-types": 0,
    indent: ["error", 2, { SwitchCase: 1 }],
    "prettier/prettier": [
      "error",
      {
        "semi": true,
        "tabWidth": 2,
        "printWidth": 100,
        "singleQuote": true,
        "trailingComma": "all",
        "endOfLine": "lf"
      }
    ],
  }
}
