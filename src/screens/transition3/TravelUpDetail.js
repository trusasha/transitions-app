import { avatars } from 'config/data/travelup';
import React, { useCallback, useRef } from 'react';
import { StyleSheet, View, SafeAreaView, Dimensions, StatusBar, Text, Image } from 'react-native';
import { SharedElement } from 'react-navigation-shared-element';
import * as Animatable from 'react-native-animatable';
import { AntDesign } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('screen');

export const ITEM_WIDTH = width * 0.68;
export const SPACING = 20;

const Height = () => (
  <View>
    <Text style={S.heading} children={'Height'} />
    <View style={S.valueContainer}>
      <Text style={S.number} children={Math.floor(Math.random() * 2200) + 1000} />
      <Text style={S.numberType} children={'m'} />
    </View>
  </View>
);

const Distance = () => (
  <View>
    <Text style={S.heading} children={'Distance'} />
    <View style={S.valueContainer}>
      <Text style={S.number} children={Math.floor(Math.random() * 40) + 20} />
      <Text style={S.numberType} children={'km'} />
    </View>
  </View>
);

const Avatars = () => {
  const renderAvatar = (uri, index) => {
    const style = { zIndex: avatars.length - index, marginLeft: index === 0 ? 0 : -20 };
    return <Image style={[S.avatar, style]} key={index} source={{ uri }} />;
  };

  return (
    <View>
      <Text style={S.heading} children={'Your team'} />
      <View style={S.avatarsContainer}>{avatars.map(renderAvatar)}</View>
    </View>
  );
};

const TravelUpDetail = ({ navigation, route }) => {
  /** @type {import('react').RefObject<Animatable.View>} */
  const bottomRef = useRef(null);
  /** @type {import('react').RefObject<Animatable.View>} */
  const topRef = useRef(null);
  const { image, name, key } = route.params.item;

  const onBack = useCallback(() => {
    Promise.all([topRef.current.fadeOut(300), bottomRef.current.fadeOut(300)]).then(() =>
      navigation.goBack(),
    );
  }, [navigation]);

  return (
    <View style={S.flex}>
      <StatusBar hidden animated />
      <View style={S.container}>
        <SharedElement id={`card-${key}-image`}>
          <Image source={{ uri: image }} style={S.image} />
        </SharedElement>
      </View>
      <Animatable.View
        ref={topRef}
        animation="fadeIn"
        duration={800}
        delay={300}
        style={S.absoluteOverlay}>
        <AntDesign
          name="arrowleft"
          size={28}
          style={S.backButton}
          color={'#fff'}
          onPress={onBack}
        />
        <LinearGradient colors={['transparent', '#000', '#000']} style={S.gradient} />
      </Animatable.View>
      <View style={S.content}>
        <View style={S.nameContainer}>
          <SharedElement id={`card-${key}-title`}>
            <Text style={S.name} adjustsFontSizeToFit={true} numberOfLines={1}>
              {name}
            </Text>
          </SharedElement>
        </View>
        <Animatable.View
          ref={bottomRef}
          animation="fadeIn"
          duration={800}
          delay={600}
          style={S.bottomInfoContainer}>
          <Avatars />
          <Distance />
          <Height />
        </Animatable.View>
      </View>
    </View>
  );
};

TravelUpDetail.sharedElements = (route, otherRoute, showing) => {
  const { key } = route.params.item;
  return [
    {
      id: `card-${key}-image`,
    },
    {
      id: `card-${key}-title`,
    },
  ];
};

export default TravelUpDetail;

const S = StyleSheet.create({
  flex: { flex: 1 },
  container: { flex: 1, backgroundColor: '#1E1D1D' },
  absoluteOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  image: {
    width,
    height,
    resizeMode: 'cover',
    ...StyleSheet.absoluteFillObject,
  },
  heading: {
    color: '#fff',
    fontWeight: '300',
    marginBottom: 8,
  },
  backButton: {
    padding: 12,
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 2,
  },
  valueContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  avatarsContainer: {
    flexDirection: 'row',
  },
  number: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 32,
    marginRight: 2,
    marginBottom: -5,
  },
  numberType: {
    color: '#fff',
    fontSize: 12,
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 26,
    borderWidth: 4,
    borderColor: '#000',
  },
  content: {
    flex: 1,
    position: 'absolute',
    bottom: 70,
    justifyContent: 'flex-end',
  },
  nameContainer: {
    alignSelf: 'flex-start',
    padding: 20,
  },
  name: {
    textTransform: 'uppercase',
    color: '#fff',
    fontSize: 62,
    fontWeight: '900',
  },
  bottomInfoContainer: {
    width,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: height / 2,
  },
});
