import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './src/navigators/stack.navigator';
import DrawerNavigator from './src/navigators/drawer.navigator';



export default function App() {

  return (

    <NavigationContainer>
      <DrawerNavigator />
    </NavigationContainer>

  );
}