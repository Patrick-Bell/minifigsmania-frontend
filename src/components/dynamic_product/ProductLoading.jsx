import Footer from "../front_page/Footer";
import Navbar from "../front_page/Navbar";

const ProductLoading = () => {
  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-center p-6 mx-auto gap-10 w-full">
        {/* Left Side: Image */}
        <div className="w-full md:w-[400px] h-[400px] bg-gray-300 animate-pulse rounded-lg" />

        {/* Right Side: Text & Buttons */}
        <div className="flex flex-col gap-4 w-full md:w-1/2">
          {/* Title */}
          <div className="h-8 w-2/3 bg-gray-300 animate-pulse rounded" />

          {/* Price */}
          <div className="h-6 w-1/4 bg-gray-300 animate-pulse rounded" />

          {/* Short detail line */}
          <div className="h-5 w-32 bg-gray-300 animate-pulse rounded" />

          {/* Button */}
          <div className="h-12 w-32 bg-gray-300 animate-pulse rounded" />

          {/* Description */}
          <div className="h-53 w-full bg-gray-300 animate-pulse rounded" />
        </div>
      </div>
      <div className="flex space-x-6 ml-6">
            <div className="h-10 w-24 bg-gray-300 rounded"></div>
            <div className="h-10 w-24 bg-gray-300 rounded"></div>
            <div className="h-10 w-24 bg-gray-300 rounded"></div>
        </div>
        <div className="h-40 bg-gray-300 animate-pulse rounded mt-2 mb-4"></div>
        </div>

        <Footer />

      
    </>
  );
};

export default ProductLoading;
