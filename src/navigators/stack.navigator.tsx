import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeView from '../views/homeView';
import AddressView from '../views/addressView';


export default function StackNavigator() {
    const Stack = createNativeStackNavigator();

    return (

        <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeView} />
            <Stack.Screen name="Address" component={AddressView} />
        </Stack.Navigator>

    );
}
