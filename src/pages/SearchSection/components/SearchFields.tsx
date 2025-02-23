import React, { useCallback, useState } from "react";
import { FetchAiportResponseType } from "../../../data/fetchAirports";
import { TravelClassType, TripType } from "./FilterActions";
import FlightSearchField from "../../../components/reuseables/FlightSearchField";
import DateField from "../../../components/reuseables/DateField";
import { Search } from "lucide-react";
import { cn } from "@udecode/cn";
import fetchFlights, { FlightsResponse } from "../../../data/fetchFlights";
import CircularLoading from "../../../assets/CircularLoading";

export default React.memo(SearchFields);

interface Props {
  tripType: TripType;
  travelClass: TravelClassType | undefined;
  passengers: number;
  setFlights: (flights: FlightsResponse | undefined) => void;
}

function SearchFields(props: Props) {
  const { tripType, passengers, travelClass, setFlights } = props;

  const [selectedDepartureAirport, setSelectedDepartureAirport] = useState<
    FetchAiportResponseType | undefined
  >(undefined);
  const [selectedArrivalAirport, setSelectedArrivalAirport] = useState<
    FetchAiportResponseType | undefined
  >(undefined);

  const [returnDate, setReturnDate] = useState<Date | undefined>(undefined);
  const [departureDate, setDepartureDate] = useState<Date | undefined>(
    undefined
  );

  const [loading, setLoading] = useState(false);

  const handleFetchFlights = useCallback(async () => {
    setLoading(true);

    const results = await fetchFlights({
      originSkyId: selectedDepartureAirport?.skyId || "",
      originEntityId: selectedDepartureAirport?.entityId || "",
      destinationEntityId: selectedArrivalAirport?.entityId || "",
      destinationSkyId: selectedArrivalAirport?.skyId || "",
      date: (departureDate || new Date()).toISOString().split("T")[0],
      returnDate: returnDate?.toISOString().split("T")[0],
      cabinClass: travelClass,
      passengers: passengers,
      tripType,
    });

    setFlights(results);
    setLoading(false);
  }, [
    departureDate,
    passengers,
    returnDate,
    selectedArrivalAirport?.entityId,
    selectedArrivalAirport?.skyId,
    selectedDepartureAirport?.entityId,
    selectedDepartureAirport?.skyId,
    setFlights,
    travelClass,
    tripType,
  ]);

  const isSearchButtonDisabled =
    !selectedArrivalAirport || !selectedDepartureAirport || loading;

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
          date={returnDate}
          onSelect={setReturnDate}
          disabled={tripType === "oneWay"}
        />
      </div>

      <button
        onClick={handleFetchFlights}
        disabled={isSearchButtonDisabled}
        className={cn(
          "absolute right-[50%] shadow-2xl -bottom-5 translate-x-1/2  px-4 py-2 rounded-lg flex gap-2",
          {
            "bg-blue-500": !isSearchButtonDisabled,
            "bg-gray-300 !border-0 text-gray-300/60 !cursor-auto":
              isSearchButtonDisabled,
          }
        )}
      >
        {loading ? <CircularLoading className="text-blue-500" /> : <Search />}
        Search
      </button>
    </div>
  );
}
