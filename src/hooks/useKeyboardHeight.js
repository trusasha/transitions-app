import { useCallback, useEffect, useState } from 'react';
import { Keyboard, Platform, LayoutAnimation } from 'react-native';

export const keyboardHeightRef = { current: 0 };

/**
 * Hook which returns current opened keyboard height in pixels or 0 otherwise
 * @returns {number}
 */
const useKeyboardHeight = () => {
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  /** @type {import('react-native').KeyboardEventListener} */
  const onKeyboardChange = useCallback((event) => {
    if (!event) {
      keyboardHeightRef.current = 0;
      setKeyboardHeight(0);
      return;
    }

    const { duration, easing, endCoordinates } = event;
    const keyboardHeight = endCoordinates.height;

    if (duration && easing) {
      LayoutAnimation.configureNext({
        duration,
        update: {
          duration,
          type: LayoutAnimation.Types[easing] || 'keyboard',
        },
      });
    }

    keyboardHeightRef.current = keyboardHeight;
    setKeyboardHeight(keyboardHeight);
  }, []);

  /** @type {import('react-native').KeyboardEventListener} */
  const keyboardDidShow = useCallback((e) => {
    const { height } = e.endCoordinates;

    if (height) {
      keyboardHeightRef.current = height;
      setKeyboardHeight(height);
    }
  }, []);

  /** @type {import('react-native').KeyboardEventListener} */
  const keyboardDidHide = useCallback(() => {
    keyboardHeightRef.current = 0;
    setKeyboardHeight(0);
  }, []);

  const effect = useCallback(() => {
    const keyboardDidChangeListener = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillChangeFrame' : 'keyboardDidShow',
      Platform.OS === 'ios' ? onKeyboardChange : keyboardDidShow,
    );
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', keyboardDidHide);

    return () => {
      keyboardDidChangeListener.remove();
      keyboardDidHideListener.remove();
    };
  }, [keyboardDidHide, keyboardDidShow, onKeyboardChange]);

  useEffect(effect, [effect]);

  return keyboardHeight;
};

export default useKeyboardHeight;
