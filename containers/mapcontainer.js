import React from 'react'
import { View } from 'react-native'
import MapInput from '../components/mapinput'
import MyMapView from '../components/mapview'
import { getLocation } from '../services/location-service'

class MapContainer extends React.Component {
	constructor(props) {
		super(props)
		this.state = {}
		}
	
	getCoordsFromName(loc) {
		const { lat, lng } = loc
		const { navigation } = this.props
		navigation.navigate('NewLocation', {
			latitude: lat,
			longitude: lng,
		})
	}
	async componentDidMount() {
		const location = await getLocation()
		this.setState({
			region: {
				latitude: location.latitude,
				longitude: location.longitude,
				latitudeDelta: 0.003,
				longitudeDelta: 0.003,
			},
		})
	}

	render() {
		const { navigation } = this.props
		return (
			<View style={{ flex: 1 }}>
				<View style={{ position: 'absolute', width: '100%', zIndex: 99 }}>
					<MapInput notifyChange={(loc) => this.getCoordsFromName(loc)} />
				</View>
				{this.state.region ? (
					<MyMapView
						navigation={navigation}
						initialRegion={this.state.region}
					/>
				) : null}
			</View>
		)
	}
}

export default MapContainer
