module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    ['./src/helpers/babelMobxTransformer.js'],
    [
      'module-resolver',
      {
        root: ['./src'],
      },
    ],
  ],
};
