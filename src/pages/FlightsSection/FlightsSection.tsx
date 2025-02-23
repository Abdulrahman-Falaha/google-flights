import React, { useCallback, useEffect } from "react";
import { FlightsResponse } from "../../data/fetchFlights";
import FlightCard from "./components/FlightCard";
import { orderBy } from "lodash";

export default React.memo(FlightsSection);

interface Props {
  flights?: FlightsResponse;
}

type SortByType = "price" | "duration" | "departureTime" | "arrivalTime";

function FlightsSection(props: Props) {
  const { flights } = props;

  const [sortBy, setSortBy] = React.useState<SortByType>("price");
  const [sortedItineraries, setSortedItineraries] = React.useState<
    FlightsResponse["itineraries"] | undefined
  >(flights?.itineraries);

  const handleSort = useCallback(
    (value: SortByType) => {
      setSortBy(value);

      const updatedFlights = orderBy(
        flights?.itineraries,
        (item) => {
          if (value === "price") return item.price.raw;
          if (value === "duration") return item.legs[0].durationInMinutes;
          if (value === "departureTime") return item.legs[0].departure;
          if (value === "arrivalTime") return item.legs[0].arrival;
        },
        ["asc"]
      );

      setSortedItineraries(updatedFlights);
    },
    [flights]
  );

  useEffect(() => {
    handleSort("price");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flights?.itineraries]);

  return (
    <div className="flex flex-col w-full p-4 items-center bg-white rounded-xl shadow-lg mx-auto">
      {!flights ? (
        <div className="flex flex-col items-center justify-center w-full h-full">
          <p className="text-3xl font-medium">Search for flights!</p>
        </div>
      ) : !flights?.itineraries.length ? (
        <div className="flex flex-col items-center justify-center w-full h-full">
          <p className="text-3xl font-medium">No Flights Found</p>
        </div>
      ) : (
        <div className="flex flex-col w-full gap-6">
          <div className="flex justify-between w-full">
            <p className="text-3xl w-full self-start font-semibold">
              Current Flights
            </p>

            <select
              value={sortBy}
              onChange={(e) => handleSort(e.target.value as SortByType)}
              className="block cursor-pointer border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="price">Price</option>
              <option value="duration">Duration</option>
              <option value="departureTime">Departure Time</option>
              <option value="arrivalTime">Arrival Time</option>
            </select>
          </div>
          {sortedItineraries?.map((itinerary, index) => (
            <FlightCard key={index} itinerary={itinerary} />
          ))}
        </div>
      )}
    </div>
  );
}
