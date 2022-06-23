import { fonts } from "config/theme";
import React, { useCallback } from "react";
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from "react-native";

export default function Home({ navigation }) {
  const onGoTransition1 = useCallback(() => navigation.navigate("List"), []);

  return (
    <SafeAreaView style={S.flex}>
      <View style={S.container}>
        <Text style={S.title}>Home</Text>

        <TouchableOpacity style={S.button} onPress={onGoTransition1}>
          <Text style={S.buttonText}>Go To 1 Transition ✨</Text>
        </TouchableOpacity>
        <TouchableOpacity style={S.button} onPress={onGoTransition1}>
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
