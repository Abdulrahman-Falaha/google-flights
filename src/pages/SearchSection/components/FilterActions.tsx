import React, { useMemo } from "react";
import {
  ArrowRightLeft,
  User,
  Users2,
  RockingChair,
  ArrowRight,
} from "lucide-react";
import sum from "lodash/sum";

export default React.memo(FilterActions);

export type TravelClassType =
  | "economy"
  | "business"
  | "first"
  | "premium_economy";
export type TripType = "round" | "oneWay";

interface Props {
  tripType: TripType;
  setTripType: (value: TripType) => void;
  travelClass: TravelClassType | undefined;
  setTravelClass: (value: TravelClassType) => void;
  passengers: number;
  setPassengers: (value: number) => void;
}

function FilterActions(props: Props) {
  const {
    tripType,
    setTripType,
    travelClass,
    setTravelClass,
    passengers,
    setPassengers,
  } = props;

  const travelClasses: { title: string; value: TravelClassType | undefined }[] = useMemo(
    () => [
      { title: "Economy", value: "economy" },
      { title: "Business", value: "business" },
      { title: "First Class", value: "first" },
      { title: "Premium Economy", value: "premium_economy" },
      { title: "Any", value: undefined },
    ],
    []
  );

  const tripTypesItems: { title: string; value: TripType }[] = useMemo(
    () => [
      { title: "One Way", value: "oneWay" },
      { title: "Round trip", value: "round" },
    ],
    []
  );

  const allowedNumberOfPassengers = Array.from({ length: 9 }, (_, i) => i + 1);
  const passengersItems = allowedNumberOfPassengers.map((num) => ({
    title: `${num} ${num === 1 ? "passenger" : "passengers"}`,
    value: num,
  }));

  const currentNumberOfPassengers = sum(Object.values(passengers));

  const filterActions = useMemo(() => {
    return [
      {
        value: tripType,
        icon: tripType === "round" ? <ArrowRightLeft /> : <ArrowRight />,
        items: tripTypesItems,
        onClick: (value: string) => {
          setTripType(value as TripType);
        },
      },
      {
        value: passengers,
        icon: currentNumberOfPassengers > 1 ? <Users2 /> : <User />,
        items: passengersItems,
        onClick: (value: string) => {
          setPassengers(Number(value));
        },
      },
      {
        value: travelClass,
        icon: <RockingChair />,
        items: travelClasses,
        onClick: (value: string) => {
          setTravelClass(value as TravelClassType);
        },
      },
    ];
  }, [
    tripType,
    tripTypesItems,
    passengers,
    currentNumberOfPassengers,
    passengersItems,
    travelClass,
    travelClasses,
    setTripType,
    setPassengers,
    setTravelClass,
  ]);

  return (
    <div className="sm:flex sm:max-w-full gap-2 grid grid-cols-1 max-w-[200px]">
      {filterActions.map((action, index) => {
        return (
          <div key={index} className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-2xl">
              {action.icon}
            </div>

            <select
              value={action.value?.toString()}
              onChange={(e) => {
                action.onClick(e.target.value);
              }}
              className="block cursor-pointer w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {action.items?.map((item, idx) => (
                <option
                  key={idx}
                  value={item.value}
                  className="px-2 py-1"
                >
                  {item.title}
                </option>
              ))}
            </select>
          </div>
        );
      })}
    </div>
  );
}
