import { cn } from "@udecode/cn";
import { Itinerary } from "../../../data/fetchFlights";
import React from "react";
import moment from "moment";

export default React.memo(FlightCard);

interface Props {
  itinerary: Itinerary;
}

function FlightCard(props: Props) {
  const { itinerary } = props;

  return (
    <div className="flex flex-col w-full">
      {itinerary.legs.map((leg, index) => (
        <div
          key={index}
          className={cn(
            "grid sm:grid-cols-4 grid-cols-2 gap-4 justify-between p-6 rounded-2xl border border-gray-700",
            {
              "border-b-2 rounded-b-none":
                index === 0 && itinerary.legs.length > 1,
              "border-b-2 rounded-t-none":
                index === 1 && itinerary.legs.length > 1,
            }
          )}
        >
          <div className="flex gap-1">
            {leg.carriers.marketing.map((carrier, carrierIdx) => (
              <img
                key={carrierIdx}
                src={carrier.logoUrl}
                alt={carrier.name}
                className="h-12 w-12"
              />
            ))}
          </div>

          <div className="flex flex-col gap-1 justify-self-end sm:justify-self-start">
            <p className="text-[16px] font-medium">
              {moment(leg.departure).format("hh:mm A") +
                " - " +
                moment(leg.arrival).format("hh:mm A")}
            </p>
            <p className="text-[16px] font-medium">
              {leg.carriers.marketing.map((carrier, carrierIdx) => (
                <span key={carrierIdx}>
                  {carrier.name}
                  {leg.carriers.marketing.length > 1 &&
                    carrierIdx !== leg.carriers.marketing.length - 1 && (
                      <span> + </span>
                    )}
                </span>
              ))}
            </p>
          </div>

          <div className="flex flex-col gap-1">
            <p className="text-[16px] font-medium">
              {(leg.durationInMinutes / 60).toFixed(0)}h{" "}
              {(leg.durationInMinutes % 60).toFixed(0)}m
            </p>

            <p className="text-[16px] font-medium">
              {leg.origin.id} - {leg.destination.id}
            </p>
          </div>

          <div className="flex flex-col gap-1 justify-self-end self-end sm:self-start font-bold text-2xl">
            {itinerary.price.formatted}
          </div>
        </div>
      ))}
    </div>
  );
}
