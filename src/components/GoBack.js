import React, { useCallback } from "react";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import { View } from "react-native-animatable";
import { fonts } from "../config/theme";
import { Text, TouchableOpacity, StyleSheet } from "react-native";

export default function GoBack() {
  const navigation = useNavigation();
  const onGoBack = useCallback(() => navigation.goBack(), []);

  return (
    <TouchableOpacity style={S.container} onPress={onGoBack}>
      <AntDesign name="arrowleft" style={S.iconStyle} size={22} color={"#000"} />
      <Text style={S.textStyle}>Home</Text>
    </TouchableOpacity>
  );
}

const S = StyleSheet.create({
  container: {
    backgroundColor: "rgba(255,255,255,0.8)",
    borderRadius: 100,
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    position: "absolute",
    top: 20,
    left: 20,
    zIndex: 2,
    shadowColor: "black",
    shadowOpacity: 0.2,
    shadowRadius: 15,
  },
  iconStyle: { marginRight: 5 },
  textStyle: { ...fonts.montserratBold, fontSize: 12 },
});
