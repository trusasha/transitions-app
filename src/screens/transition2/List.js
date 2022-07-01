import locations from 'config/data/locations';
import React, { useCallback, useRef } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  SafeAreaView,
  Dimensions,
  Animated,
} from 'react-native';
import { SharedElement } from 'react-navigation-shared-element';

/**
 * @typedef {{
 *  key: string
 *  location: string
 *  numberOfDays: number
 *  image: string
 *  color: string
 * }} LocationItem
 */

/** @type {LocationItem[]} */
const data = locations;

const { width } = Dimensions.get('screen');

export const ITEM_WIDTH = width * 0.68;
export const SPACING = 20;
const FULL_SIZE = ITEM_WIDTH + SPACING * 2;

const List = ({ navigation }) => {
  const scrollX = useRef(new Animated.Value(0)).current;

  /** @type {import('react-native').ListRenderItem<LocationItem>} */
  const renderItem = useCallback(
    ({ item, index }) => {
      const { image, location, numberOfDays, key } = item;

      const inputRange = [(index - 1) * FULL_SIZE, index * FULL_SIZE, (index + 1) * FULL_SIZE];
      const translateX = scrollX.interpolate({
        inputRange,
        outputRange: [ITEM_WIDTH, 0, -ITEM_WIDTH],
      });

      const textStyle = [S.itemLocation, { transform: [{ translateX }] }];

      const onPress = () => navigation.push('Transition2Detail', { item });

      return (
        <TouchableOpacity style={S.itemContainer} onPress={onPress} activeOpacity={0.9}>
          <SharedElement id={`travel-image-${key}`} style={S.itemImage}>
            <Animated.Image style={S.itemImage} resizeMode={'cover'} source={{ uri: image }} />
          </SharedElement>

          <SharedElement id={`travel-title-${key}`} style={S.itemLocationContainer}>
            <Animated.Text style={textStyle} children={location} />
          </SharedElement>
          <View style={S.itemDaysContainer}>
            <Text style={S.itemDaysValue} children={`${numberOfDays}`} />
            <Text style={S.itemDaysLabel} children={'days'} />
          </View>
        </TouchableOpacity>
      );
    },
    [navigation, scrollX],
  );

  const keyExtractor = useCallback(({ key }) => key, []);

  return (
    <SafeAreaView style={S.flex}>
      <View style={S.container}>
        <Animated.FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
            useNativeDriver: true,
          })}
          horizontal
          showsHorizontalScrollIndicator={false}
          snapToInterval={FULL_SIZE}
          decelerationRate="fast"
        />
      </View>
    </SafeAreaView>
  );
};

export default List;

const S = StyleSheet.create({
  flex: { flex: 1 },
  container: {
    flex: 1,
  },
  itemContainer: {
    width: ITEM_WIDTH,
    height: ITEM_WIDTH * 1.5,
    margin: SPACING,
    overflow: 'hidden',
    borderRadius: 18,
  },
  itemImage: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 18,
  },
  itemLocation: {
    fontSize: 30,
    color: '#fff',
    fontWeight: '800',
    width: ITEM_WIDTH * 0.8,
    textTransform: 'uppercase',
  },
  itemLocationContainer: {
    position: 'absolute',
    top: SPACING,
    left: SPACING,
  },
  itemDaysContainer: {
    position: 'absolute',
    bottom: SPACING,
    left: SPACING,
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: 'tomato',
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemDaysValue: {
    fontWeight: '800',
    fontSize: 18,
    color: '#fff',
  },
  itemDaysLabel: {
    fontWeight: '800',
    fontSize: 10,
    color: '#fff',
  },
});
