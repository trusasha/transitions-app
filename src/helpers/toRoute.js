import { getPathFromState } from '@react-navigation/core';
import linking from 'navigation/linking';

/**
 * Create router state from name and params. Adds generated key.
 * @type {<T extends keyof import('navigation/linking').ParamsMap>
 * (name: T, params: import('navigation/linking').ParamsMap[T]) =>
 * {key?: string, name: T, params: import('navigation/linking').ParamsMap[T]}}
 */
const toRoute = (name, params) => {
  const { screens } = linking.config;
  if (screens[name]) {
    const href = getPathFromState({ routes: [{ name, params }] });
    const key = href.split('?')[0];
    return { key, name, params };
  } else {
    return { name, params };
  }
};

export default toRoute;
