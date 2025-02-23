import React, { useCallback, useEffect, useRef, useState } from "react";
import { Plane, PlaneTakeoff, CheckCheck } from "lucide-react";
import fetchAirports, { FetchAiportReturnType } from "../../data/fetchAirports";
import CircularLoading from "../../assets/CircularLoading";

export default React.memo(FlightSearchField);

interface Props {
  value?: FetchAiportReturnType;
  onSelect: (airport: FetchAiportReturnType) => void;
}

function FlightSearchField(props: Props) {
  const { onSelect } = props;

  const ref = useRef<HTMLUListElement>(null);

  const [optionsMenu, setOptionsMenu] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [selectedAirport, setSelectedAirport] = useState<
    FetchAiportReturnType | undefined
  >(props.value);
  const [airports, setAirports] = useState<FetchAiportReturnType[]>([]);

  const [loading, setLoading] = useState(false);

  const handleSelect = useCallback(
    (airport: FetchAiportReturnType) => {
      setSelectedAirport(airport);
      setSearchValue(airport.presentation.suggestionTitle);
      setOptionsMenu(false);
      onSelect(airport);
    },
    [onSelect]
  );

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOptionsMenu(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  useEffect(() => {
    if (
      !searchValue ||
      searchValue === selectedAirport?.presentation.suggestionTitle
    )
      return;

    setLoading(true);
    const handler = setTimeout(async () => {
      const result = await fetchAirports({ searchText: searchValue });

      setAirports(result);
      setOptionsMenu(true);
      setLoading(false);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [searchValue, selectedAirport?.presentation.suggestionTitle]);

  return (
    <div className="relative w-full">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <PlaneTakeoff className="h-5 w-5 text-gray-400" />
      </div>

      {loading ? (
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
          <CircularLoading />
        </div>
      ) : null}

      <input
        type="text"
        placeholder="Where from?"
        onChange={(e) => setSearchValue(e.target.value)}
        onClick={() => setOptionsMenu(true)}
        value={searchValue}
        className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
      {optionsMenu && (
        <ul
          className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg mt-1 max-h-60 overflow-y-auto"
          ref={ref}
        >
          {airports.map((airport, index) => (
            <li
              key={index}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex justify-between"
              onClick={() => handleSelect(airport)}
            >
              <div className="flex gap-1">
                {<Plane />}
                {airport.presentation.suggestionTitle}
              </div>
              {selectedAirport?.entityId === airport.entityId && <CheckCheck />}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
