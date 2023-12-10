import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeView from '../views/homeView';
import CameraView from '../views/cameraView';
import ProfileView from '../views/profileView';
//import Ionicons from 'react-native-vector-icons/Ionicons';
import { Ionicons } from '@expo/vector-icons';



const Tab = createBottomTabNavigator();

export default function MyTabs() {
  return (
    <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            

            if (route.name === 'Home') {
              iconName = focused
                ? 'home-outline'
                : 'home-outline';
            } 
            else if (route.name === 'Camera') {
              iconName = focused 
                ? 'camera-outline' 
                : 'camera-outline';
            }
            else if (route.name === 'Profile') {
              iconName = focused 
                ? 'person-outline' 
                : 'person-outline';
            }
            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Home" component={HomeView} />
        <Tab.Screen name="Camera" component={CameraView} />
        <Tab.Screen name="Profile" component={ProfileView} />
    </Tab.Navigator>
  );
}
