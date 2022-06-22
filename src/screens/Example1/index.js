import React from 'react';
import { observer } from 'mobx-react-lite';
import { View, Text } from 'react-native';
import useStyles from './useStyles';

const Example1 = () => {
  const S = useStyles();

  return (
    <View style={S.container}>
      <Text>Example1</Text>
    </View>
  );
};

export default observer(Example1);
