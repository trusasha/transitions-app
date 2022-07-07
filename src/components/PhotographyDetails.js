import React, { useCallback } from 'react';
import { StyleSheet, View, Text, Animated } from 'react-native';
import { fonts, width, SPACING } from '../config/theme';

/**
 * @typedef {{
 *  data: import('config/data/photography').PhotographyItem[]
 *  style?: import('react-native').ViewStyle
 *  scrollX: Animated.Value
 * }} PhotographyDetailsProps
 */

/** @param {PhotographyDetailsProps} props */
const PhotographyDetails = ({ data, style, scrollX }) => {
  const renderItem = useCallback(
    (item, index) => {
      const inputRange = [(index - 0.5) * width, index * width, (index + 0.5) * width];
      const opacity = scrollX.interpolate({
        inputRange,
        outputRange: [0, 1, 0],
      });
      const translateY = scrollX.interpolate({
        inputRange,
        outputRange: [10, 0, 10],
      });
      const animatedStyles = {
        transform: [{ translateY }],
        opacity,
        position: 'absolute',
      };

      return (
        <Animated.View key={`detail.${item.key}`} style={animatedStyles}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.description}>{item.description}</Text>
        </Animated.View>
      );
    },
    [scrollX],
  );

  return <View style={style}>{data.map(renderItem)}</View>;
};

export default PhotographyDetails;

const styles = StyleSheet.create({
  title: {
    color: '#fff',
    ...fonts.montserratBold,
    fontSize: 22,
    marginBottom: SPACING,
  },
  description: { color: '#fff', ...fonts.montserratRegular, fontSize: 16 },
});
