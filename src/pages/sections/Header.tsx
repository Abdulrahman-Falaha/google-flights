import React from "react";

export default React.memo(Header);

function Header() {
  return (
    <div className="flex flex-col w-full items-center">
      <img
        src="https://t4.ftcdn.net/jpg/01/44/15/39/360_F_144153949_FDLHLy7dTiSSgVPBRW3Q660dpCIsFBZL.jpg"
        alt="Travel"
        width={800}
      />
      <p className="text-6xl font-medium">Flights</p>
    </div>
  );
}
