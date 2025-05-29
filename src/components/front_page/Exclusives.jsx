import React, { useEffect, useState } from 'react'
import ShoppingCartSide from '../product_page/ShoppingCartSide'
import { useCart } from '../context/CartContext'
import { getProducts } from '../routes/ProductRoutes'
import UseShowProducts from './UseShowProducts'

const Exclusives = () => {

    const [products, setProducts] = useState([])
    const [open, setOpen] = useState(false)

    const fetchProducts = async () => {
        try{
            const response = await getProducts()
            const validProducts = response.filter(item => item.active)
            const exclusiveProducts = validProducts.filter(item => item.tag === 'new').slice(0, 6)
            setProducts(exclusiveProducts)

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
        <UseShowProducts title={'Website Exclusives'} products={products} link={'/products?tag=exclusive'} text={'Exclusives minifigures only available on the website for a limited time!'}  />
        </>
    )
}

export default Exclusives