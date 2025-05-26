import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";



const ShippingModal = ({ isOpen, setIsOpen }) => {

    const conditions = [
        { id: 1, condition: 'Royal Mail 2nd Class', description: 'Packaged in a padded envelope and delivered within 2-3 working days.', figures: 'Fits around 3-4 figures.', price: 1.55, tracking: false },
        { id: 2, condition: 'Royal Mail Tracked 48', description: 'Packaged in a padded envelope and delivered within 2-3 working days.', figures: 'Fits around 3-4 figures.', price: 2.70, tracking: true },
        { id: 3, condition: 'Royal Mail Tracked 24', description: 'Packaged in a padded envelope and delivered within 1-2 working days.', figures: 'Fits around 3-4 figures.', price: 3.60, tracking: true },
        { id: 4, condition: 'Royal Mail 2nd Class (250g)', description: 'Packaged in a padded envelope and delivered within 2-3 working days. Suited for larger orders.', figures: 'Fits around 15-20 figures.', price: 2.00, tracking: false },
        { id: 5, condition: 'Royal Mail Tracked 48', description: 'Packaged in a shoe box and delivered within 2-3 working days. Suited for larger orders.', figures: 'Fits around 20+ figures.', price: 3.45, tracking: true },
    ]


    return (

        <>

<Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={setIsOpen}>
        {/* Background Overlay */}
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
            <Dialog.Panel className="bg-white p-6 rounded-xl shadow-lg w-200">
              {/* Header */}
              <div className="flex justify-between items-center">
                <Dialog.Title className="text-xl font-semibold text-gray-800">Shipping Options</Dialog.Title>
                <button onClick={() => setIsOpen(false)}>
                  <XMarkIcon className="w-5 text-gray-500 hover:text-gray-700 cursor-pointer" />
                </button>
              </div>

              <p className="text-gray-500 text-sm mb-4">View our shipping information below.</p>

              
              <div className="py-4">
            <p className="text-gray-600 mb-4 text-sm">
              If you would like to use another shipping method, please <span onClick={() => window.open('/contact', '_blank')} className="text-indigo-600 hover:text-indigo-700 cursor-pointer font-bold">contact</span> us.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {conditions.map((item) => (
                <div key={item.id} className={`border border-gray-200 rounded-lg p-4 relative`}>
                <div className="absolute top-0 right-0 bg-indigo-600 rounded-tr-lg">
                    <p className="font-bold text-xs text-white p-1">£{(item.price).toFixed(2)}</p>
                </div>
                  <h3 className="text-base font-bold text-gray-800 mb-1">
                    {item.condition}
                  </h3>
                  <p className="text-gray-600 text-sm">{item.description}</p>
                  <p className="text-gray-600 text-sm">{item.figures}</p>
                  <p className="text-gray-600 text-sm">{item.tracking ? 'Includes tracking.' : 'Does not include tracking.'}</p>
                </div>
              ))}
            </div>
          </div>


            </Dialog.Panel>
          </Transition.Child>
          
        </div>
      </Dialog>
    </Transition>
        
        </>
    )
}

export default ShippingModal;