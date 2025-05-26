import { useState, useEffect } from "react";
import { useAuth } from '../context/AuthContext'
import axios from "axios";
import ReactTooltip from 'react-tooltip-rc';
import { getProducts } from "../routes/ProductRoutes";


const TrackOrderComponent = ({ setChatHistory }) => {
    const [orderNumber, setOrderNumber] = useState('');
    const [order, setOrder] = useState(null)
    const { user } = useAuth()

    const fetchOrderDetails = async (orderNumber) => {
      try{
        const response = await axios.get(`http://localhost:3000/api/chatbot-order-status/${orderNumber}`, { withCredentials: true });
        setOrder(response.data)
        console.log(response.data)
      }catch(e){
        console.log(e)
      }
    }

    const refundStatus = ['refunded', 'returned', 'resolved'];

    const trackingMessage = (status) => {
      switch (status) {
        case 'processing':
          return 'Your order is being prepared.';
        case 'pending':
          return 'Your order is pending confirmation.';
        case 'shipped':
          return 'Your order has been shipped and is on its way.';
        case 'delivered':
          return 'Your order has been delivered.';
        case 'refunded':
          return 'Your order has been marked as refunded and we are now processing your refund..';
        case 'returned':
          return 'Your order was returned to us successfully. We are processing your refund.';
        case 'resolved':
          return 'Your order has been successfully refunded and the funds have been returned to your account.';
        default:
          return 'We are checking the status of your order.';
      }
    }

   
    
    
    const handleTrackOrder = () => {
      if (orderNumber.trim()) {
        setChatHistory(prev => [
          ...prev,
          { type: 'user', text: `Tracking order: ${orderNumber}` },
          { type: 'bot', text: <div>
            {order ? (
             <div className="space-y-2">
             <p>
               {trackingMessage(order.status)}
             </p>
             {!['refunded', 'returned', 'resolved'].includes(order.status) && (
               <p>
                 Estimated delivery:{" "}
                 <strong>{new Date(order.delivery_date).toLocaleDateString()}</strong>. Please keep in mind that public holidays and weekends may delay deliveries.
               </p>
             )}
             <p className="font-bold text-sm">Order Summary</p>
             <div className="flex gap-2 w-full overflow-scroll">
                 {order.line_items.map(item => (
                   <div className="flex text-xs cursor-pointer" key={item.id} data-tip={`${item.name} (${item.quantity} qty)`} onClick={() => window.open(`/products/${item.product_id}`, '_blank')}>
                    <img src={item.image} className="w-10 h-10" />
                   </div>
                 ))}
             </div>
             <ReactTooltip place="bottom" type="dark" effect="float" className="custom-tooltip" />
             <div className="flex align-middle justify-between">
                 <p>Subtotal</p>
                 <p className="font-bold">£{order.line_items.reduce((acc, item) => acc + (item.price * item.quantity), 0)}</p>
             </div>
             <div className="flex align-middle justify-between">
                 <p>Shipping</p>
                 <p className="font-bold">£{order.shipping_fee}</p>
             </div>
             <div className="h-0.5 w-full bg-gray-200"></div>
             <div className="flex align-middle justify-between">
                 <p>Total</p>
                 <p className="font-bold">£{order.total_price}</p>
             </div>
           </div>
            ):(
              <p className="text-gray-500 col-span-full">No order found.</p>
            )}
          </div> }
        ]);
        setOrderNumber('');
      }
    };

    useEffect(() => {
      fetchOrderDetails(orderNumber)
    }, [handleTrackOrder])
    
    return (
      <div className="space-y-4 border border-gray-200 p-6 rounded-md">
        <div>
        <h3 className="text-xl font-semibold text-gray-800">Track Your Order</h3>
        <p className="text-sm text-gray-500">Enter your Tracking ID to get an update on your order.</p>
      </div>
        
        <div className="space-y-2">
          <label htmlFor="order-number" className="block text-sm font-medium text-gray-700">
            Order Number
          </label>
          <input
            id="order-number"
            type="text"
            value={orderNumber}
            onChange={(e) => setOrderNumber(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-sm"
            placeholder="e.g. ORD-12345"
          />
          <button
            onClick={handleTrackOrder}
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors cursor-pointer"
          >
            Track Order
          </button>
        </div>
      </div>
    );
  };

  export default TrackOrderComponent;