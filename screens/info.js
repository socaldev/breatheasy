import React from 'react'
import { View, Text, Linking, StyleSheet, ScrollView } from 'react-native'

export default class InfoScreen extends React.Component {
	render() {
		return (
			<ScrollView style={styles.container}>
				<View horizontal='true' style={styles.container}>
					<Text style={styles.h2}>Where does the data come from?</Text>
					<Text style={styles.txt}>
						Accurate, public AQI data is provided by the World Air Quality Index
						Project
					</Text>
					<Text
						style={[styles.txtsm, styles.underline]}
						onPress={() => Linking.openURL('https://aqicn.org/')}
					>
						https://aqicn.org/
					</Text>
					<Text style={styles.h2}>How did we calculate?</Text>
					<Text style={[styles.txt, styles.underline]}>Step 1</Text>
					<Text style={styles.txt}>Convert AQI to Cigarettes (per day)</Text>
					<Text style={styles.txtsm}>
						Rule of thumb: one cigarette per day is the rough equivalent of a
						PM2.5 level of 22 μg/m3 per day
					</Text>
					<Text
						style={[styles.txtsm, styles.underline]}
						onPress={() =>
							Linking.openURL(
								'http://berkeleyearth.org/air-pollution-and-cigarette-equivalence/'
							)
						}
					>
						http://berkeleyearth.org/
					</Text>
					<Text style={[styles.txt, styles.underline]}>Step 2</Text>
					<Text style={styles.txt}>Convert Cigarettes to 'Time from Life'</Text>
					<Text style={styles.txtsm}>
						Rule of thumb: one cigarette smoked shortens your life by 11 minutes
					</Text>
					<Text
						style={[styles.txtsm, styles.underline]}
						onPress={() =>
							Linking.openURL(
								'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC1117323/'
							)
						}
					>
						https://www.ncbi.nlm.nih.gov/
					</Text>
					<Text style={styles.h2}>AQI Color Scale</Text>
					<ScrollView style={styles.container}>
						<View
							style={{
								flex: 1,
								flexDirection: 'row',
								backgroundColor: '#009966',
								padding: 15,
							}}
						>
							<Text style={styles.txtAqi}>Good 0-50</Text>
						</View>
						<View
							style={{
								flex: 1,
								flexDirection: 'row',
								backgroundColor: '#ffde33',
								padding: 15,
							}}
						>
							<Text style={styles.txtAqi}>Moderate 51-100</Text>
						</View>
						<View
							style={{
								flex: 1,
								flexDirection: 'row',
								backgroundColor: '#ff9933',
								padding: 15,
							}}
						>
							<Text style={styles.txtAqi}>Moderately Bad 51-100</Text>
						</View>
						<View
							style={{
								flex: 1,
								flexDirection: 'row',
								backgroundColor: '#cc0033',
								padding: 15,
							}}
						>
							<Text style={styles.txtAqi}>Unhealthy 51-100</Text>
						</View>
						<View
							style={{
								flex: 1,
								flexDirection: 'row',
								backgroundColor: '#660099',
								padding: 15,
							}}
						>
							<Text style={styles.txtAqi}>Very Unhealthy 51-100</Text>
						</View>
						<View
							style={{
								flex: 1,
								flexDirection: 'row',
								backgroundColor: '#7e0023',
								padding: 15,
							}}
						>
							<Text style={styles.txtAqi}>Hazardous 51-100</Text>
						</View>
					</ScrollView>
				</View>
			</ScrollView>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#2d2d2d',
		padding: 5,
	},

	h1: {
		color: 'white',
		fontSize: 40,
	},

	h2: {
		color: 'white',
		fontSize: 30,
		paddingTop: 7,
	},

	txt: {
		color: 'white',
		fontSize: 20,
	},

	txtsm: {
		color: 'white',
		fontSize: 14,
	},

	txtAqi: {
		color: 'white',
		fontSize: 25,
		textShadowColor: 'black',
		textShadowOffset: { width: 2, height: 1 },
		textShadowRadius: 3,
	},

	buttonView: {
		flex: 1,
	},

	buttonRow: {
		flexDirection: 'row',
		alignContent: 'stretch',
		alignItems: 'stretch',
	},
	row: {
		flexDirection: 'row',
	},
	underline: {
		textDecorationLine: 'underline',
	},
})
