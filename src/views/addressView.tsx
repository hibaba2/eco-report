import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, Button } from 'react-native';


export default function AddressView({ navigation }) {

  return (
    <View style={styles.container}>
      <Text>Soy Adrress</Text>
      <Button
        onPress={() => navigation.navigate('Home')}
        title="Go to Home"
      />
      <StatusBar style="auto" />
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
