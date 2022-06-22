import React from 'react';
import { observer } from 'mobx-react-lite';
import { View, Text, TouchableOpacity } from 'react-native';
import useStyles from './useStyles';
import useNavigate from 'hooks/useNavigate';
import { configStore } from 'stores';

const Home = () => {
  const S = useStyles();
  const R = configStore.routeNameLocalization;

  const navigate = useNavigate();

  return (
    <View style={S.container}>
      <Text>Home</Text>
      <TouchableOpacity onPress={() => navigate(R.Example1)}>
        <Text>Go to example 1</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigate(R.Example2)}>
        <Text>Go to example 2</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigate(R.Example3)}>
        <Text>Go to example 3</Text>
      </TouchableOpacity>
    </View>
  );
};

export default observer(Home);
