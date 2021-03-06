module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    radix: 0,
    'react/jsx-filename-extension': 0,
    'react/prop-types': 0,
    'no-unused-vars': 1,
    'react/no-array-index-key': 0,
    'react/jsx-props-no-spreading': 0,
  },
};
