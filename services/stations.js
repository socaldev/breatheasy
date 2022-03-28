import Constants from 'expo-constants'

const getStations = async (bounds) => {
    console.log('API call: getStations')
	const API_KEY = Constants.manifest.extra.WAQI_TOKEN
	const url = `https://api.waqi.info/map/bounds${API_KEY}&latlng=${bounds.topLeft.latitude},${bounds.topLeft.longitude},${bounds.bottomRight.latitude},${bounds.bottomRight.longitude}`
	const response = await fetch(url).then((response) => response.json())

	return response.data
}

export default getStations
