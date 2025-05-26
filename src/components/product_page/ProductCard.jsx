import React, { useEffect, useState } from "react"
import ShoppingCartSide from "./ShoppingCartSide"
import { useCart } from "../context/CartContext"
import { toast } from 'sonner'
import { Heart, Star } from 'lucide-react';
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { myWishlist } from "../routes/WishlistRoutes";

const ProductCard = ({ product }) => {

  const MAX_RECENT = 6;


  const [reviews, setReviews] = useState([])
  const [wishlist, setWishlist] = useState([])

  const fetchWishlist = async () => {
    try{
      const response = await myWishlist()
      setWishlist(response)
    }catch(e){
      console.log(e)
    }
  }


  const { user } = useAuth()

  const calculatePercentageDiscount = (originalPrice, discountedPrice) => {
    const amount = (originalPrice - discountedPrice)
    const proportion = (amount / originalPrice)
    return (proportion * 100).toFixed(0)
  }

  const isWishlisted = (productId) => {
    return wishlist.some(item => item.product.id === productId)
  }
  


    const { addItemToCart, open, setOpen } = useCart()

    const handleClick = (product) => {
        addItemToCart(product)
    }

    /*
    const fetchReviews = async () => {
      try{
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/reviews`, { withCredentials: true })
        setReviews(response.data.filter(review => review.product_id === product.id && review.reviewed === true))
        console.log(response.data)

      }catch(e) {
        console.log(e)
      }
    }
      */

    const validReviews = product.reviews.filter(review => review.reviewed === true)

    const averageRating = validReviews.length > 0 
  ? (validReviews.reduce((sum, review) => sum + review.rating, 0) / validReviews.length).toFixed(1)
  : null;


/*
    useEffect(() => {
      fetchReviews()
    }, [])
    */

    const viewProduct = (id) => {
      // 1. Get existing recently viewed products from cookie
      const cookieString = document.cookie // returns all cookies
        .split('; ') // split all cookies
        .find(row => row.startsWith('recently_viewed=')); // find cookie
      let recent = [];
    
      if (cookieString) {
        try {
          recent = JSON.parse(decodeURIComponent(cookieString.split('=')[1])); // get the values
        } catch {
          recent = [];
        }
      }
    
      // 2. Update list: Remove if already exists, add to front
      recent = recent.filter(pid => pid !== id);
      recent.unshift(id);
    
      // 3. Cap list length
      if (recent.length > MAX_RECENT) {
        recent = recent.slice(0, MAX_RECENT);
      }
    
      // 4. Save updated list back to cookie (expires in 7 days)
      document.cookie = `recently_viewed=${encodeURIComponent(JSON.stringify(recent))};path=/;max-age=${7 * 24 * 60 * 60};SameSite=Lax`;
    
      // 5. Redirect to product page
      window.location.href = `/products/${id}`;
    }


    const displayTag = (product) => {
      switch (product?.tag) {
        case 'new':
          return <span className="bg-green-500 p-1 font-bold rounded-md text-white text-xs">New</span>
        case 'sale':
          return <span className="bg-black font-bold p-1 rounded-md text-white text-xs">Sale</span>
          case 'limited':
          return <span className="bg-yellow-800 font-bold p-1 rounded-md text-white text-xs">Limited</span>
          case 'popular':
          return <span className="bg-red-500 font-bold p-1 rounded-md text-white text-xs">Popular</span>
        default:
          return null
      }
    }

    const inStock = (product) => {
      if(product.stock > 0) {
        return <p className="mt-1 text-xs text-green-500 font-bold">In Stock</p>
      } else {
        return <p className="mt-1 text-xs text-red-500 font-bold">Out of Stock</p>
      }
    }

    // Add to favs
    const handleAddFavourite = async (product) => {
      try {
        await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/product_wishlists`, 
          { product_id: product.id, user_id: user.id },
          { withCredentials: true }
        )
        fetchWishlist() // refresh after adding
        toast.success(`Added to your wishlist`, {
          description: `${product.name} added to your wishlist.`
        })
      } catch (error) {
        console.log(error)
      }
    }
    
    // Remove from favs
    const handleRemoveFavourite = async (product) => {
      try {
        const item = wishlist.find(item => item.product.id === product.id)
        if (item) {
          await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/api/product_wishlists/${item.id}`, { withCredentials: true })
          fetchWishlist()

          toast.success(`Removed from your wishlist`, {
            description: `${product.name} removed from your wishlist.`
          })
        }
      } catch (error) {
        console.log(error)
      }
    }

    useEffect(() => {
      if (user) {
        fetchWishlist()
      }

    }, [])
    
    

    return (

<>
<div key={product.id} className="relative h-full pointer-events-auto">
  <div className="absolute top-1 right-1">{displayTag(product)}</div>


  {user && (
  <button 
    onClick={() => isWishlisted(product.id) 
      ? handleRemoveFavourite(product) 
      : handleAddFavourite(product)}
    className="absolute top-0 p-1 left-0 z-40 bg-white rounded-lg hover:text-gray-500 transition cursor-pointer"
  >
    {isWishlisted(product.id) ? (
      <Heart className="text-red-500 fill-current" />
    ) : (
      <Heart className="text-gray-400" />
    )}
  </button>
)}





          <img
            alt={product.name}
            src={product?.images[0]?.url || ''}
            className="aspect-square w-full rounded-md bg-gray-600 object-cover group-hover:opacity-75"
          />
          <div className="p-2">
            <div className=''>
              <h3 className="text-sm text-gray-700">
                <a href={product.href}>
                  <span aria-hidden="true" className="absolute" />
                  {product.name.length > 18 ? product.name.slice(0, 18) + '...' : product.name}
                </a>
              </h3>
              {product.sale_price > 0 ? (
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                  <p className="text-md font-bold text-gray-900">£{product.price}</p>
                  <p className="text-sm font-medium line-through text-gray-500 ml-2">£{product.sale_price}</p>
                  </div>
                  <div className="text-xs bg-green-200 text-green-600 rounded-md p-1">{calculatePercentageDiscount(product?.sale_price, product?.price)}%</div>
                </div>
              ):(
                <p className="text-md font-bold text-gray-900">£{(product.price).toFixed(2)}</p>
              )}
            </div>
            <div className="flex items-center gap-1 mt-1">
            {averageRating ? (
              <>
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star 
                    key={i} 
                    size={16} 
                    className={i <= Math.round(averageRating) ? "fill-yellow-400 stroke-yellow-400" : "stroke-gray-300"}
                  />
                ))}
                <span className="text-sm text-gray-600 ml-1">({validReviews.length})</span>
              </>
            ) : (
              <>
              {[1, 2, 3, 4, 5].map((i) => (
                <Star 
                  key={i} 
                  size={16} 
                  className={"stroke-gray-300"}
                />
              ))}
              <span className="text-sm text-gray-600 ml-1">(0)</span>
            </>            
          )}
          </div>
          <div>{inStock(product)}</div>
          
          </div>
         
          <button disabled={product.stock === 0} onClick={() => handleClick(product)} className={`text-sm w-full p-2 mt-4 ${product.stock === 0 ? 'bg-gray-400' : 'bg-indigo-600'} text-white font-semibold rounded-lg ${product.stock === 0 ? 'hover:bg-gray-400' : 'hover:bg-indigo-700'} transition-colors ${product.stock === 0 ? 'cursor-not-allowed' : 'cursor-pointer'}`}>
          Add to Cart
        </button>
        <button onClick={() => viewProduct(product.id)} className='text-sm w-full p-2 mt-1 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors cursor-pointer'>
          View Product
        </button>
        </div>

        <ShoppingCartSide setOpen={setOpen} open={open} />
        </>

    )
}

export default ProductCard