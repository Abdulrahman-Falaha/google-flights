import React, { useState } from "react";
import SearchSection from "./SearchSection/SearchSection";
import FilterActions, {
  TravelClassType,
  TripType,
} from "./SearchSection/FilterActions";

export default React.memo(Flights);

function Flights() {
  const [tripType, setTripType] = useState<TripType>("oneWay");
  const [travelClass, setTravelClass] = useState<TravelClassType | undefined>("economy");
  const [passengers, setPassengers] = useState(1);

  return (
    <div className="flex flex-col gap-10 w-full max-w-[1200px]">
      <div className="flex flex-col w-full items-center">
        <img
          src="https://t4.ftcdn.net/jpg/01/44/15/39/360_F_144153949_FDLHLy7dTiSSgVPBRW3Q660dpCIsFBZL.jpg"
          alt="Travel"
          width={800}
        />
        <p className="text-6xl font-medium">Flights</p>
      </div>

      {/* <button onClick={fetchFlights}>Click me</button> */}
      {/* <SearchSection /> */}

      <div className="w-full pb-40">
        <div className="container mx-auto px-4 py-8 bg-[#f8f9fa] ">
          <div className="bg-white relative pb-12 px-4 pt-2 rounded-xl shadow-lg max-w-[900px] mx-auto flex flex-col gap-4">
            <FilterActions
              tripType={tripType}
              setTripType={setTripType}
              travelClass={travelClass}
              setTravelClass={setTravelClass}
              passengers={passengers || 1}
              setPassengers={setPassengers}
            />
            <SearchSection travelClass={travelClass} passengers={passengers} tripType={tripType} />
          </div>
        </div>
      </div>
    </div>
  );
}
