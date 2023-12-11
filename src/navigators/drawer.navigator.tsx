import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeView from '../views/homeView';
import AddressView from '../views/addressView';
import HomeStackNavigator from './stackhome';


export default function DrawerNavigator() {
    const Drawer = createDrawerNavigator();

    return (
        <Drawer.Navigator>
          <Drawer.Screen name="Home" component={HomeStackNavigator} />
          <Drawer.Screen name="Address" component={AddressView} />
        </Drawer.Navigator>
    
      );
} 
  