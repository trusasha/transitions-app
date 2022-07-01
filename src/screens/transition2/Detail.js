import GoBack from 'components/GoBack';
import React, { useCallback } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Animated,
  Image,
  FlatList,
  Dimensions,
} from 'react-native';
import { SharedElement } from 'react-navigation-shared-element';
import { ITEM_WIDTH, SPACING } from './List';
import * as Animatable from 'react-native-animatable';

const { width } = Dimensions.get('screen');
const zoomIn = {
  0: {
    opacity: 0,
    translateY: 200,
  },
  1: {
    opacity: 1,
    translateY: 0,
  },
};

const activityImage = { uri: 'https://miro.medium.com/max/4064/1*qYUvh-EtES8dtgKiBRiLsA.png' };

const Detail = ({ route }) => {
  /** @type {import('./List').LocationItem} */
  const item = route.params.item;

  const renderItem = useCallback(
    ({ item, index }) => (
      <Animatable.View
        animation={zoomIn}
        duration={700}
        delay={400 + index * 100}
        style={S.activityItem}>
        <Image style={S.activityImage} source={activityImage} />
        <Text children={`Activity #${item + 1}`} />
      </Animatable.View>
    ),
    [],
  );

  const keyExtractor = useCallback((item) => `${item}`, []);

  const { location, image, key } = item;
  return (
    <SafeAreaView style={S.flex}>
      <GoBack style={S.back} />
      <View style={S.imageContainer}>
        <SharedElement style={S.textContainer} id={`travel-title-${key}`}>
          <Animated.Text style={S.location} children={location} />
        </SharedElement>

        <SharedElement style={S.image} id={`travel-image-${key}`}>
          <Image style={S.image} resizeMode={'cover'} source={{ uri: image }} />
        </SharedElement>
      </View>
      <View style={S.activitiesContainer}>
        <Animatable.Text animation={zoomIn} duration={700} delay={400} style={S.activities}>
          Activities
        </Animatable.Text>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={S.activityContentContainer}
          data={[...Array(8).keys()]}
          style={S.list}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
        />
      </View>
    </SafeAreaView>
  );
};

Detail.sharedElements = (route, otherRoute, showing) => {
  const { item } = route.params;
  return [
    {
      id: `travel-image-${item.key}`,
    },
    {
      id: `travel-title-${item.key}`,
    },
  ];
};

export default Detail;

const S = StyleSheet.create({
  flex: { flex: 1 },
  container: {
    flex: 1,
  },
  imageContainer: {
    ...StyleSheet.absoluteFillObject,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
  },
  back: {
    top: 50,
  },
  location: {
    fontSize: 30,
    color: '#fff',
    fontWeight: '800',
    width: ITEM_WIDTH * 0.8,
    textTransform: 'uppercase',
    transform: [{ scale: 1.3 }, { translateX: SPACING * 1.5 }],
  },
  textContainer: {
    position: 'absolute',
    top: SPACING + 150,
    left: SPACING,
    zIndex: 10,
  },
  activitiesContainer: {
    position: 'absolute',
    bottom: 120,
    left: SPACING,
    zIndex: 10,
  },
  activities: {
    width: '100%',
    fontSize: 16,
    color: '#fff',
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  activityItem: {
    backgroundColor: '#fff',
    padding: SPACING,
    width: width * 0.33,
    height: width * 0.6,
    marginRight: 20,
    borderRadius: 18,
  },
  activityImage: {
    width: '100%',
    height: '70%',
    resizeMode: 'cover',
  },
  activityContentContainer: {
    paddingVertical: SPACING,
    overflow: 'visible',
  },
  list: { overflow: 'visible' },
});
