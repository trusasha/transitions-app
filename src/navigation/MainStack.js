import { Easing } from 'react-native';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';
import Home from 'screens/Home';
import Detail from 'screens/transition1/Detail';
import List from 'screens/transition1/List';

const options = {
  gestureEnabled: false,
  headerBackTitleVisible: false,
  transitionSpec: {
    open: {
      animation: 'timing',
      config: { duration: 400, easing: Easing.inOut(Easing.ease) },
    },
    close: {
      animation: 'timing',
      config: { duration: 400, easing: Easing.inOut(Easing.ease) },
    },
  },
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
      <Stack.Screen name="List" component={List} />
      <Stack.Screen name="Detail" component={Detail} options={() => options} />
    </Stack.Navigator>
  );
}
