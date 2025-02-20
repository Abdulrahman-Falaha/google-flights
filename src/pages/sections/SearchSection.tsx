import React, { useMemo, useState } from 'react';
import { Plane, Calendar, Users, Search, ArrowRightLeft } from 'lucide-react';

export default React.memo(SearchSection);

type TripType = 'round' | 'oneWay' | 'multipleCities'

function SearchSection() {
  const [tripType, setTripType] = useState<TripType>('round');
  const [passengers, setPassengers] = useState(1);

  const filterActions = useMemo(() => [
    {
      value: tripType,
      icon: <ArrowRightLeft />,
      items: [
        {
          title: 'One Way',
          value: 'oneWay'
        },
        {
          title: 'Round trip',
          value: 'round'
        },
        {
            title: 'Multi-city',
          value: 'multipleCities'
        }
      ],
      onClick: (value: TripType) => {
        setTripType(value)
      }
    },


  ], [tripType])

  console.log({filterActions})

  return (
    <div className="w-full bg-[#f8f9fa]">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white pb-12 px-4 pt-2 rounded-xl shadow-lg max-w-[900px] mx-auto">
          {/* Trip Type Selection */}
          <div className="flex gap-4 mb-6">
            <button
              onClick={() => setTripType('round')}
              className={`px-4 py-2 rounded-full ${
                tripType === 'round'
                  ? 'bg-blue-100 text-blue-700'
                  : 'bg-gray-50 text-gray-700'
              }`}
            >
              Round trip
            </button>
            <button
              onClick={() => setTripType('oneWay')}
              className={`px-4 py-2 rounded-full ${
                tripType === 'oneWay'
                  ? 'bg-blue-100 text-blue-700'
                  : 'bg-gray-50 text-gray-700'
              }`}
            >
              One way
            </button>
          </div>

          {/* Search Form */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Plane className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Where from?"
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Plane className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Where to?"
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Calendar className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="date"
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Calendar className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="date"
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                disabled={tripType === 'oneWay'}
              />
            </div>
          </div>

          {/* Passengers and Search */}
          <div className="mt-6 flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Users className="h-5 w-5 text-gray-400" />
              </div>
              <select
                value={passengers}
                onChange={(e) => setPassengers(Number(e.target.value))}
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                  <option key={num} value={num}>
                    {num} {num === 1 ? 'passenger' : 'passengers'}
                  </option>
                ))}
              </select>
            </div>

            <button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg flex items-center justify-center gap-2 transition-colors">
              <Search className="h-5 w-5" />
              Search flights
            </button>
          </div>

          {/* Extra Features */}
          <div className="mt-6 flex flex-wrap gap-4">
            <button className="flex items-center gap-2 text-blue-600 hover:text-blue-700">
              <ArrowRightLeft className="h-4 w-4" />
              Compare nearby airports
            </button>
          </div>
        </div>

        {/* Price Graph Placeholder */}
        <div className="mt-8 bg-white rounded-xl shadow-lg p-6 max-w-4xl mx-auto">
          <h2 className="text-lg font-semibold mb-4">Price Graph</h2>
          <div className="h-48 bg-gray-100 rounded-lg flex items-center justify-center text-gray-500">
            Price graph will appear here after search
          </div>
        </div>
      </div>
    </div>
  );
}
