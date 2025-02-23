import fetchingOptions from "./fetchingOptions";

export type FetchAiportReturnType = {
  entityId: string;
  navigation: {
    entityId: string;
    entityType: string;
    localizedName: string;
    relevantFlightParams: {
      entityId: string;
      flightPlaceType: string;
      localizedName: string;
      skyId: string;
    };
    relevantHotelParams: {
      entityId: string;
      entityType: string;
      localizedName: string;
    };
  };
  presentation: {
    subtitle: string;
    suggestionTitle: string;
    title: string;
  };
  skyId: string;
};


export default async function fetchAirports(args: { searchText: string }): Promise<FetchAiportReturnType[]> {
  try {
    const { searchText } = args;

    const getAirportsApiUrl = `https://sky-scrapper.p.rapidapi.com/api/v1/flights/searchAirport?query=${searchText}&locale=en-US`;

    const response = await fetch(getAirportsApiUrl, fetchingOptions);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();

    return result.data;
  } catch (err) {
    throw new Error(`An Error has occured ${err}`);
  }
}
