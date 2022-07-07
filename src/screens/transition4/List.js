import PhotographyDetails from 'components/PhotographyDetails';
import UserCard from 'components/UserCard';
import photography from 'config/data/photography';
import React, { useCallback, useRef } from 'react';
import { StyleSheet, View, Dimensions, StatusBar, Animated, Image } from 'react-native';
import { SharedElement } from 'react-navigation-shared-element';
import TouchableScale from 'react-native-touchable-scale';
import { height, SPACING } from 'config/theme';

const { width } = Dimensions.get('screen');

const data = photography;

/**
 * @typedef {{
 *  key: string
 *  image: string
 *  name: string
 * }} CardItem
 */

const List = ({ navigation }) => {
  const scrollX = useRef(new Animated.Value(0)).current;

  const renderItem = useCallback(
    ({ item }) => {
      const onPress = () => navigation.push('Transition4Detail', { item });

      return (
        <View style={S.itemContainer}>
          <SharedElement id={`item-${item.key}-image`} style={S.imageContainer}>
            <Image source={{ uri: item.image }} style={S.image} />
          </SharedElement>
          <View style={S.cardContainer}>
            <TouchableScale
              activeScale={0.8}
              tension={20}
              friction={7}
              useNativeDriver
              onPress={onPress}>
              <SharedElement id={`item-${item.key}-card`}>
                <UserCard user={item.user} />
              </SharedElement>
            </TouchableScale>
          </View>
        </View>
      );
    },
    [navigation],
  );

  const onScroll = Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
    useNativeDriver: true,
  });

  return (
    <View style={S.container}>
      <StatusBar hidden />
      <Animated.FlatList
        data={data}
        keyExtractor={(item) => item.key}
        horizontal
        pagingEnabled
        scrollEventThrottle={16}
        onScroll={onScroll}
        renderItem={renderItem}
      />
      <PhotographyDetails data={data} style={S.details} scrollX={scrollX} />
    </View>
  );
};

export default List;

const S = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'black' },
  imageContainer: {
    ...StyleSheet.absoluteFillObject,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    width,
    height: height,
    resizeMode: 'cover',
    padding: SPACING * 2,
    paddingBottom: 120,
    justifyContent: 'flex-end',
    opacity: 0.7,
  },
  itemContainer: {
    flex: 1,
    height,
    width,
  },
  details: {
    position: 'absolute',
    top: 80,
    left: SPACING,
    right: SPACING,
  },
  cardContainer: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 80,
  },
});
