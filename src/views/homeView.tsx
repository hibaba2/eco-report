import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, Button } from 'react-native';
import HomeScreen from '../components/homeComponents/homeComponent';


export default function HomeView() {

  return (
    <View style={styles.container}>
      <HomeScreen></HomeScreen>
    </View>
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
