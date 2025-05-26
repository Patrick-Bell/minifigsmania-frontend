import React, { useEffect, useState } from 'react';
import { X, Package, Tag, Clock, ArrowRight, ShoppingBag, Gift, Percent, Check, Copy } from 'lucide-react';
import { getPromotions } from '../routes/PromotionRoutes';
import { toast } from 'sonner';

const SpecialOffers = ({ isOpen, onClose }) => {
  const [promotions, setPromotions] = useState([])

  const fetchPromotions = async () => {
    const response = await getPromotions()
    setPromotions(response.filter(promo => promo.active === true))
  }

  useEffect(() => {
    fetchPromotions()
  }, [])


  const copyCode = (code) => {
    navigator.clipboard.writeText(code)
    toast.success('Text copied to clipboard', {
      description: `Code ${code} copied to clipboard.`,
      })
  }
  
  if (!isOpen) return null;

 
  return (
    <div className="fixed inset-0 bg-gray-800/70 flex items-center justify-center z-80 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-auto">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 rounded-t-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Tag className="h-6 w-6 text-white mr-2" />
              <h2 className="text-2xl font-bold text-white">Special Offers</h2>
            </div>
            <button 
              onClick={onClose}
              className="text-white hover:text-gray-200 transition-colors focus:outline-none cursor-pointer"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          <p className="text-indigo-100 mt-2">Exclusive deals and discounts just for you</p>
        </div>
     

        {/* Offers List */}
        <div className="p-4">
          {promotions.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No offers currently available.
            </div>
          ) : (
            <div className="space-y-4">
              {promotions.map(offer => (
                <div 
                  key={offer.id}
                  className={`border rounded-lg p-4 transition-all ${
                    offer.highlighted 
                      ? 'border-indigo-200 bg-indigo-50 shadow-md' 
                      : 'border-gray-200 hover:border-indigo-200 hover:bg-indigo-50'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-lg text-gray-800">{offer.title}</h3>
                      <p className="text-gray-600 mt-1">{offer.description}</p>
                    </div>
                    {promotions.highlighted && (
                      <span className="bg-indigo-600 text-white text-xs uppercase font-bold px-2 py-1 rounded">
                        Featured
                      </span>
                    )}
                  </div>
                  
                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 text-gray-500 mr-1" />
                      <span className="text-sm text-gray-500">Expires: {new Date(offer.expires_at).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center">
                      <div className="bg-gray-100 px-3 py-1 rounded border border-gray-200 font-mono text-sm mr-2">
                        {offer.code}
                      </div>
                      <button onClick={() => copyCode(offer.code)} className="text-indigo-600 font-medium text-sm flex items-center hover:text-indigo-800 cursor-pointer">
                        Copy <Copy className="h-4 w-4 ml-1" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Modal Footer */}
        <div className="border-t border-gray-200 p-4 flex justify-between items-center bg-gray-50 rounded-b-lg">
          <p className="text-sm text-gray-500">
            Offers subject to availability and terms
          </p>
          <button
            onClick={onClose}
            className="cursor-pointer px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default SpecialOffers;