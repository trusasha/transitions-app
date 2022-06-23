import GoBack from "components/GoBack";
import * as React from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";

export default function List() {
  return (
    <SafeAreaView>
      <View style={S.container}>
        <GoBack />
        <Text>List Screen</Text>
      </View>
    </SafeAreaView>
  );
}

const S = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "red",
  },
});
