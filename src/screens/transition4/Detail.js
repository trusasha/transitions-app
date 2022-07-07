import UserCard from 'components/UserCard';
import React, { useCallback, useEffect, useRef } from 'react';
import { StyleSheet, View, Dimensions, Image, ScrollView } from 'react-native';
import { SharedElement } from 'react-navigation-shared-element';
import * as Animatable from 'react-native-animatable';
import { height, SPACING } from 'config/theme';
import MasonryList from 'components/MasonryList';
import { AntDesign } from '@expo/vector-icons';

const { width } = Dimensions.get('screen');

/**
 * @typedef {{
 *  key: string
 *  image: string
 *  name: string
 * }} CardItem
 */

const Detail = ({ navigation, route }) => {
  const { item } = route.params;
  const scrollRef = useRef(null);
  const goBackTimeout = useRef();
  const hasScrolled = useRef(false);

  useEffect(() => {
    return () => {
      clearTimeout(goBackTimeout.current);
      goBackTimeout.current = undefined;
    };
  }, []);

  const onBack = useCallback(() => {
    scrollRef.current.scrollTo({ y: 0, animated: true });
    setTimeout(
      () => {
        navigation.goBack();
      },
      hasScrolled.current ? 270 : 0,
    );
  }, [hasScrolled, navigation]);

  const onMomentumScrollEnd = useCallback((ev) => {
    hasScrolled.current = ev.nativeEvent.contentOffset.y > 1;
  }, []);

  return (
    <View style={S.container}>
      <AntDesign name="arrowleft" size={28} style={S.goBack} color={'#fff'} onPress={onBack} />
      <SharedElement id={`item-${item.key}-image`} style={S.imageContainer}>
        <Image source={{ uri: item.image }} style={S.image} />
      </SharedElement>
      <ScrollView
        onMomentumScrollEnd={onMomentumScrollEnd}
        ref={scrollRef}
        contentContainerStyle={S.contentContainer}>
        <SharedElement id={`item-${item.key}-card`} style={S.cardContainer}>
          <UserCard user={item.user} />
        </SharedElement>
        <Animatable.View
          useNativeDriver
          animation="fadeInUp"
          duration={800}
          delay={200}
          style={S.listContainer}>
          <MasonryList />
        </Animatable.View>
      </ScrollView>
    </View>
  );
};

Detail.sharedElements = (route) => {
  const { item } = route.params;
  return [
    {
      id: `item-${item.key}-image`,
    },
    {
      id: `item-${item.key}-card`,
    },
    {
      id: `item-${item.key}-bg`,
    },
  ];
};

export default Detail;

const S = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  imageContainer: { position: 'absolute', top: 0 },
  image: {
    width: width,
    height: height / 2,
    resizeMode: 'cover',
    padding: SPACING * 2,
    paddingBottom: SPACING,
    justifyContent: 'flex-end',
  },
  goBack: {
    padding: 12,
    position: 'absolute',
    top: 30,
    left: 20,
    zIndex: 2,
  },
  contentContainer: {
    alignItems: 'center',
  },
  cardContainer: {
    marginTop: height * 0.4,
    marginBottom: SPACING * 2,
  },
  listContainer: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,1)',
  },
});
