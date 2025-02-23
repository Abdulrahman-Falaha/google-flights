import React, { useState } from "react";
import { FlightsResponse } from "../../data/fetchFlights";
import FilterActions, {
  TravelClassType,
  TripType,
} from "./components/FilterActions";
import SearchFields from "./components/SearchFields";

export default React.memo(SearchSection);

interface Props {
  setFlights: (flights: FlightsResponse | undefined) => void;
}

function SearchSection(props: Props) {
  const { setFlights } = props;

  const [tripType, setTripType] = useState<TripType>("oneWay");
  const [travelClass, setTravelClass] = useState<TravelClassType | undefined>(
    "economy"
  );
  const [passengers, setPassengers] = useState(1);

  return (
    <div className="bg-white relative w-full pb-12 px-4 pt-4 rounded-xl shadow-lg mx-auto flex flex-col gap-4">
      <p className="text-3xl font-semibold">Choose Your Flight</p>

      <FilterActions
        tripType={tripType}
        setTripType={setTripType}
        travelClass={travelClass}
        setTravelClass={setTravelClass}
        passengers={passengers || 1}
        setPassengers={setPassengers}
      />

      <SearchFields
        travelClass={travelClass}
        passengers={passengers}
        tripType={tripType}
        setFlights={setFlights}
      />
    </div>
  );
}
