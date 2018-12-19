module.exports = {
  extends: 'airbnb',
  parser: 'babel-eslint',
  env: {
    browser: true,
  },
  rules: {
    'react/jsx-filename-extension': [1, { "extensions": ['.js', '.jsx'] }],
    'no-underscore-dangle': 'off',
    'global-require': 'off',
    'no-plusplus': 'off',
    'react/destructuring-assignment': 'off',
    'import/prefer-default-export': 'off',
  }
};
