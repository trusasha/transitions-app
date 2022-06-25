import React, { useCallback } from "react";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import { View } from "react-native-animatable";
import { fonts } from "../config/theme";
import { Text, TouchableOpacity, StyleSheet } from "react-native";

/**
 * @typedef {{
 *  title?: boolean
 * }} GoBackParams
 */

/**
 * @param {GoBackParams} props
 */
export default function GoBack({ title }) {
  const navigation = useNavigation();
  const onGoBack = useCallback(() => navigation.goBack(), []);

  return (
    <TouchableOpacity style={S.container} onPress={onGoBack}>
      <AntDesign name="arrowleft" size={22} color={"#000"} />
      {title && <Text style={S.textStyle}>{title}</Text>}
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
  textStyle: { ...fonts.montserratBold, fontSize: 12, marginLeft: 5 },
});
