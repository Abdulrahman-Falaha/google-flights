import fetchingOptions from "./fetchingOptions";

export default async function fetchNearbyAirports() {
  try {
    const getNearbyAirportsApiUrl =
      "https://sky-scrapper.p.rapidapi.com/api/v2/flights/searchFlights?originSkyId=LOND&destinationSkyId=NYCA&originEntityId=27544008&destinationEntityId=27537542&cabinClass=economy&adults=1&sortBy=best&currency=USD&market=en-US&countryCode=US";

    const response = await fetch(getNearbyAirportsApiUrl, fetchingOptions);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();

    return result;
  } catch (err) {
    throw new Error(`An Error has occured ${err}`);
  }
}
