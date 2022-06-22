/**
 * @type {(
 * fontSize: number | undefined,
 * fontWeight: "normal" | "bold" | "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900",
 * lineHeight: number | undefined,
 * color?: import("react-native").ColorValue | undefined,
 * ) => import("react-native").TextStyle}
 * */
const getTextStyles = (fontSize, fontWeight, lineHeight, color) => {
  return {
    fontSize,
    fontWeight,
    lineHeight,
    color,
  };
};

export default getTextStyles;
