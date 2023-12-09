import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, Button } from 'react-native';


export default function HomeView({ navigation }) {

  return (
    <View style={styles.container}>
      <Text>Soy Home</Text>
      <Button
        onPress={() => navigation.navigate('Address')}
        title="Go to Address"
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
