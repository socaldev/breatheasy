import * as Location from 'expo-location'

export const getLocation = async () => {
	let { status } = await Location.requestForegroundPermissionsAsync()
	if (status !== 'granted') {
		return { errorMsg: 'Permission to access location was denied' }
	}

	let location = await Location.getCurrentPositionAsync({})
	return { ...location.coords }
}

