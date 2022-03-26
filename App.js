import React, { Fragment } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import MainScreen from './screens/main.js'
import InfoScreen from './screens/info.js'
import MapScreen from './screens/map.js'
import { SafeAreaView, StatusBar } from 'react-native'

const Tab = createMaterialBottomTabNavigator()

export default function App() {
	return (
		<Fragment>
			<StatusBar backgroundColor={'black'} />
	
				<NavigationContainer>
					<Tab.Navigator
						initialRouteName='Home'
						barStyle={{ backgroundColor: '#606569' }}
					>
						<Tab.Screen
							name='Home'
							component={MainScreen}
							options={{
								tabBarLabel: 'Home',
								tabBarIcon: ({ color, size }) => (
									<Icon name='home' color={color} size={25} />
								),
							}}
						/>
						<Tab.Screen
							name='Map'
							component={MapScreen}
							options={{
								tabBarLabel: 'Choose Location',
								tabBarIcon: ({ color, size }) => (
									<Icon name='map' color={color} size={25} />
								),
							}}
						/>
						<Tab.Screen
							name='Info'
							component={InfoScreen}
							options={{
								tabBarLabel: 'More Info',
								tabBarIcon: ({ color, size }) => (
									<Icon name='information' color={color} size={25} />
								),
							}}
						/>
					</Tab.Navigator>
				</NavigationContainer>

			</Fragment>
	)
}
