import React, { useCallback } from 'react';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';
import { fonts } from '../config/theme';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import * as Animatable from 'react-native-animatable';

/**
 * @typedef {{
 *  title?: boolean
 *  style?: import("react-native").ViewStyle
 * }} GoBackParams
 */

/**
 * @param {GoBackParams} props
 */
export default function GoBack({ title, style }) {
  const navigation = useNavigation();
  const onGoBack = useCallback(() => navigation.goBack(), []);
  const styles = [S.container];

  return (
    <Animatable.View
      animation={'fadeIn'}
      duration={700}
      delay={400}
      style={[S.absoluteContainer, style]}>
      <TouchableOpacity style={styles} onPress={onGoBack}>
        <AntDesign name="arrowleft" size={22} color={'#000'} />
        {title && <Text style={S.textStyle}>{title}</Text>}
      </TouchableOpacity>
    </Animatable.View>
  );
}

const S = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderRadius: 100,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowRadius: 15,
  },
  absoluteContainer: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 2,
  },
  textStyle: { ...fonts.montserratBold, fontSize: 12, marginLeft: 5 },
});
