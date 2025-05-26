import React, { useState, useEffect, createContext, useContext } from "react";
import { getOneProduct } from "../routes/ProductRoutes";
import { toast } from 'sonner'

// Create a context
const CartContext = createContext();

// Create a provider component
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    // Initialize cart state from localStorage
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [cartNumber, setCartNumber] = useState(0)
  const [open, setOpen] = useState(false)

  // Save cart state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Function to add item to cart
  const addItemToCart = async (item) => {
  const product = await getOneProduct(item.id);

  if (product.stock === 0) {
    toast.error('Out of stock', {
      description: `${item.name} is currently out of stock.`
    });
    return;
  }

  const existingProduct = cart.find(c => c.id === item.id);

  if (existingProduct) {
    if (existingProduct.quantity < product.stock) {
      setCart(cart.map(c =>
        c.id === item.id ? { ...c, quantity: c.quantity + 1 } : c
      ));

      toast.success(`Added to Cart`, {
        description: `You have successfully added ${product.name} to your cart.`,
        action: {
          label: 'View Cart',
          onClick: () => {
            window.location.href = '/cart';
          },
        },
      });

    } else {
      toast.error('Maximum stock reached', {
        description: `You've reached the stock limit for ${product.name}.`
      });
    }

  } else {
    // Add new product with quantity 1
    setCart([...cart, { ...item, quantity: 1 }]);

    toast.success(`Added to Cart`, {
      description: `You have successfully added ${product.name} to your cart.`,
      action: {
        label: 'View Cart',
        onClick: () => {
          window.location.href = '/cart';
        },
      },
    });
  }
};

  

  // Function to remove item from cart
  const removeItemFromCart = (itemId) => {
    setCart(cart.filter(item => item.id !== itemId));
  };

  const handleCartNumber = () => {
    const n = cart.reduce((sum, item) => sum + item.quantity, 0);
    setCartNumber(n);
  };
  
  useEffect(() => {
    handleCartNumber()
  }, [cart])

  // Function to clear the cart
  const clearCart = () => {
    setCart([]);
  };

  const updateQuantity = async (id, newQuantity) => {
    const product = await getOneProduct(id);
    if (newQuantity > product.stock) {
      toast.error('Maximum stock reached', {
        description: `You've reached the stock limit for ${product.name}.`
      });
      return;
    }

    setCart(cart.map(item => 
      item.id === id ? { ...item, quantity: Math.max(1, newQuantity) } : item
    ));
  };

  // Context value
  const value = {
    cart,
    addItemToCart,
    removeItemFromCart,
    clearCart,
    handleCartNumber,
    cartNumber,
    updateQuantity,
    open,
    setOpen
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use the CartContext
export const useCart = () => {
  return useContext(CartContext);
};