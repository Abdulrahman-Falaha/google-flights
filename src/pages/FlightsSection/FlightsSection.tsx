import React from "react";
import { FlightsResponse } from "../../data/fetchFlights";
import FlightCard from "./FlightCard";

export default React.memo(FlightsSection);

interface Props {
  flights?: FlightsResponse;
}

function FlightsSection(props: Props) {
  const { flights } = props;

    console.log({flights})

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
            <p className="text-3xl w-full self-start font-semibold">Current Flights</p>
            {flights.itineraries.map((flight, index) => (
                <FlightCard key={index} flight={flight} />
            ))}
        </div>
      )}
    </div>
  );
}
