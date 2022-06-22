const toString = (value) => (value !== undefined ? `${value}` : undefined);
const toNumber = (value) => (value !== undefined ? +value : undefined);
const toBoolean = (value) => (value && value !== 'false' ? true : false);

/** @type {<T extends import('@react-navigation/native').PathConfigMap<any>>(value: T) => T} */
const getScreens = (value) => value;

export const screens = getScreens({
  Home: {
    path: '',
    parse: {},
  },
  Example1: {
    path: '',
    parse: {},
  },
});

export default screens;
