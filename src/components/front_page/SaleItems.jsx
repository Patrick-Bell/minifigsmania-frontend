import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useCart } from '../context/CartContext'
import { toast } from 'sonner'
import ShoppingCartSide from '../product_page/ShoppingCartSide'
import { getProducts } from '../routes/ProductRoutes'
import { getOrders } from '../routes/OrderRoutes'
import ProductCard from '../product_page/ProductCard'
import UseShowProducts from './UseShowProducts'



const SaleItems = () => {

    const [products, setProducts] = useState([])
    const { addItemToCart, open, setOpen } = useCart()
    const [orders, setOrders] = useState(0)

    const fetchProducts = async () => {
        try{
            const response = await getProducts()
            const active = response.filter(item => item.active)
            setProducts(active.filter(item => item.sale_price > 0).slice(0, 6))
                            
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
        <UseShowProducts title={'Currenty on Sale!'} products={products} link={'/products?tag=sale'} text={'Selected products are discounted for a limited time!'}  />
        </>
    )
}

export default SaleItems