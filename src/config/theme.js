import { Dimensions } from 'react-native';

export const { width, height } = Dimensions.get('window');
export const SIZE = 64;
export const ICON_SIZE = SIZE * 0.6;
export const SPACING = 12;

export const foodConfig = {
  colors: {
    orange: '#FB9B06',
  },
};

export const fonts = {
  montserratRegular: {
    fontFamily: 'Montserrat_400Regular',
  },
  montserratBold: {
    fontFamily: 'Montserrat_700Bold',
  },
  sourceSansProBold: {
    fontFamily: 'SourceSansPro_700Bold',
  },
  playfairDisplayRegular: {
    fontFamily: 'PlayfairDisplay_400Regular',
  },
  playfairDisplayMedium: {
    fontFamily: 'PlayfairDisplay_500Medium',
  },
};
