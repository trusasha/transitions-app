import { getPathFromState, getStateFromPath } from '@react-navigation/core';
import screens from './screens';

/**
 * Generate router state key from name and params.
 * @type {(name: string, params: Record<string, any>, useFullKey?: boolean) => string}
 */
export const toRouteKey = (name, params = {}) => {
  const href = getPathFromState({ routes: [{ name, params }] }, { screens });
  const key = href.split('?')[0];
  return key;
};

/**
 * Creates new updated state to replace random keys in routes by url-based ones
 * @param {ReturnType<typeof getStateFromPath>} state
 * @returns {ReturnType<typeof getStateFromPath>} state
 */
const getStateWithUrlKeys = (state) => {
  const newState = {
    ...state,
    routes: state.routes.map((route) => ({
      ...route,
      key: toRouteKey(route.name, route.params || {}),
      params: route.params || {},
      state: route.state ? getStateWithUrlKeys(route.state) : route.state,
    })),
  };
  return newState;
};

export const linkingPrefix = 'transitions://';

/** @type {import("@react-navigation/native").LinkingOptions<any>} */
const linking = {
  prefixes: [linkingPrefix],
  config: {
    screens,
    initialRouteName: 'HomeTabs',
  },
  getStateFromPath: (path, options) => getStateWithUrlKeys(getStateFromPath(path, options)),
};

const screenMap = {
  ...screens,
};

/**
 * @typedef {{
 *  [K in keyof screenMap] : Partial<{[L in keyof typeof screenMap[K]['parse']]:
 *    ReturnType<screenMap[K]['parse'][L]>}>
 * }} ParamsMap
 */

/** @typedef {{[K in keyof ParamsMap] : (params: ParamsMap[K], root: {}) => Promise<void>}} FetchMap */

/** @type {React.MutableRefObject<import('@react-navigation/core').NavigationContainerRef<any>>} */
export const navigationRef = { current: null };

export default linking;
