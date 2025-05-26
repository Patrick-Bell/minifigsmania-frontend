import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useCart } from '../context/CartContext'
import { toast } from 'sonner'
import ShoppingCartSide from '../product_page/ShoppingCartSide'
import { getProducts } from '../routes/ProductRoutes'
import { getOrders } from '../routes/OrderRoutes'
import ProductCard from '../product_page/ProductCard'



const useShowProducts = ({ title, products, text, link  }) => {

    const { addItemToCart, open, setOpen } = useCart()

    return (

        <>
        <ShoppingCartSide open={open} setOpen={setOpen} />

        <div className='w-auto m-8 mt-16'>
        <div className='flex justify-between items-center w-full'>
          <h2 className="text-xl font-semibold">{title}</h2>
          <p onClick={() => window.open(link, '_blank')} className='cursor-pointer font-bold flex'>View all
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 ml-2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
          </svg>
          </p>
          </div>
          <p className='mb-6 text-gray-500 text-sm'>{text}</p>

        <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6'>
            {products.map((product, i) => (
                <ProductCard product={product} />
            ))}
        </div>
        </div>
        </>
    )
}

export default useShowProducts