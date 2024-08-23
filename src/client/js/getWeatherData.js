const url='http://localhost:8080/getweatherstatus'

async function getWeatherData(
  destinationName,
  leavingDateDestInput,
  returningDateDestInput
) {
  try{
  let response=await fetch(`${url}/${destinationName}/${leavingDateDestInput}/${returningDateDestInput}`);
  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    return data;
}
catch (error) {

  console.error("Error in getWeatherData function:", error.message);

  return null; // Return null if there's an error
}
}


export { getWeatherData };
