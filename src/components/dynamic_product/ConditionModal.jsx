import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";



const ConditionModal = ({ isOpen, setIsOpen, product }) => {

    const conditions = [
        { id: 1, condition: 'New', description: 'Brand new product in its original packaging. Most of our listings will be "New" condition', },
        { id: 2, condition: 'Very Good', description: 'Brand new product in its original packaging but may have some discolor or misprint.', },
        { id: 3, condition: 'Light use', description: 'Removed from original packaging and used a few times.', },
        { id: 4, condition: 'Moderate use', description: 'Removed from original packaging and used a lot.', },
        { id: 5, condition: 'Poor', description: 'Removed from original packaging and signs of extensive use, may be missing parts.', }

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
                <Dialog.Title className="text-xl font-semibold text-gray-800">Conditions</Dialog.Title>
                <button onClick={() => setIsOpen(false)}>
                  <XMarkIcon className="w-5 text-gray-500 hover:text-gray-700 cursor-pointer" />
                </button>
              </div>

              <p className="text-gray-500 text-sm mb-4">View our condition information below.</p>

              
              <div className="py-4">
            <p className="text-gray-600 mb-4 text-sm">
              We carefully assess all items to provide accurate condition information. 
              Please review our condition categories to understand what to expect.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {conditions.map((item) => (
                <div key={item.id} className={`border ${product.condition === (item.condition).toLowerCase() ? 'border-indigo-600' : 'border-gray-200'} rounded-lg p-4`}>
                  <h3 className="text-base font-bold text-gray-800 mb-1">
                    {item.condition}
                  </h3>
                  <p className="text-gray-600 text-sm">{item.description}</p>
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

export default ConditionModal;