// HomeStackNavigator.tsx

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen, { StackParamList } from '../components/homeComponents/homeComponent';
import DetailComponent from '../components/detailComponents/detailComponent';


const Stack = createStackNavigator<StackParamList>();

const HomeStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="DetailComponent" component={DetailComponent} />
    </Stack.Navigator>
  );
};

export default HomeStackNavigator;
