import React, { useCallback, useState } from "react";
import { FetchAiportReturnType } from "../../data/fetchAirports";
import { TripType } from "./FilterActions";
import FlightSearchField from "./components/FlightSearchField";
import DateField from "./components/DateField";
import { Search } from "lucide-react";

export default React.memo(SearchSection);

interface Props {
  tripType: TripType;
}

function SearchSection(props: Props) {
  const { tripType } = props;

  const [selectedDepartureAirport, setSelectedDepartureAirport] = useState<
    FetchAiportReturnType | undefined
  >(undefined);
  const [selectedArrivalAirport, setSelectedArrivalAirport] = useState<
    FetchAiportReturnType | undefined
  >(undefined);

  const [arrivalDate, setArrivalDate] = useState<Date | undefined>(undefined);
  const [departureDate, setDepartureDate] = useState<Date | undefined>(
    undefined
  );

  const handleFetchFlights = useCallback(() => {
    console.log("Fetch Flights");
  }, []);

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex gap-4 w-full md:flex-row flex-col">
        <FlightSearchField
          value={selectedDepartureAirport}
          onSelect={setSelectedDepartureAirport}
        />

        <DateField date={departureDate} onSelect={setDepartureDate} />
      </div>

      <div className="flex gap-4 w-full md:flex-row flex-col">
        <FlightSearchField
          value={selectedArrivalAirport}
          onSelect={setSelectedArrivalAirport}
        />

        <DateField
          date={arrivalDate}
          onSelect={setArrivalDate}
          disabled={tripType === "oneWay"}
        />
      </div>

      <button onClick={handleFetchFlights} disabled={!selectedArrivalAirport || !selectedDepartureAirport} className="absolute right-[50%] shadow-2xl -bottom-5 translate-x-1/2 hover:bg-blue-500 px-4 py-2 rounded-lg flex gap-2">
        <Search />
        Search
      </button>
    </div>
  );
}
