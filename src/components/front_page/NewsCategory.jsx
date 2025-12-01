import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useCart } from '../context/CartContext'
import { toast } from 'sonner'
import ShoppingCartSide from '../product_page/ShoppingCartSide'
import { getProducts } from '../routes/ProductRoutes'
import { getOrders } from '../routes/OrderRoutes'
import ProductCard from '../product_page/ProductCard'
import UseShowProducts from './UseShowProducts'



const NewsCategory = () => {

    const [products, setProducts] = useState([])
    const { addItemToCart, open, setOpen } = useCart()
    const [orders, setOrders] = useState(0)

    const fetchProducts = async () => {
        try{
            const response = await getProducts()
            console.log(response, 'products')
            setProducts(response?.filter(item => item?.category === 'stranger things').slice(0, 6))
                            
        }catch(e){
            console.log(e)
        }
    }

    useEffect(() => {
        fetchProducts()
    }, [])


    return (
        <>
        <ShoppingCartSide open={open} setOpen={setOpen} />
        <UseShowProducts title={'Stranger Things'} products={products} link={'/products?category=stranger things'} text={'Explore our Stranger Things figures to celebrate the new season!'} />
        </>
    )
}

export default NewsCategory