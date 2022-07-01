import React from 'react';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';
import Home from 'screens/Home';
import Transition1List from 'screens/transition1/List';
import Transition1Detail from 'screens/transition1/Detail';
import Transition2List from 'screens/transition2/List';
import Transition2Detail from 'screens/transition2/Detail';
import Transition3List from 'screens/transition3/List';
import Transition3Detail from 'screens/transition3/Detail';
import Transition4List from 'screens/transition4/List';
import Transition4Detail from 'screens/transition4/Detail';

const options = {
  gestureEnabled: false,
  headerBackTitleVisible: false,
  cardStyleInterpolator: ({ current: { progress } }) => {
    return {
      cardStyle: {
        opacity: progress,
      },
    };
  },
};

export default function MainStack() {
  const Stack = createSharedElementStackNavigator();
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false, cardStyle: { backgroundColor: 'white' } }}>
      <Stack.Screen name="Home" component={Home} />

      <Stack.Screen name="Transition1List" component={Transition1List} />
      <Stack.Screen
        name="Transition1Detail"
        component={Transition1Detail}
        options={() => options}
      />

      <Stack.Screen name="Transition2List" component={Transition2List} />
      <Stack.Screen
        name="Transition2Detail"
        component={Transition2Detail}
        options={() => options}
      />

      <Stack.Screen name="Transition3List" component={Transition3List} />
      <Stack.Screen
        name="Transition3Detail"
        component={Transition3Detail}
        options={() => options}
      />

      <Stack.Screen name="Transition4List" component={Transition4List} options={() => options} />
      <Stack.Screen
        name="Transition4Detail"
        component={Transition4Detail}
        options={() => options}
      />
    </Stack.Navigator>
  );
}
