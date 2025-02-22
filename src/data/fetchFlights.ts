// const API_URL = "https://api.thecatapi.com/v1/images/search?limit=10"

const options = {
  method: "GET",
  headers: {
    "x-rapidapi-host": "sky-scrapper.p.rapidapi.com",
    "x-rapidapi-key": "73362f1317msh3a28796fedcf8bbp170adcjsnd7eb144ded6f",
  },
};

export default async function fetchFlights(args: {
  originSkyId: string;
  destinationSkyId?: string;
}) {
  try {
    const { originSkyId, destinationSkyId } = args;

    'https://sky-scrapper.p.rapidapi.com/api/v2/flights/searchFlightsComplete?originSkyId=LOND&destinationSkyId=NYCA&originEntityId=27544008&destinationEntityId=27537542&cabinClass=economy&adults=1&sortBy=best&currency=USD&market=en-US&countryCode=US' 

  const getFlightsApiUrl =
      "https://sky-scrapper.p.rapidapi.com/api/v2/flights/searchFlights?originSkyId=LOND&destinationSkyId=NYCA&originEntityId=27544008&destinationEntityId=27537542&cabinClass=economy&adults=1&sortBy=best&currency=USD&market=en-US&countryCode=US";

    const response = await fetch(getFlightsApiUrl, options);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();

    return result;
  } catch (err) {
    throw new Error(`An Error has occured ${err}`);
  }
}
