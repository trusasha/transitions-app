import * as React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Details() {
  return (
    <View style={S.container}>
      <Text>Details Screen</Text>
    </View>
  );
}

const S = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
