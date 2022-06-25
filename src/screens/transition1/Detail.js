import React, { useCallback, useEffect, useRef } from 'react';
import { Dimensions, View, Text, Image, Animated, StyleSheet } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { SharedElement } from 'react-navigation-shared-element';
import { AntDesign } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import data from 'config/data/data';
import { ICON_SIZE, SIZE, SPACING } from 'config/theme';

const AnimatedAntDesign = Animated.createAnimatedComponent(AntDesign);

const { width } = Dimensions.get('window');

const Detail = ({ navigation, route }) => {
  const { item } = route.params;
  const selectedItemIndex = data.findIndex((x) => x.id === item.id);
  const activeIndex = useRef(new Animated.Value(selectedItemIndex)).current;
  const animatedValue = useRef(new Animated.Value(selectedItemIndex)).current;
  const mountedAnimated = useRef(new Animated.Value(0)).current;
  const ref = useRef(null);

  const animation = (toValue, delay = 0) =>
    Animated.timing(mountedAnimated, {
      toValue,
      delay,
      duration: 400,
      useNativeDriver: true,
    });

  useEffect(() => {
    Animated.parallel([
      Animated.spring(animatedValue, {
        toValue: activeIndex,
        useNativeDriver: true,
      }),
      animation(1, 400),
    ]).start();
  }, [item]);

  const s = SIZE + 14 * 2;
  const translateX = animatedValue.interpolate({
    inputRange: [0, 1, 2],
    outputRange: [0, -s, -s * 2],
  });

  const translateY = mountedAnimated.interpolate({
    inputRange: [0, 1],
    outputRange: [50, 0],
  });
  const translateXIcon = mountedAnimated.interpolate({
    inputRange: [0, 1],
    outputRange: [20, 0],
  });

  const onBack = useCallback(() => {
    animation(0).start();
    navigation.goBack();
  }, []);

  /** @type {(index: number) => void} */
  const onPressHeaderItem = useCallback((index) => {
    activeIndex.setValue(index);
    ref.current.scrollToIndex({
      index,
      animated: true,
    });
  }, []);

  /** @type {(index: number) => Animated.AnimatedInterpolation[]} */
  const getHeaderItemStyles = useCallback((index) => {
    const opacity = animatedValue.interpolate({
      inputRange: [index - 1, index, index + 1],
      outputRange: [0.3, 1, 0.3],
      extrapolate: 'clamp',
    });
    const scale = animatedValue.interpolate({
      inputRange: [index - 1, index, index + 1],
      outputRange: [1, 1.2, 1],
      extrapolate: 'clamp',
    });
    return [opacity, scale];
  }, []);

  /** @type {(item:import('./List').DataItem, index: number ) => JSX.Element} */
  const headerRenderItem = useCallback((item, index) => {
    const onPress = () => onPressHeaderItem(index);
    const [opacity, scale] = getHeaderItemStyles(index);

    const animatedContentStyle = [{ opacity }, S.headerItemContent];
    const animatedTextStyle = [{ opacity, transform: [{ scale }] }, S.headerItemText];
    const source = { uri: item.imageUri };

    return (
      <TouchableOpacity key={item.id} style={S.headerItemContainer} onPress={onPress}>
        <SharedElement id={`item.${item.id}.photo`}>
          <Animated.View style={animatedContentStyle}>
            <Image source={source} style={S.image} />
          </Animated.View>
        </SharedElement>
        <Animated.Text style={animatedTextStyle} children={item.title} />
      </TouchableOpacity>
    );
  }, []);

  const getItemLayout = useCallback(
    /** @param {number} index */
    (data, index) => ({
      length: width,
      offset: width * index,
      index,
    }),
    [],
  );

  const onMomentumScrollEnd = useCallback((ev) => {
    const index = Math.floor(ev.nativeEvent.contentOffset.x / width);
    activeIndex.setValue(index);
  }, []);

  const renderContentItem = useCallback(
    ({ item }) => (
      <ScrollView style={S.contentScroll}>
        <View style={S.contentContainer}>
          <Text style={S.contentText}>{Array(50).fill(`${item.title} inner text \n`)}</Text>
        </View>
      </ScrollView>
    ),
    [],
  );

  const backAnimatedStyle = {
    padding: 12,
    opacity: mountedAnimated,
    transform: [
      {
        translateX: translateXIcon,
      },
    ],
  };

  const containerAnimatedStyle = [
    {
      marginLeft: width / 2 - s / 2,
      transform: [
        {
          translateX,
        },
      ],
    },
    S.container,
  ];

  return (
    <SafeAreaView style={S.flex}>
      <AnimatedAntDesign
        name="arrowleft"
        size={24}
        style={backAnimatedStyle}
        color="#333"
        onPress={onBack}
      />
      <Animated.View style={containerAnimatedStyle}>{data.map(headerRenderItem)}</Animated.View>
      <Animated.FlatList
        style={{ opacity: mountedAnimated, transform: [{ translateY }] }}
        ref={ref}
        data={data}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        initialScrollIndex={selectedItemIndex}
        nestedScrollEnabled
        getItemLayout={getItemLayout}
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={onMomentumScrollEnd}
        renderItem={renderContentItem}
      />
    </SafeAreaView>
  );
};

Detail.sharedElements = (route, otherRoute, showing) =>
  data.map((i) => ({
    id: `item.${i.id}.photo`,
    align: 'center-bottom',
  }));

export default Detail;

const S = StyleSheet.create({
  flex: { flex: 1 },
  container: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignSelf: 'flex-start',
    justifyContent: 'space-between',
  },
  headerItemContainer: {
    padding: 14,
    alignItems: 'center',
  },
  headerItemContent: {
    height: SIZE,
    marginBottom: 4,
    width: SIZE,
    borderRadius: SIZE / 2,
    backgroundColor: 'rgba(0,0,0,0.05)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: ICON_SIZE,
    height: ICON_SIZE,
  },
  headerItemText: { fontSize: 10 },
  contentScroll: {
    width: width - SPACING * 2,
    margin: SPACING,
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: SIZE / 4,
  },
  contentContainer: { padding: SPACING },
  contentText: { fontSize: 16 },
});
