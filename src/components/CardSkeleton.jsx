import React from "react";

const CardSkeleton = () => {
  return (
    <div className="h-80 w-56 rounded-lg border overflow-hidden animate-pulse">
      <div className="w-full h-40 bg-gray-300 rounded-t-md"></div>
      <div className="p-3">
        <div className="bg-gray-300 h-6 w-3/4 mb-2 rounded-lg animate-pulse"></div>
        <div className="bg-gray-300 h-4 w-2/3 mb-2 rounded-lg animate-pulse"></div>
        <div className="bg-gray-300 h-3 w-4/5 mb-1 rounded-lg animate-pulse"></div>
        <div className="bg-gray-300 h-3 w-3/4 mb-2 rounded-lg animate-pulse"></div>
        <div className="bg-gray-300 h-4 w-2/5 rounded-lg animate-pulse"></div>
      </div>
    </div>
  );
};

export default CardSkeleton;
