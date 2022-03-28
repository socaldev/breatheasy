import React, { useState, useEffect } from 'react'
import { View } from 'react-native'
import MapInput from '../components/mapinput'
import MyMapView from '../components/mapview'
import { getLocation } from '../services/location-service'
import getStations from '../services/stations'

const MapContainer = (props) => {
	const { navigation } = props
	const [initialRegion, setInitialRegion] = useState({})
	const [initialBounds, setInitialBounds] = useState({})
	const [initialStations, setInitialStations] = useState([])

	useEffect(async () => {
		await getLocation()
			.then((location) => {
				const { latitude, longitude } = location
				const region = {
					latitude,
					longitude,
					latitudeDelta: 0.15,
					longitudeDelta: 0.15,
				}
				setInitialRegion(region)
				return region
			})
			.then((region) => {
				const bounds = {
					topLeft: {
						latitude: region.latitude + region.latitudeDelta / 2,
						longitude: region.longitude - region.longitudeDelta / 2,
					},
					bottomRight: {
						latitude: region.latitude - region.latitudeDelta / 2,
						longitude: region.longitude + region.longitudeDelta / 2,
					},
				}
				setInitialBounds(bounds)
				return bounds
			})
			.then(async (bounds) => {
				await getStations(bounds).then((stations) => {
					('initialStations:',stations)
					setInitialStations(stations)
					return
				})
			})
	}, [])

	const getCoordsFromName = (loc) => {
		const { lat, lng } = loc
		navigation.navigate('NewLocation', {
			latitude: lat,
			longitude: lng,
		})
	}

	return (
		<View style={{ flex: 1 }}>
			<View style={{ position: 'absolute', width: '100%', zIndex: 99 }}>
				<MapInput notifyChange={(loc) => getCoordsFromName(loc)} />
			</View>
			{initialRegion.latitude && initialRegion.longitude ? (
				<MyMapView
					navigation={navigation}
					initialBounds={initialBounds}
					initialRegion={initialRegion}
					initialStations={initialStations}
				/>
			) : null}
		</View>
	)
}

export default MapContainer
