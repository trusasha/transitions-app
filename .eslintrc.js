module.exports = {
  root: true,
  extends: '@react-native-community',
  plugins: ['jest'],
  rules: {
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': [
      'error',
      {
        additionalHooks: '(useStateEffect)',
      },
    ],
    'dot-notation': 'off',
    'no-shadow': 'off',
    'no-unused-vars': 'off',
  },
  globals: {
    importScripts: 'readonly',
  },
};
