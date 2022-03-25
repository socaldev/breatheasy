import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LocationScreen from './newlocation';
import MapContainer from '../containers/mapcontainer';
const Stack = createStackNavigator();

export default function MapScreen() {
    return (
        <Stack.Navigator>
            <Stack.Screen options={{ headerShown: false, }} name="MapScreen" component={MapContainer} />
            <Stack.Screen  options={{ title: 'Select Another Location' }}name="NewLocation" component={LocationScreen} />
        </Stack.Navigator>
    )
}