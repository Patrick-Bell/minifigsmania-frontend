import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ProductCard from '../product_page/ProductCard'
import { getProducts } from '../routes/ProductRoutes'
import ShoppingCartSide from '../product_page/ShoppingCartSide'
import UseShowProducts from './UseShowProducts'

const ComingSoon = () => {

    const [products, setProducts] = useState([])
    const [open, setOpen] = useState(false)

    const fetchProducts = async () => {
        try{
            const response = await getProducts()
            setProducts(response.filter(product => product.active === false || product.stock === 0).slice(0, 6))
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
        <UseShowProducts title={'Coming Soon'} products={products} category={''} tag={''} stock={'out of stock'} text={'Products will either be re-stocked or newly released.'} />
        </>
    )
}

export default ComingSoon