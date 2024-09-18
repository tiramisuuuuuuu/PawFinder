async function returnLocation(latitude, longitude) {
    try {
        const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?key=${process.env.GOOGLE_MAPS_API_KEY}&latlng=${latitude},${longitude}`);
        const responseObj = await response.json();
        return responseObj;
    } catch {
        return { error: true }
    }
    
}

module.exports = {
	returnLocation,
};