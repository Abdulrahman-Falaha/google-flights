import fetchingOptions from "./fetchingOptions";

type FarePolicy = {
  isChangeAllowed: boolean;
  isPartiallyChangeable: boolean;
  isCancellationAllowed: boolean;
};

type Destination = {
  city: string;
  country: string;
  displayCode: string;
  entityId: string;
  id: string;
  isHighlighted: boolean;
  name: string;
};

type Origin = Destination;

type Carrier = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  marketing: any[];
  operationType: string;
};

type Leg = {
  arrival: Date;
  carriers: Carrier;
  departure: Date;
  destination: Destination;
  durationInMinutes: number;
  id: string;
  isSmallestStops: boolean;
  origin: Origin;
  stopCount: number;
  timeDeltaInDays: number;
};

type Price = {
  raw: number;
  formatted: string;
  pricingOptionId: string;
};

export type Itinerary = {
  fareAttributes: Record<string, unknown>;
  farePolicy: FarePolicy;
  hasFlexibleOptions: boolean;
  id: string;
  isMashUp: boolean;
  isProtectedSelfTransfer: boolean;
  isSelfTransfer: boolean;
  legs: Leg[];
  segments: Record<string, unknown>;
  price: Price;
  score: number;
  arrival: Date;
  departure: Date;
  tags: string[]
};

export type FlightsResponse = {
  itineraries: Itinerary[];
};

export default async function fetchFlights(args: {
  originSkyId: string;
  originEntityId: string;
  destinationSkyId: string;
  destinationEntityId: string;
  date: string;
  returnDate?: string;
  cabinClass?: string;
  passengers?: number;
  tripType?: string;
}): Promise<FlightsResponse> {
  try {
    const {
      originSkyId,
      destinationSkyId,
      cabinClass,
      passengers,
      originEntityId,
      destinationEntityId,
      date,
      returnDate,
      tripType,
    } = args;

    const getFlightsApiUrl = new URL(
      "https://sky-scrapper.p.rapidapi.com/api/v2/flights/searchFlightsComplete"
    );

    const params = {
      originSkyId,
      destinationSkyId,
      originEntityId,
      destinationEntityId,
      date,
      returnDate,
      adults: passengers,
      tripType,
      cabinClass,
      sortBy: "best",
      currency: "USD",
      market: "en-US",
      countryCode: "US",
    };

    Object.entries(params).forEach(([key, value]) =>
      value
        ? getFlightsApiUrl.searchParams.append(key, value.toLocaleString())
        : null
    );

    const response = await fetch(getFlightsApiUrl, fetchingOptions);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();

    return result.data;
  } catch (err) {
    throw new Error(`An Error has occured ${err}`);
  }
}
