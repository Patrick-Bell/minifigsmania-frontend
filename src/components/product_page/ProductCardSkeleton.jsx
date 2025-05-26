import React from 'react'

const ProductCardSkeleton = ({ times }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {Array.from({ length: times }).map((_, index) => (
        <div key={index} className="relative flex flex-col h-full pointer-events-none animate-pulse mx-auto">
          <div className="aspect-square h-50 bg-gray-400 rounded-md bg-opacity-60" />
          <div className="mt-1 flex gap-2">
          <div className="w-full h-7 animate-pulse bg-gray-400 rounded-md" />
          <div className="w-full h-7 animate-pulse bg-gray-400 rounded-md" />
          </div>
          <div className="w-full h-7 animate-pulse bg-gray-400 rounded-md mt-1" />
          <div className="w-full h-7 animate-pulse bg-gray-400 rounded-md mt-1" />
        </div>
      ))}
    </div>
  );
};

export default ProductCardSkeleton;
