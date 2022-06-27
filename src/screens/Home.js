import { fonts } from 'config/theme';
import React, { useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';

export default function Home({ navigation }) {
  const onGoTransition1 = useCallback(() => navigation.navigate('List'), []);
  const onGoTransition2 = useCallback(() => navigation.navigate('TravelList'), []);

  return (
    <SafeAreaView style={S.flex}>
      <StatusBar hidden={false} animated />
      <View style={S.container}>
        <Text style={S.title}>Home</Text>

        <TouchableOpacity style={S.button} onPress={onGoTransition1}>
          <Text style={S.buttonText}>Go To 1 Transition 🏖</Text>
        </TouchableOpacity>
        <TouchableOpacity style={S.button} onPress={onGoTransition2}>
          <Text style={S.buttonText}>Go To 2 Transition ✨</Text>
        </TouchableOpacity>
        <TouchableOpacity style={S.button} onPress={onGoTransition1}>
          <Text style={S.buttonText}>Go To 3 Transition ✨</Text>
        </TouchableOpacity>
        <TouchableOpacity style={S.button} onPress={onGoTransition1}>
          <Text style={S.buttonText}>Go To 4 Transition ✨</Text>
        </TouchableOpacity>
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
