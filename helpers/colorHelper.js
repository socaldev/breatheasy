const getAqiMeta = (aqi) => {
	if (aqi <= 50) {
		return {
			theNews: 'Good!',
			aqiColor: '#009966',
		}
	} else if (aqi <= 100) {
		return {
			theNews: 'Moderate.',
			aqiColor: '#ffde33',
		}
	} else if (aqi <= 150) {
		return {
			theNews: 'Moderately Bad.',
			aqiColor: '#ff9933',
		}
	} else if (aqi <= 200) {
		return {
			theNews: 'Unhealthy.',
			aqiColor: '#cc0033',
		}
	} else if (aqi <= 300) {
		return {
			theNews: 'Very Unhealthy.',
			aqiColor: '#660099',
		}
	} else if (aqi >= 300) {
		return {
			theNews: 'Hazardous.',
			aqiColor: '#7e0023',
		}
	}
}

export default getAqiMeta
