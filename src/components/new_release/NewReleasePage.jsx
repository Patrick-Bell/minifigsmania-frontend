import { useState } from "react";
import { newReleases } from "../api/NewRelease";
import Footer from "../front_page/Footer";
import Navbar from "../front_page/Navbar";
import ProductModal from "./ProductModal";
import SignInPromo from "../front_page/SignInPromo";
import BestSells from "../front_page/BestSells";
import NewReleases from "../front_page/NewReleases";
import Offer from "../front_page/Offer";

const NewReleasePage = () => {
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [open, setOpen] = useState(false)

  const handleClick = (product) => {
    setSelectedProduct(product);
    setOpen(true)
  };



  return (
    <>
      <Navbar />
      <ProductModal isOpen={open} setIsOpen={setOpen} product={selectedProduct} />
      <div className="relative px-6 py-24 sm:py-32 lg:px-8 max-w-7xl mx-auto">
        {/* Background Shape */}
        <div
        aria-hidden="true"
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
      >
        <div
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
          className="relative left-[calc(50%-11rem)] aspect-1155/678 w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
        />
      </div>

        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-indigo-600 text-xs sm:text-sm font-bold tracking-widest mb-2 sm:mb-3">
            NEW RELEASE
          </p>
          <h2 className="text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
            Products Releasing Soon
          </h2>
          <p className="text-sm mt-6 text-gray-600">
            A new collection of <strong>{newReleases.length}</strong> Marvel-themed minifigures is arriving soon at MinifigsMania. Don’t miss out! To find out more about each figure, click view details.
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 mt-12">
          {newReleases.map((product) => (
            <div
              key={product.id}
              className="relative duration-300"
            >
              <img
                alt={product.name}
                src={product.image}
                className="aspect-square w-full object-cover rounded-t-xl"
              />
              <div className="pt-1">
                <button
                  onClick={() => handleClick(product)}
                  className="text-sm w-full p-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors cursor-pointer"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
        <SignInPromo />
        <BestSells />
        <NewReleases />
      </div>
      <Footer />
    </>
  );
};

export default NewReleasePage;
