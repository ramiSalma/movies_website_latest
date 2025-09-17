import React from "react";
// Import *all* outline icons (you can swap to solid if you want)
import * as OutlineIcons from "@heroicons/react/24/outline";

const IconGallery = () => {
  return (
    <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-6 gap-6 p-6">
      {Object.entries(OutlineIcons).map(([name, Icon]) => (
        <div
          key={name}
          className="flex flex-col items-center justify-center text-center p-2 bg-gray-100 rounded-lg shadow hover:bg-gray-200 transition"
        >
          <Icon className="h-8 w-8 text-gray-700" />
          <span className="text-[15px] text-red-600 break-words mt-2">{name}</span>
        </div>
      ))}
    </div>
  );
};

export default IconGallery;
