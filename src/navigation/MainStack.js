import { createSharedElementStackNavigator } from 'react-navigation-shared-element';
import Home from 'screens/Home';
import Detail from 'screens/transition1/Detail';
import List from 'screens/transition1/List';

export default function MainStack() {
  const Stack = createSharedElementStackNavigator();
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false, cardStyle: { backgroundColor: 'white' } }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="List" component={List} />
      <Stack.Screen
        name="Detail"
        component={Detail}
        options={() => ({
          gestureEnabled: false,
          transitionSpec: {
            open: { animation: 'timing', config: { duration: 600 } },
            close: { animation: 'timing', config: { duration: 600 } },
          },
          cardStyleInterpolator: ({ current: { progress } }) => {
            return { cardStyle: { opacity: progress } };
          },
        })}
      />
    </Stack.Navigator>
  );
}
