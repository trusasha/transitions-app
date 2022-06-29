import { createSharedElementStackNavigator } from 'react-navigation-shared-element';
import Home from 'screens/Home';
import Detail from 'screens/transition1/Detail';
import List from 'screens/transition1/List';
import TravelDetail from 'screens/transition2/TravelDetail';
import TravelList from 'screens/transition2/TravelList';
import TravelUpDetail from 'screens/transition3/TravelUpDetail';
import TravelUpList from 'screens/transition3/TravelUpList';

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
      <Stack.Screen name="List" component={List} />
      <Stack.Screen name="Detail" component={Detail} options={() => options} />
      <Stack.Screen name="TravelList" component={TravelList} />
      <Stack.Screen name="TravelDetail" component={TravelDetail} options={() => options} />
      <Stack.Screen name="TravelUpList" component={TravelUpList} />
      <Stack.Screen name="Transition3Detail" component={TravelUpDetail} options={() => options} />
    </Stack.Navigator>
  );
}
