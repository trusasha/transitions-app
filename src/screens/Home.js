import { fonts } from 'config/theme';
import React, { useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';

const screens = [
  { emoji: '🏖', screen: 'Transition1List' },
  { emoji: '✈️', screen: 'Transition2List' },
  { emoji: '⛰', screen: 'Transition3List' },
  { emoji: '📸', screen: 'Transition4List' },
];

export default function Home({ navigation }) {
  const renderItem = useCallback(
    ({ screen, emoji }, index) => {
      const onPress = () => navigation.push(screen);
      return (
        <TouchableOpacity style={S.button} onPress={onPress} key={`${index}`}>
          <Text style={S.buttonText} children={`Go To ${index + 1} Transition ${emoji}`} />
        </TouchableOpacity>
      );
    },
    [navigation],
  );

  return (
    <SafeAreaView style={S.flex}>
      <StatusBar hidden={false} animated />
      <View style={S.container}>
        <Text style={S.title} children={'Home'} />
        {screens.map(renderItem)}
      </View>
    </SafeAreaView>
  );
}

const S = StyleSheet.create({
  flex: { flex: 1 },
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    ...fonts.montserratBold,
  },
  button: {
    marginBottom: 12,
  },
  buttonText: {
    fontSize: 16,
    ...fonts.montserratRegular,
  },
});
