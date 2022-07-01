import GoBack from 'components/GoBack';
import data from 'config/data/data';
import { ICON_SIZE, SIZE, SPACING } from 'config/theme';
import React, { useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
import { SharedElement } from 'react-navigation-shared-element';

/**
 * @typedef {{
 *  title: string
 *  color: string
 * }} ListItem
 */

/**
 * @typedef {{
 *  imageUri: string
 *  title: string
 *  id: string
 * }} DataItem
 */

const { width } = Dimensions.get('screen');

/** @type {ListItem[]} */
const d = [
  {
    title: 'Sunny days',
    color: 'turquoise',
  },
  {
    title: 'Sand & beach',
    color: 'aquamarine',
  },
  {
    title: 'Coktails & Party',
    color: 'tomato',
  },
  {
    title: 'All-inclusive',
    color: '#A531F9',
  },
];

export default function List({ navigation }) {
  const snapToInterval = width * 0.74 + SPACING;

  /** @type {(item: ListItem, index: number) => string} */
  const keyExtractor = useCallback(({ color }) => color, []);

  /** @type {import("react-native").ListRenderItem<ListItem>} */
  const headerListRenderItem = useCallback(
    ({ item: { title, color } }) => (
      <View style={S.listItemSizeContainer}>
        <View style={[{ backgroundColor: color }, S.listItemContainer]}>
          <Text style={S.listItemText} children={title} />
        </View>
      </View>
    ),
    [],
  );

  const bottomListRenderItem = useCallback(
    /** @param {DataItem} item */
    (item) => {
      const onPress = () => navigation.push('Transition1Detail', { item });
      const source = { uri: item.imageUri };

      return (
        <TouchableOpacity key={item.id} style={S.bottomListItemContainer} onPress={onPress}>
          <SharedElement id={`item.${item.id}.photo`}>
            <View style={S.bottomListItem}>
              <Image source={source} style={S.bottomListImage} />
            </View>
          </SharedElement>
        </TouchableOpacity>
      );
    },
    [navigation],
  );

  return (
    <SafeAreaView style={S.flex}>
      <View style={S.container}>
        <GoBack />
        <StatusBar hidden animated />
        <FlatList
          data={d}
          keyExtractor={keyExtractor}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={S.listContentContainer}
          snapToInterval={snapToInterval}
          decelerationRate="fast"
          renderItem={headerListRenderItem}
        />
        <View style={S.bottomListContainer}>{data.map(bottomListRenderItem)}</View>
      </View>
    </SafeAreaView>
  );
}

const S = StyleSheet.create({
  flex: { flex: 1 },
  container: {
    flex: 1,
  },
  listContentContainer: { padding: SPACING },
  listItemSizeContainer: {
    width: width * 0.74,
    height: width * 0.44,
    marginRight: SPACING,
  },
  listItemContainer: {
    flex: 1,
    padding: SPACING,
    borderRadius: 16,
  },
  listItemText: {
    color: 'white',
    fontSize: 24,
    textTransform: 'uppercase',
    letterSpacing: -1,
    fontWeight: '800',
  },
  bottomListItem: {
    height: SIZE,
    width: SIZE,
    borderRadius: SIZE / 2,
    backgroundColor: 'rgba(0,0,0,0.05)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomListContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    marginVertical: 20,
  },
  bottomListItemContainer: {
    padding: SPACING,
    alignItems: 'center',
  },
  bottomListImage: {
    width: ICON_SIZE,
    height: ICON_SIZE,
  },
});
