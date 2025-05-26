import React from 'react';
import { ShoppingCart, ChevronRight, X, Plus, Minus, Trash, Heart } from 'lucide-react';
import { useCart } from '../context/CartContext';

const UserCart = () => {

    const { cart, addItemToCart, removeItemFromCart, updateQuantity } = useCart()
  

    const handleStockMessage = (stock) => {
        if (stock === 1) {
            return 'Only 1 left in stock'
        } else if (stock < 5) {
            return 'Only a few left in stock'
        } else {
            return 'In stock'
        }
    }

    const calculateSubtotal = () => {
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
      };


  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-2">
          <ShoppingCart className="w-5 h-5 text-indigo-600" />
          <h3 className="text-lg font-bold text-gray-800">Your Cart</h3>
        </div>
        <span className="px-2.5 py-1 bg-indigo-100 text-indigo-800 text-xs font-medium rounded-full">
          {cart.length} items
        </span>
      </div>

      {cart.length === 0 ? (
        <div className="text-center py-6">
          <div className="flex justify-center mb-3">
            <ShoppingCart className="w-12 h-12 text-gray-300" />
          </div>
          <p className="text-gray-500 mb-4">Your cart is empty</p>
          <button 
            onClick={() => window.open('/products', '_blank')}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition cursor-pointer"
          >
            Browse Products
          </button>
        </div>
      ) : (
        <>
          <div className="space-y-4 max-h-80 overflow-y-auto mb-4">
            {cart.map((item) => (
              <div key={item.id} className="flex items-center border-b border-gray-100 pb-4 last:border-b-0 last:pb-0">
              <div className="h-16 w-16 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                <img src={item?.images[0]?.url} alt={item.product_name} className="h-full w-full object-cover" />
              </div>
              <div className="ml-4 flex-grow">
                <h4 className="text-sm font-medium text-gray-800">{item.name}</h4>
                <p className="text-sm font-bold text-gray-900">£{item.price.toFixed(2)}</p>
                <div className="flex items-center justify-between mt-1">
                  <p className="text-sm text-red-500">{handleStockMessage(item.stock)}</p>
                  <div className="flex items-center space-x-2">
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-1 rounded-md text-gray-500 hover:bg-gray-100"
                      disabled={item.quantity <= 1}
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="text-sm w-6 text-center">{item.quantity}</span>
                    <button 
                      onClick={() => addItemToCart(item)}
                      className="p-1 rounded-md text-gray-500 hover:bg-gray-100"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => removeItemFromCart(item.id)}
                      className="p-1 rounded-md text-gray-400 hover:text-red-600"
                    >
                      <Trash className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            ))}
          </div>

          <div className="border-t border-gray-200 pt-4">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm text-gray-600">Subtotal</span>
              <span className="text-lg font-bold text-gray-900">£{calculateSubtotal()}</span>
            </div>
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm text-gray-600">Shipping</span>
              <span className="text-sm">Calculated at checkout</span>
            </div>
            <button
            onClick={() => window.open('/cart', '_blank')}
              className="w-full py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition flex items-center justify-center cursor-pointer"
            >
              Proceed to Checkout
              <ChevronRight className="ml-1 w-4 h-4" />
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default UserCart;