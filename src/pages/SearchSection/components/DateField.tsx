import { useCallback, useState } from "react";
import { Calendar } from "lucide-react";
import React from "react";

interface Props {
date?: Date;
  onSelect: (date: Date) => void;
  disabled?: boolean;
}

export default React.memo(DateField);

function DateField(props: Props) {
  const { onSelect, disabled } = props;

  const [date, setDate] = useState<Date | undefined>(props.date);

  const handleSelect = useCallback(
    (date: Date) => {
      setDate(date);
      onSelect(date);
    },
    [onSelect]
  );

  console.log(date)

  return (
    <div className="relative w-full">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Calendar className="h-5 w-5 text-gray-400" />
      </div>
      <input
        type="date"
        disabled={disabled}
        className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        onChange={(e) => handleSelect(new Date(e.target.value))}
        value={date?.toISOString().split("T")[0]}
      />
    </div>
  );
}
