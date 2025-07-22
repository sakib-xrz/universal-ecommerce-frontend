"use client";

const ProductCardSkeleton = () => {
  return (
    <div className="mx-auto w-full animate-pulse rounded-lg border bg-white">
      {" "}
      {/* Image Section */}{" "}
      <div className="relative h-[300px] w-full bg-gray-200"></div>
      {/* Content Section */}
      <div className="p-2 py-3 sm:p-4 sm:py-4">
        <div className="mb-2 h-4 w-3/4 rounded bg-gray-300"></div>

        {/* Price Section */}
        <div className="mb-2 flex items-baseline space-x-2">
          <div className="h-5 w-16 rounded bg-gray-300"></div>
        </div>

        {/* Button Section */}
        <div className="flex w-full items-center justify-center">
          <div className="h-8 w-24 rounded bg-gray-300"></div>
        </div>
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
