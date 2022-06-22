const {getDefaultConfig} = require('metro-config');

/** @typedef {ReturnType<import('metro-config/src/defaults/index.js')['getDefaultValues']>} MetroConfig */
/** @typedef {Partial<{[K in keyof MetroConfig]: Partial<MetroConfig[K]>}>} PartialMetroConfig */

module.exports = (async () => {
  /** @type {MetroConfig} */
  const {
    resolver: {sourceExts, assetExts},
  } = await getDefaultConfig();
  /** @type {PartialMetroConfig} */
  const config = {
    transformer: {
      babelTransformerPath: require.resolve('react-native-svg-transformer'),
      getTransformOptions: async () => ({
        transform: {
          experimentalImportSupport: false,
          inlineRequires: true,
        },
      }),
    },
    resolver: {
      assetExts: assetExts.filter(ext => ext !== 'svg'),
      sourceExts: [...sourceExts, 'svg'],
    },
  };
  return config;
})();
