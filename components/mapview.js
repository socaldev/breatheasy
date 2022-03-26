import React, { useState } from 'react'
import MapView, { Marker } from 'react-native-maps'
import { View, Button } from 'react-native'

const MyMapView = (props) => {
	const { navigation } = props
	const [region, setRegion] = useState(props.initialRegion)
	const [marker, setMarker] = useState(props.initialRegion)
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
				onRegionChangeComplete={(region) => setRegion(region)}
				navigation={navigation}
				onPress={handleOnPress}
			>
				<Marker coordinate={marker} />
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
