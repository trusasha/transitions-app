import React, { useCallback } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { SPACING, fonts, width } from '../config/theme';

const AVATAR_SIZE = 64;

/**
 * @typedef {{
 *   user: import('config/data/photography').PhotographyItem['user']
 * }} UserCardProps
 */

/** @param {UserCardProps} props */
const UserCard = ({ user }) => {
  const renderItem = useCallback(({ label, value }) => {
    return (
      <View key={label} style={S.detailsItem}>
        <Text style={S.detailValue}>{value}</Text>
        <Text style={S.detailLabel}>{label}</Text>
      </View>
    );
  }, []);

  const avatarSrc = { uri: user.avatar };

  return (
    <View style={S.card}>
      <View style={S.header}>
        <Image source={avatarSrc} style={S.avatar} />
        <View style={S.flex}>
          <Text numberOfLines={1} adjustsFontSizeToFit style={S.name}>
            {user.name}
          </Text>
          <Text style={S.job}>{user.job}</Text>
        </View>
      </View>
      <View style={S.detailsList}>{user.details.map(renderItem)}</View>
    </View>
  );
};

export default UserCard;

const S = StyleSheet.create({
  flex: { flex: 1 },
  card: {
    backgroundColor: '#fff',
    padding: SPACING * 2,
    width: width * 0.9,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING * 2,
  },
  avatar: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2,
    marginRight: SPACING * 2,
  },
  name: {
    ...fonts.montserratBold,
    fontSize: 22,
    marginBottom: SPACING / 3,
  },
  job: {
    ...fonts.montserratRegular,
    fontSize: 16,
    color: '#999',
  },
  detailsList: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  detailsItem: {
    alignItems: 'center',
  },
  detailLabel: {
    ...fonts.montserratRegular,
    color: '#999',
    fontSize: 11,
  },
  detailValue: {
    ...fonts.montserratBold,
    fontSize: 24,
    marginBottom: SPACING / 3,
  },
});
