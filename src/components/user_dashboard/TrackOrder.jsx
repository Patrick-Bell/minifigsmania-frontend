import React, { useEffect, useState } from 'react';
import { X, Search, Package, Truck, CheckCircle, AlertTriangle, FileCheck, ShoppingBag, Home, Check, CheckIcon, ToyBrick, AlertCircle } from 'lucide-react';
import { trackOrder } from '../routes/OrderRoutes';

const TrackOrder = ({ isOpen, onClose }) => {
  const [trackingId, setTrackingId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [orderStatus, setOrderStatus] = useState(null);
  const [error, setError] = useState(null);
  const [order, setOrder] = useState(null)

  const trackingStages = [
    { id: 1, title: 'pending', icon: <ToyBrick size={18} />, description: 'Payment has been confirmed.' },
    { id: 2, title: 'processing', icon: <ShoppingBag size={18} />, description: 'Order is being prepared.' },
    { id: 3, title: 'shipped', icon: <Truck size={18} />, description: 'Order has left our warehouse.' },
    { id: 4, title: 'delivered', icon: <Package size={18} />, description: 'Package has been delivered.' },
  ];

  const returnStages = [
    { id: 1, title: 'refunded', icon: <ToyBrick size={18} />, description: 'Refund request processing.' },
    { id: 2, title: 'returned', icon: <ShoppingBag size={18} />, description: 'We have received your order.' },
    { id: 3, title: 'resolved', icon: <Truck size={18} />, description: 'Funds will be in your account within 5 business days.' },
  ];

  const fetchOrder = async (trackingId) => {
    try {
      const response = await trackOrder(trackingId);
      setOrder(response);
    } catch (e) {
      console.log(e);
      setOrder(null);
      setError('No tracking information found. Please check your tracking ID and try again.');
      setOrderStatus('Error');
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!trackingId.trim()) return;

    setIsLoading(true);
    setError(null);

    setTimeout(() => {
      const result = fetchOrder(trackingId);
      if (result) {
        setOrderStatus(result);
      } else {
        setError('No tracking information found. Please check your tracking ID and try again.');
      }
      setIsLoading(false);
    }, 1200);
  };

  const renderTrackingMessage = (status) => {
    switch (status) {
      case 'pending':
        return <p className="text-green-600 font-medium">Your payment is confirmed!</p>;
      case 'delivered':
        return <p className="text-blue-600 font-medium">Your order has been delivered!</p>;
      case 'shipped':
        return <p className="text-blue-600 font-medium">Your order is on its way!</p>;
      case 'processing':
        return <p className="text-amber-600 font-medium">Your order is being processed!</p>;
      case 'refunded':
      case 'returned':
      case 'resolved':
        return <p className="text-red-600 font-medium">Your order is being refunded.</p>;  // Added refunded message
      default:
        return <p className="text-gray-600 font-medium">Order status unknown.</p>;
    }
  };

  const formatDate = (dateString) => {
    const options = { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-200/70 bg-opacity-50 flex items-center justify-center z-80 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-auto">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center">
            <Package className="h-6 w-6 text-indigo-600 mr-2" />
            <h2 className="text-xl font-semibold text-gray-800">Track Your Order</h2>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors focus:outline-none cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Search Form */}
        <div className="p-6 border-b border-gray-200">
          <form onSubmit={handleSearch} className="flex space-x-2">
            <div className="flex-grow">
              <input
                type="text"
                value={trackingId}
                onChange={(e) => setTrackingId(e.target.value)}
                placeholder="Enter your tracking ID (e.g., TRK123456789)"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 placeholder-gray-400"
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 flex items-center disabled:bg-indigo-400"
            >
              {isLoading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Searching...
                </span>
              ) : (
                <span className="flex items-center cursor-pointer">
                  <Search className="h-4 w-4 mr-1" />
                  Track
                </span>
              )}
            </button>
          </form>
        </div>

        {/* Results Section */}
        <div className="p-6">
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
              <div className="flex">
                <AlertTriangle className="h-5 w-5 text-red-500" />
                <div className="ml-3">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            </div>
          )}

          {orderStatus && !error && !isLoading && (
            <div className="space-y-6">
              {/* Status Summary */}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    {renderTrackingMessage(order?.status)}
                    <p className="text-sm text-gray-500">Order Date: {formatDate(order?.date)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-600">{order?.status === 'refunded' || order?.status === 'returned' || order?.status === 'resolved' ? 'Estimated Return' : 'Estimated Delivery'}</p>
                    <p className="text-lg font-semibold text-gray-800">
                      {order?.status === 'refunded' || order?.status === 'returned' || order?.status === 'resolved' ? '5 Business Days' : new Date(order?.delivery_date).toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric', 
                        year: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
                <p className="text-sm flex items-center text-gray-600">
                  <Truck className="h-4 w-4 mr-1" />
                  Current location: <span className="font-medium ml-1">{order?.status === 'pending' || order?.status === 'processing' ? 'Warehouse' : 'with Royal Mail'}</span>
                </p>
              </div>

              {/* Progress Tracker */}
              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-4">Shipping Progress</h3>
                <div className="relative">
                {order?.status === 'refunded' || order?.status === 'returned' || order?.status === 'resolved' ? (
<>
<div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-200">
                    <div 
                      className="h-full bg-indigo-600" 
                      style={{ 
                        width: `${
                          orderStatus.status === 'refunded' ? '33%' :
                          orderStatus.status === 'returned' ? '66%' :
                          orderStatus.status === 'resolved' ? '100%' : '100'
                        }`
                      }}
                    ></div>
                  </div>

                  {/* Steps */}
                  <div className="flex justify-between relative">
                    {returnStages.map((stage) => {
                      const isActive = returnStages.findIndex(s => s.title.toLowerCase() === order?.status) >= returnStages.findIndex(s => s.id === stage.id);
                      const isCurrentStage = stage.title.toLowerCase() === order?.status;

                      return (
                        <div key={stage.id} className="flex flex-col items-center relative">
                          <div className={`
                            w-10 h-10 rounded-full flex items-center justify-center z-10 
                            ${isActive ? 'bg-indigo-600 text-white' : 'bg-white border-2 border-gray-300 text-gray-400'}
                            ${isCurrentStage ? 'ring-4 ring-indigo-100' : ''}
                          `}>
                            {stage.icon}
                          </div>
                          <p className={`
                            mt-2 text-xs font-medium text-center
                            ${isActive ? 'text-indigo-600' : 'text-gray-500'}
                          `}>
                            {(stage.title).charAt(0).toUpperCase() + stage.title.slice(1)}
                          </p>
                          <p className="text-xs text-gray-400 text-center mt-1 max-w-[100px]">
                            {stage.description}
                          </p>
                        </div>
                      );
                    })}
                  </div>
</>
                ) : (
<>
<div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-200">
                    <div 
                      className="h-full bg-indigo-600" 
                      style={{ 
                        width: `${
                          orderStatus.status === 'pending' ? '0%' :
                          orderStatus.status === 'processing' ? '33%' :
                          orderStatus.status === 'shipped' ? '66%' :
                          orderStatus.status === 'delivered' ? '100%' :
                          orderStatus.status === 'refunded' ? '0%' : '0%'
                        }`
                      }}
                    ></div>
                  </div>

                  {/* Steps */}
                  <div className="flex justify-between relative">
                    {trackingStages.map((stage) => {
                      const isActive = trackingStages.findIndex(s => s.title.toLowerCase() === order?.status) >= trackingStages.findIndex(s => s.id === stage.id);
                      const isCurrentStage = stage.title.toLowerCase() === order?.status;

                      return (
                        <div key={stage.id} className="flex flex-col items-center relative">
                          <div className={`
                            w-10 h-10 rounded-full flex items-center justify-center z-10 
                            ${isActive ? 'bg-indigo-600 text-white' : 'bg-white border-2 border-gray-300 text-gray-400'}
                            ${isCurrentStage ? 'ring-4 ring-indigo-100' : ''}
                          `}>
                            {stage.icon}
                          </div>
                          <p className={`
                            mt-2 text-xs font-medium text-center
                            ${isActive ? 'text-indigo-600' : 'text-gray-500'}
                          `}>
                            {(stage.title).charAt(0).toUpperCase() + stage.title.slice(1)}
                          </p>
                          <p className="text-xs text-gray-400 text-center mt-1 max-w-[100px]">
                            {stage.description}
                          </p>
                        </div>
                      );
                    })}
                  </div>
</>
                )}
                  {/* Progress Bar */}
                  
                </div>
              </div>

              {/* Generic Tracking Info (replacing the detailed history) */}
              <div>
              {order?.status === 'refunded' || order?.status === 'returned' || order?.status === 'resolved' ? (
                <>
                <h3 className="text-lg font-medium text-gray-800 mb-2">Refund Information</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-start">
                    <FileCheck className="h-5 w-5 text-indigo-600 mt-0.5 mr-3" />
                    <div>
                      <p className="text-sm text-gray-600">
                        Your order has been marked as refunded. You need to send the order back in its original packaging. If your item has been removed from its packaging, then please email us as <span className='text-indigo-600 font-semibold'>minifigsmania@gmail.com</span> with pictures of your item so we can examine its condition. Pictures must be clear and include the full product. 
                        If eligible for a refund, please use a tracked service as items lost during transit will not be eligible for a refund.
                      </p>
                      <p className="mt-2 text-sm text-gray-600">
                        Please allow a couple days for your order to be returned. Then we will process the refund and keep you updated.
                      </p>
                    </div>
                  </div>
                </div>
                </>
              ):(
                <>
                <h3 className="text-lg font-medium text-gray-800 mb-2">Tracking Information</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-start">
                    <FileCheck className="h-5 w-5 text-indigo-600 mt-0.5 mr-3" />
                    <div>
                      <p className="text-sm text-gray-600">
                        Your package is currently in transit. Our system updates package status information as your shipment moves through our network. Please check back later for the latest status.
                      </p>
                      <p className="mt-2 text-sm text-gray-600">
                        Weather conditions, holidays, and other events may impact delivery times. We appreciate your patience.
                      </p>
                    </div>
                  </div>
                </div>
                </>
              )}
                
              </div>

              {(order?.status === 'refunded' || order?.status === 'returned' || order?.status === 'resolved') && (
                <div className="bg-red-50 rounded-lg p-4 flex items-start">
                  <div className="mr-3 mt-0.5">
                    <AlertCircle className="h-5 w-5 text-red-600" />
                  </div>
                  <div className="text-gray-800">
                    <p className="text-sm font-medium">Important</p>
                    <p className="text-xs">If you did not request a refund, please get in touch with us.</p>
                  </div>
                </div>
              )}


              {/* Support Section */}
              <div className="bg-indigo-50 rounded-lg p-4 flex items-start">
                <div className="mr-3 mt-0.5">
                  <CheckCircle className="h-5 w-5 text-indigo-600" />
                </div>
                <div className="text-gray-800">
                  <p className="text-sm font-medium">Need assistance?</p>
                  <p className="text-xs">If you're having trouble tracking your package, please contact our support team.</p>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className='pr-6 pb-6 text-right'>
          <button 
            onClick={onClose} 
            className='border border-gray-200 p-2 rounded-lg hover:bg-gray-50 cursor-pointer'>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default TrackOrder;
