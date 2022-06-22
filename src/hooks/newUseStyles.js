import React, { useRef, useContext, createContext, useMemo } from 'react';
import equal from 'fast-deep-equal';
import { useColorScheme, useWindowDimensions } from 'react-native';
import { observer } from 'mobx-react-lite';
import { configStore } from '../stores/configStore';

export const lightPalette = {
  background: '#F1F2F2',
  secondaryBackground: '#ffffff',
  stroke: '#12121D',
  strokeSecondary: '#828282',
  border: '#cccccc',
  primaryColor: '#319EDC',
  white: '#FFFFFF',
  blue: '#4D96FF',
};

/** @type {Record<keyof lightPalette, string>} */
export const darkPalette = {
  background: '#121212',
  secondaryBackground: '#000000',
  stroke: '#FFFFFF',
  strokeSecondary: '#727272',
  border: '#BDBDBD',
  primaryColor: '#319EDC',
  white: '#FFFFFF',
  blue: '#4D96FF',
};

export const fontFamilyMap = {
  Common: 'OpenSans-Regular',
  Bold: 'OpenSans-Bold',
  Special: 'SomethingFresh-Regular',
};

/** @type {{}} */
export const mediaQuery = {};

/**
 * @type {<T extends (
 * import('react-native').ViewStyle |
 * import('react-native').TextStyle |
 * import('react-native').ImageStyle)
 * >(style: T) => T}
 */
const newStyle = (style) => style;

/** @type {import('react-native-safe-area-context').EdgeInsets} */
const initialEdgeInsets = {
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
};

const ThemeContext = createContext({
  p: lightPalette,
  w: 360,
  h: 640,
  l: true,
  f: fontFamilyMap,
  n: newStyle,
  i: initialEdgeInsets,
});

export const ThemeContextProvider = observer(({ children }) => {
  const colorTheme = configStore.theme;
  const appLayoutHeight = configStore.appLayoutHeight;
  const edgeInsets = configStore.edgeInsets;
  const windowDimensions = useWindowDimensions();
  const colorScheme = useColorScheme();
  const light = colorTheme ? colorTheme !== 'dark' : colorScheme !== 'dark';
  const palette = light ? lightPalette : darkPalette;
  const { width } = windowDimensions;

  const theme = useMemo(
    () => ({
      p: palette,
      w: width,
      h: appLayoutHeight,
      l: light,
      f: fontFamilyMap,
      n: newStyle,
      i: edgeInsets,
    }),
    [appLayoutHeight, edgeInsets, light, palette, width],
  );

  return <ThemeContext.Provider value={theme} children={children} />;
});

/**
 * @typedef {{
 * p: darkPalette
 * w: number
 * h: number
 * l: boolean
 * n: newStyle
 * f: Record<keyof fontFamilyMap, string>
 * i: import('react-native-safe-area-context').EdgeInsets
 * }} SpecialStyleProps
 **/

/** @type {() => SpecialStyleProps} */
export const useSpecialStyleProps = () => useContext(ThemeContext);

/**
 * @type {<
 * S extends SpecialStyleProps,
 * P extends object,
 * T extends import('react-native').StyleSheet.NamedStyles<T>,
 * F extends (special: S, props: P) => T>
 * (styleFn: F) => (props: Parameters<F>[1]) => ReturnType<F>}
 */
const newUseStyles = (styleFn) =>
  /** @type {(props: Parameters<styleFn>[1]) => ReturnType<styleFn>} */
  function useStyles(props) {
    const styleFnRef = useRef(styleFn);
    const prevStyleFn = styleFnRef.current;
    styleFnRef.current = styleFn;

    /** @type {import('react').MutableRefObject<ReturnType<styleFn>>} */
    const styleRef = useRef();

    const special = useSpecialStyleProps();

    const specialRef = useRef(special);
    const prevSpecial = specialRef.current;
    specialRef.current = special;

    const propsRef = useRef(props);
    const prevProps = propsRef.current;
    propsRef.current = props;

    const isSameParams =
      prevSpecial === special &&
      equal(prevProps, props) &&
      styleRef.current &&
      styleFn === prevStyleFn;

    if (!isSameParams) {
      const prevStyle = styleRef.current;
      const nextStyle = styleFn(special, props);
      if (prevStyle) {
        let isSameStyle = true;
        for (const key in nextStyle) {
          if (equal(prevStyle[key], nextStyle[key])) {
            nextStyle[key] = prevStyle[key];
          } else {
            isSameStyle = false;
          }
        }
        if (!isSameStyle) {
          styleRef.current = nextStyle;
        }
      } else {
        styleRef.current = nextStyle;
      }

      for (const key in styleRef.current) {
        const singleStyle = styleRef.current[key];
        if (singleStyle['fontSize'] && !singleStyle['fontFamily']) {
          const w = singleStyle['fontWeight'];
          const isBoldFont = w === '700' || w === '800' || w === '900' || w === 'bold';
          singleStyle['fontFamily'] = isBoldFont ? fontFamilyMap.Bold : fontFamilyMap.Common;
        }
      }
    }

    return styleRef.current;
  };

export default newUseStyles;
