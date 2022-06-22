import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { configStore } from 'stores';
import Home from 'screens/Home';
import Example1 from 'screens/Example1';

const Stack = createNativeStackNavigator();
const R = configStore.routeNameLocalization;

export const MainStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={R.Home} component={Home} />
      <Stack.Screen name={R.Example1} component={Example1} />
    </Stack.Navigator>
  );
};
