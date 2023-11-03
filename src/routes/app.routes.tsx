// In App.js in a new project

import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SignIn } from '../screens/SignIn';
import { Home } from '../screens/Home';
import { Departure } from '../screens/Departure';


const Stack = createNativeStackNavigator();

function AppRoutes() {
  return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="home" component={Home} />
        <Stack.Screen name="departure" component={Departure} />
      </Stack.Navigator>
  );
}

export default AppRoutes;
