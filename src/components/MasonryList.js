import React, { useCallback, useEffect, useRef } from 'react';
import Masonry from 'react-native-masonry-layout';
import { View, Image, StyleSheet, LogBox } from 'react-native';
import { photographyImages } from '../config/data/photography';
import { width, SPACING } from '../config/theme';

LogBox.ignoreAllLogs();

export default function MasonryList() {
  /** @type {import('react').RefObject<Masonry>} */
  const ref = useRef(null);

  const renderItem = useCallback((item) => {
    const imageSrc = { uri: item.image };
    const imageStyle = { height: item.height };
    return (
      <View style={S.itemContainer}>
        <Image source={imageSrc} style={imageStyle} />
      </View>
    );
  }, []);

  useEffect(() => {
    if (ref.current) {
      const items = [...photographyImages, ...photographyImages].map((image, index) => {
        return {
          height: width * Math.max(0, Math.random()) + width / 4,
          image,
          key: String(index),
        };
      });
      ref.current.addItems(items);
    }
  }, []);

  return (
    <Masonry
      ref={ref}
      columns={2}
      style={S.container}
      contentContainerStyle={S.contentContainer}
      renderItem={renderItem}
    />
  );
}

const S = StyleSheet.create({
  container: { flex: 1, width },
  contentContainer: {
    padding: SPACING,
    paddingBottom: 40,
  },
  itemContainer: {
    margin: SPACING / 2,
    backgroundColor: '#fff',
    borderRadius: 0,
    overflow: 'hidden',
  },
});
