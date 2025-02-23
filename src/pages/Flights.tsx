import React, { useState } from "react";
import SearchSection from "./SearchSection/SearchSection";
import FlightsSection from "./FlightsSection/FlightsSection";
import { FlightsResponse } from "../data/fetchFlights";

export default React.memo(Flights);

function Flights() {

  const [flights, setFlights] = useState<FlightsResponse | undefined>(
    undefined
  );

  

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

      <div className="w-full pb-40">
        <div className="container flex flex-col mx-auto px-4 py-8 bg-[#f8f9fa] gap-8">
          <SearchSection setFlights={setFlights} />
          
          <FlightsSection flights={flights} />
        </div>
      </div>
    </div>
  );
}
