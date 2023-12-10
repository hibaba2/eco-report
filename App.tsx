//import { NavigationContainer } from '@react-navigation/native';
//import StackNavigator from './src/navigators/stack.navigator';
//import DrawerNavigator from './src/navigators/drawer.navigator';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { AuthView } from './src/views/AuthView';
import { DatabaseView } from './src/views/DatabaseView';

export default function App() {
  return (
    <AuthView />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});