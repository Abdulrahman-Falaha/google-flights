import React, { useCallback, useState } from "react";
import fetchFlightsData from "../data/fetchFlightsData";
import SearchSection from "./sections/SearchSection";
import Header from "./sections/Header";

export default React.memo(Flights);

function Flights() {
  const [flights, setFlights] = useState([]);

  const fetchFlights = useCallback(async () => {
    const result = await fetchFlightsData();

    setFlights(result);
  }, []);

  console.log({ flights });

  return (
    <div className="flex flex-col gap-10 w-full max-w-[1200px]">
      <Header />
      <button onClick={fetchFlights}>Click me</button>
      <SearchSection />
    </div>
  );
}
