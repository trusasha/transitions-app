import React from 'react';
import { StyleSheet, View, Dimensions, Text } from 'react-native';

const { width } = Dimensions.get('screen');

/**
 * @typedef {{
 *  key: string
 *  image: string
 *  name: string
 * }} CardItem
 */

const Detail = ({ navigation, route }) => {
  return (
    <View style={S.container}>
      <Text>Photography Detail</Text>
    </View>
  );
};

export default Detail;

const S = StyleSheet.create({
  flex: { flex: 1 },
  container: { flex: 1, backgroundColor: '#1E1D1D' },
});
