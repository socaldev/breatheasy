import React, { useState } from 'react'
import MapView, { Marker } from 'react-native-maps'
import { View, Button } from 'react-native'

const MyMapView = ( props ) => {
	const { navigation } = props
	const [ region, setRegion ] = useState(props.initialRegion)
	return (
		<View style={{ flex: 1 }}>
			<MapView
				style={{ flex: 1 }}
				initialRegion={props.initialRegion}
				region={region}
				showsUserLocation={true}
				onRegionChangeComplete={(region) => setRegion(region)}
				navigation={navigation}
			>
				<Marker coordinate={region} />
			</MapView>

			<Button
				title='Choose this location'
				onPress={() => {
					navigation.navigate('NewLocation', {
						latitude: region.latitude,
						longitude: region.longitude,
					})
				}}
			/>
		</View>
	)
}
export default MyMapView
