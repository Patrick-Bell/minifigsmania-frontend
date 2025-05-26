import { X, Package, AlertTriangle, CreditCard, Truck } from 'lucide-react'
import { toast } from  'sonner'
import axios from 'axios'

const RefundOrder = ({ isOpen, onClose, order, setSelectedOrder }) => {

  const confirmRefund = async (id) => {
    try{
        const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/order-refund/${id}`, { order }, { withCredentials: true })
        console.log(response.data)
        toast.success('Refund Request Sent', {
            description: 'Please check your email for further instructions. Please reload to see the updated order status.',
        })
        onClose()
    }catch(e){
        console.log(e)
    }
  }

  if (!isOpen || !order) return null;

  return (
    <div className="fixed inset-0 bg-gray-200/70 bg-opacity-50 flex items-center justify-center z-80 p-6">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-auto">

        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center">
            <Package className="h-6 w-6 text-red-600 mr-2" />
            <h2 className="text-xl font-semibold text-gray-800">Refund Order #{order.id}</h2>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors focus:outline-none"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Order Details */}
    <div className='p-3'>
    <h3 className="text-lg font-semibold text-gray-800 mb-4">Order Details</h3>
    <ul className="space-y-3 mx-2">
      {order.line_items.map((item) => (
        <li key={item.id} className="flex items-center space-x-4">
          <img 
            src={item.image} 
            alt={item.name} 
            className="w-16 h-16 rounded-md object-cover border border-gray-200"
          />
          <div className="flex-1">
            <p className="font-medium text-gray-800">{item.name}</p>
            <p className="text-sm text-gray-500">{item.quantity} × £{item.price.toFixed(2)}</p>
          </div>
          <p className="font-medium text-gray-700">£{(item.price * item.quantity).toFixed(2)}</p>
        </li>
      ))}
    </ul>

    <div className="mt-4 flex justify-between items-center border-t border-gray-200 pt-4 mx-2">
      <p className="font-semibold text-gray-700">Total</p>
      <p className="text-lg font-bold text-gray-800">£{(order.total_price.toFixed(2) - order.shipping_fee).toFixed(2)}</p>
    </div>
  </div>

             <div className='p-6'>
                <h3 className="text-lg font-medium text-gray-800 mb-2">Important Information</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-start">
                    <Truck className="h-5 w-5 text-indigo-600 mt-0.5 mr-3" />
                    <div>
                      <p className="text-sm text-gray-600">
                        You will not be refunded any postage fees for returning your order. Please ensure you use a tracked delivery service to return your items.
                      </p>
                      <p className="mt-2 text-sm text-gray-600">
                       You will recieve the total amount of your order minus the postage fees. If you applied a promotion code at the time of purchase, this will be deducted still. If you have any questions, please <span className='text-indigo-500 cursor-pointer font-bold'><a href='/contact'>contact</a></span> our support team.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

        {/* Refund Instructions */}
        <div className="p-6 border-b border-gray-200 space-y-4">
          <h3 className="text-lg font-medium text-gray-800 mb-2">Refund Instructions</h3>
          <ul className="text-sm text-gray-600 list-disc pl-5 space-y-1">
            <li><span className='font-bold'>IMPORTANT:</span> If item(s) have been removed from its original packaging, you must first send us clear pictures so we can examine the item(s) quality.</li>
            <li>Use a <strong>tracked delivery service</strong> when returning your package.</li>
            <li>Include your <strong>Return Authorisation Number (RAN)</strong> inside the package: <span className="font-bold text-indigo-500">#{order.id}</span></li>
            <li>Send it to our returns address (provided via email).</li>
            <li>Once we receive your package, the refund will be processed within <strong>3–5 business days</strong>.</li>
            <li>Refunds will be sent via <strong>{order.refundMethod || "PayPal or Bank Transfer"}</strong>.</li>
          </ul>
        </div>

        {/* Payment Method */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center">
            <CreditCard className="h-5 w-5 text-indigo-600 mr-2" />
            <p className="text-sm text-gray-700">
              Refund Method: <strong>{order.refundMethod || "PayPal or Bank Transfer"}</strong>
            </p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={() => confirmRefund(order.id)}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 cursor-pointer"
          >
            Confirm Refund
          </button>
        </div>

      </div>
    </div>
  )
}

export default RefundOrder;
