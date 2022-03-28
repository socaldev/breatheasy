import React from 'react'
import {
	View,
	TouchableOpacity,
	Text,
	StyleSheet,
	StatusBar,
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { getLocation } from '../services/location-service'
import Constants from 'expo-constants'
import getAqiMeta from '../helpers/colorHelper'

export default class MainScreen extends React.Component {
	constructor(props) {
		super(props)

		//Button Handlers
		this.btnDayPress = () => {
			this.setState(convertAqi(this.state.aqi))
			this.setState({
				btnDay: true,
				btnMonth: false,
				btnYear: false,
			})
		}
		this.btnMonthPress = () => {
			this.setState(convertAqi(this.state.aqi * 30))
			this.setState({
				btnDay: false,
				btnMonth: true,
				btnYear: false,
			})
		}

		this.btnYearPress = () => {
			this.setState(convertAqi(this.state.aqi * 30 * 12))
			this.setState({
				btnDay: false,
				btnMonth: false,
				btnYear: true,
			})
		}

		this.state = {
			//Set initial state
			theNews: 'Loading...',
			city: 'Searching...',
			latitude: 50,
			longitude: 50,
			days: 0,
			hours: 0,
			cigs: 0,
			btnDay: true,
			btnMonth: false,
			btnYear: false,
			location: '',
			errorMsg: '',
		}
	}

	async componentDidMount() {
		const location = await getLocation()
		this.setState({
			latitude: location.latitude,
			longitude: location.longitude,
		})
		/* Fetch data from waqi API using user's coords */
		const token = Constants.manifest.extra.WAQI_TOKEN
		const url =
			'https://api.waqi.info/feed/geo:' +
			location.latitude +
			';' +
			this.state.longitude +
			token

		fetch(url)
			.then((response) => response.json())
			.then((responseJson) => {
				var aqi = responseJson.data.aqi
				const metaData = getAqiMeta(aqi)
				this.setState(metaData)

				/* Get the city name from the JSON, store it and the AQI in this.state */
				var city = responseJson.data.city.name
				this.setState({
					aqi: aqi,
					city: city,
				})

				/* Pass AQI value to convert method, which returns a JSON with all converted values*/
				var json = convertAqi(aqi)

				/* Store those values in this.state */
				this.setState(json)
			})
			.catch((error) => {
				console.error(error)
			})
	}
	render() {
		var data = this.state
		return (
			<View style={styles.container}>
				<StatusBar />
				<View style={{ margin: 10 }}>
					<Text style={[styles.txtsm, { paddingLeft: 10 }]}>
						Nearest AQI Monitoring Station to you:
					</Text>
					<View style={styles.location}>
						<View style={{ marginRight: 5, justifyContent: 'center' }}>
							<Icon name='map-marker-alt' color={'white'} size={20} />
						</View>
						<Text style={styles.txtsm}> {data.city.substring(0, 85)}...</Text>
					</View>
				</View>
				<View>
					<View style={{ backgroundColor: data.aqiColor, padding: 10 }}>
						<Text style={styles.h2}>PM2.5 Level: {data.aqi}μg/m³</Text>
					</View>
				</View>
				<View style={styles.content}>
					<Text style={styles.h1}>{data.theNews}</Text>
					<Text style={styles.txt}>Just breathing the air for: </Text>
					<View style={styles.buttonRow}>
						<TouchableOpacity
							style={this.state.btnDay ? styles.btnActive : styles.btn}
							onPress={this.btnDayPress}
						>
							<Text style={styles.txtBut}>1 DAY</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={this.state.btnMonth ? styles.btnActive : styles.btn}
							onPress={this.btnMonthPress}
						>
							<Text style={styles.txtBut}>1 MONTH</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={this.state.btnYear ? styles.btnActive : styles.btn}
							onPress={this.btnYearPress}
						>
							<Text style={styles.txtBut}>1 YEAR</Text>
						</TouchableOpacity>
					</View>
					<Text style={styles.txt}>Is the same as smoking:</Text>
					<View style={{ flexDirection: 'row' }}>
						<Icon name='smoking' color={'white'} size={40} />
						<View style={{ marginBottom: 25, justifyContent: 'center' }}>
							<Text style={styles.h2}>{this.state.cigs} Cigarettes</Text>
						</View>
					</View>
					<Text style={styles.txt}>Which will shorten your life by:</Text>
					<View style={{ flexDirection: 'row' }}>
						<Icon name='skull' color={'white'} size={40} />
						<Text style={styles.h2}>
							{this.state.days} days, {this.state.hours} hrs
						</Text>
					</View>
				</View>
			</View>
		)
	}
}

function convertAqi(aqi) {
	const t = (aqi * 60000 * 11) / 22
	var cigs = Math.floor(aqi / 22)
	/** t is given in milliseconds to get time breakdown **/
	var days = Math.floor(t / (1000 * 60 * 60 * 24))
	var hrs = Math.floor((t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
	//var mins = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60));
	//var secs = Math.floor((t % (1000 * 60)) / 1000);
	var json = {
		days: days,
		hours: hrs,
		cigs: cigs,
	}
	return json
}

const styles = StyleSheet.create({
	btn: {
		paddingLeft: 15,
		paddingRight: 15,
		paddingTop: 5,
		paddingBottom: 5,
		borderRadius: 10,
		backgroundColor: 'grey',
	},
	btnActive: {
		paddingLeft: 15,
		paddingRight: 15,
		paddingTop: 5,
		paddingBottom: 5,
		borderRadius: 10,
		backgroundColor: 'green',
	},

	buttonRow: {
		flexDirection: 'row',
		alignContent: 'stretch',
		alignItems: 'center',
		justifyContent: 'space-around',
		marginBottom: 25,
	},

	container: {
		flex: 1,
		backgroundColor: '#2d2d2d',
	},

	content: {
		padding: 15,
	},

	h1: {
		color: 'white',
		marginBottom: 10,
		fontSize: 40,
	},

	h2: {
		color: 'white',
		fontSize: 30,
		paddingLeft: 10,
		textShadowColor: 'rgba(0, 0, 0, 0.75)',
		textShadowOffset: { width: -1, height: 1 },
		textShadowRadius: 10,
	},
	location: {
		flexDirection: 'row',
		padding: 10,
	},

	txt: {
		color: 'white',
		fontSize: 20,
		marginTop: 5,
	},

	txtBut: {
		color: 'white',
		fontSize: 20,
	},

	txtsm: {
		color: 'white',
		fontSize: 14,
	},
})
