async function getPhoto(cityName) {
  try{
  let url = "https://pixabay.com/api/";
  let params = {
  //  key:process.env.API_PHOTO_KEY,
   key:"45190034-1ec9120f55329103425f86806",
    q: cityName,
    image_type: "photo",
  };
  let response = await fetch(
    `${url}?key=${params.key}&q=${params.q}&image_type=${params.image_type}`
  );
  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  let result = await response.json();
  if (result.hits.length === 0) throw new Error("No images found for the specified city.");
  let imageUrl = await result.hits[0].webformatURL;
  return imageUrl; 
}
catch (error) {

    console.error("Error in getPhoto function:", error.message);
    throw new Error(error.message)
  }
}

export { getPhoto };
