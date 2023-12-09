import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeView from '../views/homeView';
import AddressView from '../views/addressView';


export default function DrawerNavigator() {
    const Drawer = createDrawerNavigator();

    return (
        <Drawer.Navigator>
          <Drawer.Screen name="Home" component={HomeView} />
          <Drawer.Screen name="Address" component={AddressView} />
        </Drawer.Navigator>
    
      );
}
  