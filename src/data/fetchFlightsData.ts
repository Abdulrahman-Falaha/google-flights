
// const latitude = 40.7128
// const longitude = -74.0060
// const API_URL = `https://sky-scrapper.p.rapidapi.com/api/v1/flights/getNearByAirports?lat=${latitude}&lng=${longitude}`;

const API_URL = "https://api.thecatapi.com/v1/images/search?limit=10"

const options = {
  method: 'GET',
};

export default async function fetchFlightsData() {
  try {
    const response = await fetch(API_URL, options);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();

    return result;
  } catch (err) {
    throw new Error(`An Error has occured ${err}`);
  }
}
