import React, { useState } from 'react'
import MapView, { Marker } from 'react-native-maps'
import { View, Button, Text } from 'react-native'
import getStations from '../services/stations'
import getAqiMeta from '../helpers/colorHelper'

//TODO: Limit API calls, use a cache?

//TODO: Add a button to reset the map to the initial region

//TODO: Add info to Callout

const MyMapView = (props) => {
	const { navigation } = props
	const [region, setRegion] = useState(props.initialRegion)
	const [marker, setMarker] = useState(props.initialRegion)
	const [stations, setStations] = useState(props.initialStations)
	const [bounds, setBounds] = useState(props.initialBounds)

	const handleRegionChange = async (region) => {
		setRegion(region)
		setBounds({
			topLeft: {
				latitude: region.latitude + region.latitudeDelta / 2,
				longitude: region.longitude - region.longitudeDelta / 2,
			},
			bottomRight: {
				latitude: region.latitude - region.latitudeDelta / 2,
				longitude: region.longitude + region.longitudeDelta / 2,
			},
		})
		await getStations(bounds).then((stationArray) => {
			if (stationArray.length > 0) {
				setStations(stationArray)
			}
		}).catch((err) => {console.log('Error: mapview.js, line 27')})
	}

	const handleOnPress = (e) => {
		const { latitude, longitude } = e.nativeEvent.coordinate
		setRegion((prevRegion) => ({
			...prevRegion,
			latitude,
			longitude,
		}))
		setMarker({
			latitude,
			longitude,
			latitudeDelta: region.latitudeDelta,
			longitudeDelta: region.longitudeDelta,
		})
	}

	return (
		<View style={{ flex: 1 }}>
			<MapView
				style={{ flex: 1 }}
				initialRegion={props.initialRegion}
				region={region}
				showsUserLocation={true}
				onRegionChangeComplete={(region) => {
					handleRegionChange(region)
				}}
				navigation={navigation}
				onPress={handleOnPress}
			>
				<Marker coordinate={marker} pinColor={'#66BEF5'} />
				{stations.length > 0
					? stations.map((marker, index) => {
							const markerColor = getAqiMeta(marker.aqi).aqiColor
							return (
								<Marker
									key={index}
									coordinate={{ latitude: marker.lat, longitude: marker.lon }}
									title={marker.aqi}
									onPress={handleOnPress}
								>
									<View
										style={{
											backgroundColor: markerColor,
											borderRadius: 7,
											padding: 5,
											borderColor: 'grey',
										}}
									>
										<Text style={{ color: 'white' }}>{marker.aqi}</Text>
									</View>
								</Marker>
							)
					  })
					: null}
			</MapView>

			<Button
				title='Choose this location'
				onPress={() => {
					navigation.navigate('NewLocation', {
						latitude: marker.latitude,
						longitude: marker.longitude,
					})
				}}
			/>
		</View>
	)
}

export default MyMapView
