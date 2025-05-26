import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useCart } from '../context/CartContext'
import { toast } from 'sonner'
import ShoppingCartSide from '../product_page/ShoppingCartSide'
import { getProducts } from '../routes/ProductRoutes'
import { getOrders } from '../routes/OrderRoutes'
import ProductCard from '../product_page/ProductCard'
import UseShowProducts from './UseShowProducts'



const RecentlyViewedProducts = () => {

    const [products, setProducts] = useState([])
    const [open, setOpen] = useState(false)

    const getRecentlyViewedIds = () => {
        const cookieValue = document.cookie
          .split('; ')
          .find(row => row.startsWith('recently_viewed='))
          ?.split('=')[1];
          console.log(cookieValue)
      
        if (!cookieValue) return [];
      
        try {
          const decoded = decodeURIComponent(cookieValue);
          return JSON.parse(decoded);
        } catch (e) {
          console.error('Error parsing recently viewed cookie', e);
          return [];
        }
      }
      


      const fetchProducts = async () => {
        try {
          const response = await getProducts();
          const activeProducts = response.filter(item => item.active);
      
          const recentlyViewedIds = getRecentlyViewedIds();
      
          // Filter to only those products whose IDs are in the cookie
          const filteredProducts = activeProducts.filter(product =>
            recentlyViewedIds.includes(product.id)
          );
      
          setProducts(filteredProducts);
        } catch (e) {
          console.log(e);
        }
      }
      

    useEffect(() => {
        fetchProducts()
    }, [])


    return (
        <>
        {products.length > 0 && (
        <>
        <ShoppingCartSide open={open} setOpen={setOpen} />
        <UseShowProducts title={'Recently Viewed'} products={products} link={'/products'} text={'Products you have recently viewed.'}  />
        </>
        )}
    
        </>
    )
}

export default RecentlyViewedProducts