import React from 'react';
import { StyleSheet, View, Dimensions, Text } from 'react-native';

const { width } = Dimensions.get('screen');
const IMAGE_WIDTH = width * 0.86;

/**
 * @typedef {{
 *  key: string
 *  image: string
 *  name: string
 * }} CardItem
 */

const List = ({ navigation }) => {
  return (
    <View style={S.container}>
      <Text>Photography List</Text>
    </View>
  );
};

export default List;

const S = StyleSheet.create({
  flex: { flex: 1 },
  container: { flex: 1, backgroundColor: '#1E1D1D' },
});
