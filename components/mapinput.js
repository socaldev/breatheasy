import React from 'react'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import Constants from 'expo-constants'


class MapInput extends React.Component {
	render() {
		return (
			<GooglePlacesAutocomplete
				placeholder='Search for location'
				minLength={3} // minimum length of text to search
				autoFocus={false}
				returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
				keyboardAppearance={'light'} // Can be left out for default keyboardAppearance https://facebook.github.io/react-native/docs/textinput.html#keyboardappearance
				listViewDisplayed={true} // true/false/undefined
				fetchDetails={true}
				// renderDescription={row => row.description} // custom description render
				onPress={(data, details = null) => {
					// 'details' is provided when fetchDetails = true
					this.props.notifyChange(details.geometry.location)
				}}
				query={{
					// available options: https://developers.google.com/places/web-service/autocomplete
					key: Constants.manifest.extra.PLACES_API_KEY,
					language: 'en', // language of the results
					types: '(cities)', // default: 'geocode'
				}}
				styles={{
					textInputContainer: {
						width: '100%',
					},
					description: {
						fontWeight: 'bold',
					},
					predefinedPlacesDescription: {
						color: '#1faadb',
					},
					listView: {
						backgroundColor: 'white',
					},
				}}
				currentLocation={false} // Will add a 'Current location' button at the top of the predefined places list
				currentLocationLabel='Current location'
				nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
				GoogleReverseGeocodingQuery={
					{
						// available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
					}
				}
				GooglePlacesSearchQuery={{
					// available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
					rankby: 'distance',
				}}
				GooglePlacesDetailsQuery={{
					// available options for GooglePlacesDetails API : https://developers.google.com/places/web-service/details
					fields: 'geometry',
				}}
				filterReverseGeocodingByTypes={[
					'locality',
					'administrative_area_level_3',
				]} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
				debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
				//renderLeftButton={() => <Icon name='map-marker-alt' color={'white'} size={20} />}
				//renderRightButton={() => <Text>Custom text after the input</Text>}
			/>
		)
	}
}
export default MapInput
