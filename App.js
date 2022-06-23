import React, { memo, useCallback, useEffect } from 'react';
import { Platform, SafeAreaView, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import newUseStyles, { ThemeContextProvider } from 'hooks/newUseStyles';
import { MainStack } from 'navigation/MainStack';
import { configStore } from 'stores';
import { keyboardHeightRef } from 'hooks/useKeyboardHeight';

const isFullscreen = Platform.OS === 'ios';

const useStyles = newUseStyles(() => ({
  flex: {
    flex: 1,
  },
}));

const App = () => {
  const S = useStyles();

  const onLayout = useCallback(
    /** @param {import('react-native').LayoutChangeEvent} e */
    (e) => {
      if (keyboardHeightRef.current === 0) {
        const appLayoutHeight = e.nativeEvent.layout.height;
        if (Math.round(configStore.appLayoutHeight) !== Math.round(appLayoutHeight)) {
          configStore.setAppLayoutHeight(appLayoutHeight);
        }
      }
    },
    [],
  );

  /** @type {typeof SafeAreaView} */
  // @ts-ignore
  const MobileWrapperView = memo((props) => {
    const edgeInsets = useSafeAreaInsets();
    useEffect(() => {
      configStore.setEdgeInsets(edgeInsets);
    }, [edgeInsets]);
    return <View {...props} />;
  });

  const WrapperViewProvider = isFullscreen ? SafeAreaProvider : View;
  const WrapperView = isFullscreen ? MobileWrapperView : SafeAreaView;

  return (
    <ThemeContextProvider>
      <WrapperViewProvider style={S.flex}>
        <WrapperView nativeID="root-inner-container" style={S.flex}>
          <View style={S.flex} onLayout={onLayout}>
            <NavigationContainer>
              <MainStack />
            </NavigationContainer>
          </View>
        </WrapperView>
      </WrapperViewProvider>
    </ThemeContextProvider>
  );
};

export default App;
