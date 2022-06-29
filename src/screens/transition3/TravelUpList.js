import data from 'config/data/travelup';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  Text,
  StatusBar,
  FlatList,
  Image,
  Animated,
} from 'react-native';
import { Directions, FlingGestureHandler, State } from 'react-native-gesture-handler';
import { SharedElement } from 'react-navigation-shared-element';

const { width } = Dimensions.get('screen');
const IMAGE_WIDTH = width * 0.86;
const IMAGE_HEIGHT = IMAGE_WIDTH * 1.5;
const VISIBLE_ITEMS = 4;

/**
 * @typedef {{
 *  key: string
 *  image: string
 *  name: string
 * }} CardItem
 */

const TravelUpList = ({ navigation }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const animatedValue = useRef(new Animated.Value(0)).current;
  const reactiveAnimated = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: reactiveAnimated,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [animatedValue, reactiveAnimated]);

  const setActiveSlide = useCallback(
    (index) => {
      setActiveIndex(index);
      reactiveAnimated.setValue(index);
    },
    [reactiveAnimated],
  );

  const onPress = useCallback(
    () => navigation.push('Transition3Detail', { item: data[activeIndex] }),
    [activeIndex, navigation],
  );

  /** @type {import('react-native').ListRenderItem<CardItem>} */
  const renderCard = useCallback(
    ({ item, index }) => {
      const { image, name, key } = item;
      const inputRange = [index - 1, index, index + 1];
      const translateY = animatedValue.interpolate({
        inputRange,
        outputRange: [-30, 0, 30],
      });
      const opacity = animatedValue.interpolate({
        inputRange,
        outputRange: [1 - 1 / VISIBLE_ITEMS, 1, 0],
      });
      const scale = animatedValue.interpolate({
        inputRange,
        outputRange: [0.92, 1, 1.2],
      });
      const animatedStyles = { transform: [{ translateY }, { scale }], opacity };

      return (
        <Animated.View style={[animatedStyles, S.card]}>
          <TouchableOpacity onPress={onPress} activeOpacity={1}>
            <SharedElement id={`card-${key}-image`} style={S.image}>
              <Image style={S.image} source={{ uri: image }} />
              <View style={S.nameContainer}>
                <SharedElement id={`card-${key}-title`}>
                  <Text
                    style={S.name}
                    adjustsFontSizeToFit={true}
                    numberOfLines={1}
                    children={name}
                  />
                </SharedElement>
              </View>
            </SharedElement>
          </TouchableOpacity>
        </Animated.View>
      );
    },
    [animatedValue, onPress],
  );

  const CellRendererComponent = useCallback(({ index, item, children, style, ...props }) => {
    const newStyle = [
      style,
      { zIndex: data.length - index, left: -IMAGE_WIDTH / 2, top: -IMAGE_HEIGHT / 2 },
    ];
    return (
      <View
        // @ts-ignore
        index={index}
        {...props}
        style={newStyle}>
        {children}
      </View>
    );
  }, []);

  /** @type {(event: import('react-native-gesture-handler').HandlerStateChangeEvent<import('react-native-gesture-handler').FlingGestureHandlerEventPayload>) => void} */
  const onHandlerStateChangeUp = useCallback(
    (ev) => {
      if (ev.nativeEvent.state === State.END) {
        if (activeIndex === 0) {
          return;
        }
        setActiveSlide(activeIndex - 1);
      }
    },
    [activeIndex, setActiveSlide],
  );

  /** @type {(event: import('react-native-gesture-handler').HandlerStateChangeEvent<import('react-native-gesture-handler').FlingGestureHandlerEventPayload>) => void} */
  const onHandlerStateChangeDown = useCallback(
    (ev) => {
      if (ev.nativeEvent.state === State.END) {
        if (activeIndex === data.length - 1) {
          return;
        }
        setActiveSlide(activeIndex + 1);
      }
    },
    [activeIndex, setActiveSlide],
  );

  const keyExtractor = useCallback(({ key }) => key, []);

  return (
    <FlingGestureHandler
      key={'UP'}
      direction={Directions.UP}
      onHandlerStateChange={onHandlerStateChangeUp}>
      <FlingGestureHandler
        key={'DOWN'}
        direction={Directions.DOWN}
        onHandlerStateChange={onHandlerStateChangeDown}>
        <SafeAreaView style={S.container}>
          <StatusBar barStyle="light-content" animated />
          <View style={S.container}>
            <FlatList
              data={data}
              scrollEnabled={false}
              renderItem={renderCard}
              contentContainerStyle={S.listContentContainer}
              CellRendererComponent={CellRendererComponent}
              keyExtractor={keyExtractor}
            />
          </View>
        </SafeAreaView>
      </FlingGestureHandler>
    </FlingGestureHandler>
  );
};

export default TravelUpList;

const S = StyleSheet.create({
  flex: { flex: 1 },
  container: { flex: 1, backgroundColor: '#1E1D1D' },
  image: {
    width: IMAGE_WIDTH,
    height: IMAGE_HEIGHT,
    resizeMode: 'cover',
    borderRadius: 16,
  },
  nameContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
  },
  name: {
    textTransform: 'uppercase',
    color: '#fff',
    fontSize: 38,
    fontWeight: '900',
  },
  listContentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    position: 'absolute',
  },
});
