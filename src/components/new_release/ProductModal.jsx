import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";

const ProductModal = ({ isOpen, setIsOpen, product }) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={setIsOpen}>
        {/* Overlay */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/50" />
        </Transition.Child>

        {/* Modal Container */}
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="bg-white rounded-xl w-full max-w-3xl overflow-hidden relative">
              {/* Modal Header */}
              <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
                <Dialog.Title className="text-lg font-semibold text-gray-900">
                  {product?.name}
                </Dialog.Title>
                <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-gray-700">
                  <XMarkIcon className="w-5 h-5 cursor-pointer" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="flex flex-col sm:flex-row">
                {/* Left: Image */}
                <div className="w-full sm:w-1/2 p-4 flex items-center justify-center">
                  <img
                    src={product?.image}
                    alt={product?.name}
                    className="max-h-64 w-auto object-contain rounded-md"
                  />
                </div>

                {/* Right: Details */}
                <div className="w-full sm:w-1/2 p-6 space-y-4">

                <div className="flex justify-between items-center">
                    <p className="text-sm text-gray-700">Product</p>
                    <p className="text-sm text-gray-700">{product?.name}</p>
                  </div>

                  <div className="flex justify-between items-center">
                    <p className="text-sm text-gray-700">Price</p>
                    <p className="text-sm text-gray-700">£{product?.price?.toFixed(2)}</p>
                  </div>

                  <div className="flex justify-between items-center">
                    <p className="text-sm text-gray-700">Condition</p>
                    <p className="text-sm text-gray-700">{product?.condition || "N/A"}</p>
                  </div>

                  <div className="flex justify-between items-center">
                    <p className="text-sm text-gray-700">Expected Release Date</p>
                    <p className="text-sm text-gray-700">{product?.expected_date || "TBD"}</p>
                  </div>

                  <div className="flex justify-between items-center">
                    <p className="text-sm text-gray-700">Stock</p>
                    <p className="text-sm text-gray-700">{product?.stock || "TBD"}</p>
                  </div>

                  <div className="flex justify-between items-center">
                    <p className="text-sm text-gray-700">Category</p>
                    <p className="text-sm text-gray-700">{product?.category || "TBD"}</p>
                  </div>

                  <div className="flex justify-between items-center">
                    <p className="text-sm text-gray-700">Find similar products</p>
                    <p onClick={() => window.open(`/products?category=marvel`, '_blank')} className="text-sm text-gray-700 hover:text-indigo-800 cursor-pointer transition-colors">click here</p>
                  </div>

                  <p className="text-xs text-gray-500 bottom-2 absolute">This is a pre-release item. Availability & details may change.</p>
                </div>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ProductModal;
