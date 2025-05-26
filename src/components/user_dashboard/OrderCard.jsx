const OrderCard = ({ order, setSelectedOrder }) => {

  const getTotalItemsCount = (orders) => {
    return orders?.reduce((total, item) => {
      return total + (item?.quantity || 0);
    }, 0);
  };

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
        case "returned":
        case "resolved":
            return (
                <span className="text-red-700 bg-red-200 p-1 rounded-md font-bold text-xs">Refunded</span>
            );
    }
}
    

    return (

        <>

        <div className="bg-white rounded-lg mb-4 border border-gray-200">
          {/* Order Header */}
          <div className="flex justify-between items-center p-4 border-b border-gray-200">
            <div className="flex items-center space-x-4">
              <span className="text-xs text-gray-500">
                Order placed: {new Date(order.date).toLocaleDateString()}
              </span>
              <span className="text-xs text-gray-500">|</span>
              <span className="text-xs text-gray-500">
                Order #{order?.order_id}
              </span>
            </div>
            <div className="flex items-center">
              <span className={`text-xs font-medium px-2 py-1 rounded`}>
                {showStaus(order?.status)}
              </span>
            </div>
          </div>

          {/* Order Body */}
          <div className="p-4">
            {/* Store Info */}
            <div className="flex items-center mb-3">
              <svg className="w-4 h-4 text-gray-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z"></path>
              </svg>
              <span className="text-sm font-medium">MinifigsMania</span>
              <button onClick={() => window.open('/products', '_blank')} className="ml-2 text-xs text-gray-500 hover:text-indigo-500 cursor-pointer">
                Visit Store
              </button>
            </div>

            {/* Products Info */}
            <div className="py-3">
              {/* First 3 items in a row */}
              <div className="flex mb-3">
                {order?.line_items?.slice(0, 3).map((item, index) => (
                  <div key={item.id} className={`flex flex-col ${index > 0 ? 'ml-4' : ''}`} style={{ width: '80px' }}>
                    <div className="relative w-16 h-16 rounded overflow-hidden flex-shrink-0 border border-gray-200">
                      <img
                        src={item?.image}
                        alt={item?.name}
                        className="w-full h-full object-cover"
                      />
                      {item?.quantity > 1 && (
                        <div className="absolute top-0 right-0 bg-gray-800 bg-opacity-70 text-white text-xs px-1 rounded-bl">
                          x{item?.quantity}
                        </div>
                      )}
                    </div>
                    <div className="text-xs text-gray-500 mt-1 truncate" title={item?.name}>
                      {item?.name}
                    </div>
                    <div className="text-xs font-medium text-indigo-500">
                      £{item?.price}
                    </div>
                  </div>
                ))}
                
                {/* Additional items count */}
                {order?.line_items?.length > 3 && (
                  <div className="flex items-center justify-center ml-4 w-16 h-16 border border-gray-200 rounded bg-gray-50">
                    <div className="text-center">
                      <div className="text-sm font-medium text-gray-600">+{order?.line_items?.length - 3 || 'test'}</div>
                      <div className="text-xs text-gray-500">more</div>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Item count summary */}
              <div className="text-xs text-gray-500 mt-2">
                {getTotalItemsCount(order?.line_items)} item{getTotalItemsCount(order?.line_items) > 1 ? 's' : ''} in this order
              </div>
            </div>

            {/* Order Summary */}
            <div className="flex justify-end py-2 border-t border-gray-200">
              <div className="text-right">
                <p className="text-xs text-gray-500 mb-1">
                  Order Total:
                </p>
                <p className="text-base font-bold text-indigo-500">£{order?.total_price}</p>
              </div>
            </div>
          </div>

          {/* Order Actions */}
          <div className="flex justify-between items-center px-4 py-3 bg-gray-50 rounded-b-lg">
            <div className="text-xs text-gray-500">
              Estimated delivery: {order?.expected_delivery}
            </div>
            <div className="flex space-x-2">
              <button onClick={() => window.open('/contact', '_blank')} className="px-3 py-1 text-xs text-gray-600 border border-gray-300 rounded hover:bg-gray-100 cursor-pointer">
                Contact Us
              </button>
              <button onClick={() => setSelectedOrder(order)} className="px-3 py-1 text-xs text-white bg-indigo-500 rounded hover:bg-indigo-600 cursor-pointer">
                View Details
              </button>
            </div>
          </div>
        </div>
        
        </>
    )
}

export default OrderCard