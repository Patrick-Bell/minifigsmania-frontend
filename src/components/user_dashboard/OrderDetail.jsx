import React, { useState } from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import UserOrderInvoice from './UserOrderInvoice';
import RefundOrder from './RefundOrder';

const OrderDetail = ({ order, setSelectedOrder }) => {
  
  const [open, setOpen] = useState(false)

  const closeModal = () => {
    setOpen(false)
  }

  if (!order) return null;

  // Calculate delivery status percentage
  const calculateProgress = () => {
    const statuses = ['pending', 'processing', 'shipped', 'delivered'];
    const currentIndex = statuses.indexOf(order.status);
    return ((currentIndex + 1) / statuses.length) * 100;
  };

  const calculateRefundProgress = () => {
    const statuses = ['refunded', 'returned', 'resolved'];
    const currentIndex = statuses.indexOf(order.status)
    return ((currentIndex + 1) / statuses.length) * 100
  }

  const showStaus = (status) => {
    switch (status) {
        case "pending":
            return (
                <span className="text-gray-700 bg-gray-200 p-1 rounded-md font-bold text-xs">Pending</span>
            );
        case "processing":
            return (
                <span className="text-blue-700 bg-blue-200 p-1 rounded-md font-bold text-xs">Processing</span>
            );
        case "shipped":
            return (
                <span className="text-orange-700 bg-orange-200 p-1 rounded-md font-bold text-xs">Shipped</span>
            );
            case "delivered":
            return (
                <span className="text-green-700 bg-green-200 p-1 rounded-md font-bold text-xs">Delivered</span>
            );
        case "cancelled":
            return (
                <span className="text-red-700 bg-red-200 p-1 rounded-md font-bold text-xs">Cancelled</span>
            );
        case "refunded":
            return (
                <span className="text-red-700 bg-red-200 p-1 rounded-md font-bold text-xs">Refunded</span>
            );
    }
}

  return (
    <>
    <RefundOrder order={order} isOpen={open} onClose={closeModal} setSelectedOrder={setSelectedOrder} />

    <div className="z-50 flex justify-center border border-gray-200 rounded-lg">
      <div className="bg-white rounded-lg w-full">
        {/* Header with close button */}
        <div className="flex justify-between items-center p-4 border-b border-gray-200 sticky top-0 bg-white">
          <h2 className="text-xl font-semibold text-gray-800">Order Details</h2>
          <button 
            onClick={() => setSelectedOrder(null)} 
            className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100 cursor-pointer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Order summary section */}
        <div className="p-4 bg-indigo-50">
          <div className="flex flex-wrap justify-between items-start">
            <div>
              <p className="text-sm text-gray-600">Order #{order.order_id}</p>
              <p className="text-sm text-gray-600">Placed on: {new Date(order.date).toLocaleDateString()}</p>
            </div>
            <div className="flex items-center">
              <span className={`text-sm font-medium px-3 py-1 rounded`}>
                {showStaus(order?.status)}
              </span>
            </div>
          </div>
        </div>

        {/* Delivery tracking section */}
        <div className="p-4 border-b border-gray-200">
        <h3 className="text-md font-medium mb-4">Delivery Status</h3>

        {['refunded', 'returned', 'resolved'].includes(order?.status) ? (
             <div className="mb-6">
             <div className="w-full bg-gray-200 rounded-full h-2.5">
               <div 
                 className="bg-indigo-600 h-2.5 rounded-full" 
                 style={{ width: `${calculateRefundProgress()}%` }} 
               ></div>
             </div>
             <div className="flex justify-between mt-2 text-xs text-gray-500">
               <span>Refund Received</span>
               <span>Items Returned</span>
               <span>Refunding Processed</span>
             </div>
           </div>
          ):(
            <div className="mb-6">
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-indigo-600 h-2.5 rounded-full" 
                style={{ width: `${calculateProgress()}%` }} 
              ></div>
            </div>
            <div className="flex justify-between mt-2 text-xs text-gray-500">
              <span>Order Placed</span>
              <span>Processing</span>
              <span>Shipped</span>
              <span>Delivered</span>
            </div>
          </div>
          )}
         

          {/* Delivery info */}
          <div className="flex flex-col gap-4">
            <div>
              <p className="text-sm font-bold text-gray-700">Shipping Address</p>
              <p className="text-sm text-gray-600">{order?.address}</p>
            </div>
            <div>
              <p className="text-sm font-bold text-gray-700">Delivery Method</p>
              <p className="text-sm text-gray-600">Standard Shipping</p>
              <p className="text-sm text-gray-600 font-bold mt-5">Expected Delivery:</p>
              <p className="text-sm font-medium text-indigo-600">{new Date(order.delivery_date).toLocaleDateString()}</p>
            </div>
            {order.tracking_id && (
              <div>
                <p className="text-sm font-bold text-gray-700">Tracking Number</p>
                <p className="text-sm text-indigo-600">{order?.tracking_id || 'TRACK123456789'}</p>
              </div>
            )}
          </div>
        </div>

        {/* Order items section */}
        <div className="p-4 border-b border-gray-200">
          <h3 className="text-md font-medium mb-4">Order Items</h3>
          
          {order.line_items.map((product) => (
            <div key={product.id} className="flex py-3 border-b border-gray-100 last:border-0">
              <div className="w-20 h-20 rounded overflow-hidden flex-shrink-0 border border-gray-200">
                <img
                  src={product?.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="ml-4 flex-grow">
                <h4 className="text-sm font-medium">{product.name}</h4>
                <p className="text-xs text-gray-500 mt-1">Category: {product.category || 'Minifigures'}</p>
                
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-xs text-gray-500">Quantity: {product.quantity}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">Price per item:</p>
                    <p className="text-sm font-bold text-indigo-600">£{product.price}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Payment section */}
        <div className="p-4 border-b border-gray-200">
          <h3 className="text-md font-medium mb-4">Payment Information</h3>
          
          <div className="flex justify-between">
            <div>
              <p className="text-sm text-gray-600">Payment Method</p>
              <div className="flex items-center mt-1">
                <svg className="w-8 h-6 mr-2" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="48" height="48" rx="6" fill="#1434CB" />
                  <path d="M18 31H30V29H18V31Z" fill="white" />
                  <path d="M18 24H30V16H18V24Z" fill="#FF5F00" />
                  <path d="M19 20C19 17.7909 20.0536 15.7683 21.7627 14.5C20.7708 13.5538 19.4571 13 18 13C14.6863 13 12 16.134 12 20C12 23.866 14.6863 27 18 27C19.4571 27 20.7708 26.4462 21.7627 25.5C20.0536 24.2317 19 22.2092 19 20Z" fill="#EB001B" />
                  <path d="M36 20C36 23.866 33.3137 27 30 27C28.5429 27 27.2292 26.4462 26.2373 25.5C27.9464 24.2317 29 22.2092 29 20C29 17.7909 27.9464 15.7683 26.2373 14.5C27.2292 13.5538 28.5429 13 30 13C33.3137 13 36 16.134 36 20Z" fill="#F79E1B" />
                </svg>
                <span className="text-sm font-medium">•••• 5678</span>
              </div>
            </div>
          </div>

          <div className="mt-4">
            <div className="flex justify-between py-1">
              <span className="text-sm text-gray-600">Subtotal:</span>
              <span className="text-sm text-gray-600">£{order.total_price}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-sm text-gray-600">Shipping:</span>
              <span className="text-sm text-gray-600">£{order.shipping_fee || 'Free'}</span>
            </div>
            <div className="flex justify-between py-2 border-t border-gray-200 mt-2">
              <span className="text-md font-bold">Total:</span>
              <span className="text-md font-bold text-indigo-600">£{order.total_price}</span>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="p-4 flex flex-wrap justify-between gap-2">
          <div>
          {!['refunded', 'returned', 'resolved'].includes(order?.status) && (
              <button onClick={() => setOpen(true)} className="px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded hover:bg-gray-100 mr-2 cursor-pointer">
              <svg className="w-4 h-4 inline-block mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Refund Order
              </button>
            )}
            <button onClick={() => window.open('/frequently-asked-questions', '_blank')} className="px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded hover:bg-gray-100 cursor-pointer">
              <svg className="w-4 h-4 inline-block mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Need Help?
            </button>
          </div>
          <PDFDownloadLink 
          document={<UserOrderInvoice order={order} />} 
          fileName={`invoice-${order.order_id}.pdf`}
          className="px-4 py-2 text-sm text-white bg-indigo-500 rounded hover:bg-indigo-600"
        >
          {({ blob, url, loading, error }) => 
            loading ? 'Generating PDF...' : 'Download Invoice'
          }
        </PDFDownloadLink>
        </div>
      </div>
    </div>
    </>
  );
};

export default OrderDetail;


       