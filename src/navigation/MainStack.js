import { createSharedElementStackNavigator } from "react-navigation-shared-element";
import Home from "screens/Home";
import List from "screens/transition1/List";

export default function MainStack() {
  const Stack = createSharedElementStackNavigator();
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false, cardStyle: { backgroundColor: "white" } }}
    >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="List" component={List} />
    </Stack.Navigator>
  );
}
