import { toJS } from 'mobx';

/**
 * Copy non-function values with removed reactivity from state to state. Mutates `toState`.
 * @param {Record<any, any>} fromState
 * @param {Record<any, any>} toState
 * @returns {void}
 */
const copyStateFrom = (fromState, toState) => {
  if (fromState) {
    for (const key in fromState) {
      const value = fromState[key];
      if (typeof value !== 'function') {
        toState[key] = toJS(fromState[key]);
      }
    }
  }
};

export default copyStateFrom;
