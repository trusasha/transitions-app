import copyStateFrom from 'helpers/copyStateFrom';
import { localization, routeNameLocalization } from 'helpers/localization';
import { makeAutoObservable } from 'mobx';
import { Dimensions } from 'react-native';

const initialState = {};

export const configStore = makeAutoObservable({
  localization,
  routeNameLocalization,

  /** @type {string} */
  theme: '',

  /** @param {string} theme */
  setTheme: (theme) => {
    configStore.theme = theme;
  },

  /** @type {number} */
  appLayoutHeight: Dimensions.get('window').height,

  /** @param {number} appLayoutHeight */
  setAppLayoutHeight: (appLayoutHeight) => {
    configStore.appLayoutHeight = appLayoutHeight;
  },

  /** @type {import('react-native-safe-area-context').EdgeInsets} */
  edgeInsets: {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },

  /** @param {import('react-native-safe-area-context').EdgeInsets} edgeInsets */
  setEdgeInsets: (edgeInsets) => {
    const prevEdgeInsets = configStore.edgeInsets;
    if (
      edgeInsets.top !== prevEdgeInsets.top ||
      edgeInsets.bottom !== prevEdgeInsets.bottom ||
      edgeInsets.left !== prevEdgeInsets.left ||
      edgeInsets.right !== prevEdgeInsets.right
    ) {
      configStore.edgeInsets = edgeInsets;
    }
  },

  config: {
    stories: {
      section: {
        0: 'arts',
        1: 'automobiles',
        2: 'books',
        3: 'business',
        4: 'fashion',
      },
    },
  },

  get localizationLowerCased() {
    const result = { ...configStore.localization };
    for (const phrase in result) {
      result[phrase] = result[phrase].toLowerCase();
    }
    return result;
  },

  get localizationUpperCased() {
    const result = { ...configStore.localization };
    for (const phrase in result) {
      result[phrase] = result[phrase].toUpperCase();
    }
    return result;
  },

  get localizationLowerCasedFirst() {
    const result = { ...configStore.localization };
    for (const phrase in result) {
      result[phrase] = result[phrase][0].toLowerCase() + result[phrase].slice(1);
    }
    return result;
  },
});

copyStateFrom(configStore, initialState);
