async function getCurrentWeather(coordinates) {
  try{
  const baseUrl = "https://api.weatherbit.io/v2.0/forecast/daily";
  const params = {
    // key: process.env.API_WEATHER_KEY,
    key:"07455e70eb4d4154bd8935904366bbb6",
    lat: coordinates.lat,
    lon: coordinates.lng,
  };
  const response = await fetch(
    `${baseUrl}?key=${params.key}&lat=${params.lat}&lon=${params.lon}`
  );
  if (!response.ok) {
    throw new Error(`Weatherbit API request failed with status ${response.status}`);
  }
  const result = await response.json();
  if (!result.data || !result.data.length) {
    throw new Error("No weather data available for the specified coordinates.");
  }
  let maxTemp = result.data[0].max_temp;
  let minTemp = result.data[0].min_temp;
  let currentWeather = { maxTemp, minTemp };
  return currentWeather;
  }
  catch (error) {
    if (error.status && error.status.message) {
      console.log(error.status.message + ' error getCurrentWeather function');
      throw new Error(error.status.message);
    } else {
      console.log('An unknown error occurred');
      throw new Error('An unknown error occurred');
    }
  }
}
module.exports = getCurrentWeather ;
