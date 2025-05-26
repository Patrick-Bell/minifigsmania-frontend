import React, { useEffect, useState } from 'react'
import ShoppingCartSide from '../product_page/ShoppingCartSide'
import { useCart } from '../context/CartContext'
import { getProducts } from '../routes/ProductRoutes'
import UseShowProducts from './UseShowProducts'

const NewReleases = () => {

    const [products, setProducts] = useState([])
    const [open, setOpen] = useState(false)

    const fetchProducts = async () => {
        try{
            const response = await getProducts()
            const validProducts = response.filter(item => item.active)

            const newRelease = validProducts.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).slice(0, 6)
            setProducts(newRelease)

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
        <UseShowProducts title={'New Releases'} products={products} category={''} tag={'new'} />
        </>
    )
}

export default NewReleases