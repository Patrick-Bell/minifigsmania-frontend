import { useState } from 'react'
import Navbar from '../front_page/Navbar'
import Footer from '../front_page/Footer'
import { shipping } from '../api/Shipping'

const ShippingPage = () => {
    const [activeSection, setActiveSection] = useState(null)

   

    return (
        <>
            <Navbar />
            
        <div className="isolate bg-white px-6 py-24 sm:py-32 lg:px-8 max-w-7xl mx-auto">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
      >
        <div
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
          className="relative left-1/2 -z-10 aspect-1155/678 w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
        />
      </div>
      <div className="mx-auto max-w-2xl text-center">
      <p className="font-bold text-indigo-600 text-xs sm:text-sm tracking-widest mb-2 sm:mb-3">SHIPPING INFORMATION</p>
      <h2 className="text-4xl font-semibold tracking-tight text-balance text-gray-900 sm:text-5xl">Shipping & Delivery</h2>
      </div>


          <div className='p-6 mt-10'>
      {Object.entries(shipping).map(([category, questions]) => (
            <div key={category} className="mb-8">
              <p className="text-sm font-bold text-indigo-600 uppercase tracking-wider mb-4">{category}</p>
              
              {questions.map((item, index) => (
                <div key={index} className="border-b border-gray-200 w-full py-4 transition-all duration-200">
                    <div className='flex items-center justify-between'>
                    <p className="font-bold text-gray-800">{item.method}</p>
                    <p className='font-bold text-indigo-500'>£{(item.price).toFixed(2)}</p>
                    </div>
                  <div className="overflow-hidden transition-all duration-300 max-h-40 mt-3">
                    <p className="text-sm text-gray-700">{item.days}</p>
                  </div>
                </div>
              ))}
            </div>
          ))}
          </div>
          
         <div className='text-center'>
            <p className='text-sm text-gray-700'>If you are making a large order, please <span onClick={() => window.open('/contact', '_blank')} className='text-indigo-500 cursor-pointer hover:text-indigo-700 font-bold'>contact us</span> before checking out and we will see if there is anything else we can do to limit shipping costs for you.</p>
         </div>
        </div>
     
            <Footer />
        </>
    )
}

export default ShippingPage