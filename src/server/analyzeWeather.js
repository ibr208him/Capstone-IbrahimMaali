const  getCoordinates =require  ("./getCoordinates.js");
const  getForcastWeather =require  ("./getForcastWeather.js");
const  getCurrentWeather =require( "./getCurrentWeather.js");
const  daysToStart=require( "./daysToStart.js");

async function analyzeWeather(
  destinationName,
  leavingDateDestInput,
  returningDateDestInput
) {

  try{
  let coordinates = await getCoordinates(destinationName);
  let daysToStartToStartPlan = daysToStart(leavingDateDestInput);
  if (daysToStartToStartPlan <= 10) {
    let currentWeather = await getCurrentWeather(coordinates);
    return currentWeather;
  } else {
    let forcastWeather = await getForcastWeather(
      coordinates,
      leavingDateDestInput,
      returningDateDestInput
    );
    return forcastWeather;
  }
}
catch (error) {
  if (error.message) {
    console.log(error.message + ' error analyzeWeather function');
    throw new Error(error.message);
  } else {
    console.log('An unknown error occurred');
    throw new Error('An unknown error occurred');
  }
}

}

module.exports = analyzeWeather ;
