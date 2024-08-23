async function getCoordinates(destinationName) {
try{
  const baseUrl = "http://api.geonames.org/searchJSON";
 // const userName =process.env.API_GEONAMES_KEY;
  const params = {
    formatted: true,
    q: destinationName,
    maxRows: 1,
    // username: userName,
    username:"ibra208him"
  };
  const response = await fetch(
    `${baseUrl}?formatted=${params.formatted}&q=${params.q}&maxRows=${params.maxRows}&username=${params.username}`
  );
  if (!response.ok) {
    throw new Error(`Geonames API request failed with status ${response.status}`);
  }

  const data = await response.json();
  if (!data.geonames.length) {
    throw new Error("No coordinates found for the specified destination.");
  }
  const lng = data.geonames[0].lng;
  const lat = data.geonames[0].lat;
  const coordinates = { lat, lng };
  return coordinates;
}
catch (error) {
  if (error.status && error.status.message) {
    console.log(error.status.message + ' error coordinates function');
    throw new Error(error.status.message);
  } else {
    console.log('An unknown error occurred');
    throw new Error('An unknown error occurred');
  }
}
}

module.exports = getCoordinates ;
