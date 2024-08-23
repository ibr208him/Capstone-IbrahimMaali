async function getForcastWeather(
  coordinates,
  leavingDateDestInput,
  returningDateDestInput
) {
  try{
  // Convert the future dates to the previous year
  const startDate = new Date(leavingDateDestInput);
  const endDate = new Date(returningDateDestInput);
  const historicalStartDate = new Date(
    startDate.setFullYear(startDate.getFullYear() - 1)
  )
    .toISOString()
    .split("T")[0];
  const historicalEndDate = new Date(
    endDate.setFullYear(endDate.getFullYear() - 1)
  )
    .toISOString()
    .split("T")[0];

  const baseUrl = "https://api.weatherbit.io/v2.0/history/daily";

  const params = {
    // key: process.env.API_WEATHER_KEY,
    key:"07455e70eb4d4154bd8935904366bbb6",
    lat: coordinates.lat,
    lon: coordinates.lng,
  };
  const response =
    await fetch(`${baseUrl}?key=${params.key}&lat=${params.lat}&lon=${params.lon}
     &start_date=${historicalStartDate}&end_date=${historicalEndDate}`);
     if (!response.ok) {
      throw new Error(`Weatherbit API request failed with status ${response.status}`);
    }

    const result = await response.json();
    if (!result.data || !result.data.length) {
      throw new Error("No forecast data available for the specified coordinates.");
    }
  let maxTemp = result.data[0].max_temp;
  let minTemp = result.data[0].min_temp;
  let WeatherForcast = { maxTemp, minTemp };
  return WeatherForcast;
}
catch (error) {
  if (error.status && error.status.message) {
    console.log(error.status.message + ' error getForcastWeather function');
    throw new Error(error.status.message);
  } else {
    console.log('An unknown error occurred');
    throw new Error('An unknown error occurred');
  }
}
}
module.exports = getForcastWeather ;
