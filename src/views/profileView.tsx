import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, Button } from 'react-native';
import ProfileScreen from '../components/profileComponents/profileComponent';


export default function ProfileView() {

  return (
    <View style={styles.container}>
      <ProfileScreen></ProfileScreen>
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