import React, { useEffect, useState } from 'react';
import Navbar from "../front_page/Navbar";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useCart } from "../context/CartContext";
import Footer from "../front_page/Footer";
import FAQSection from "./FAQ";
import Reviews from "./Reviews";
import ProductData from "./ProductData";
import RelatedProducts from "./RelatedProducts";
import { getOneProduct } from '../routes/ProductRoutes';
import BestSells from '../front_page/BestSells';
import ComingSoon from '../front_page/ComingSoon'
import NewReleases from '../front_page/NewReleases';
import NoProduct from './NoProduct';
import SaleItems from '../front_page/SaleItems'
import ProductLoading from '../dynamic_product/ProductLoading'
import SignInPromo from '../front_page/SignInPromo'
import RecentlyViewedProducts from '../front_page/RecentlyViewedProducts';
import Offer from '../front_page/Offer'

const DynamicProductPage = () => {
    const { id } = useParams();
    const { addItemToCart } = useCart();
    const [product, setProduct] = useState(null);
    const [pageLoading, setPageLoading] = useState(true);
    const [activeTab, setActiveTab] = useState("Reviews");

    const fetchProduct = async () => {
        try {
            const response = await getOneProduct(id);
            setProduct(response);
        } catch (error) {
            console.error("Error fetching product:", error);
        } finally {
            setTimeout(() => setPageLoading(false), 1000); // Simulate loading time
        }
    };

    useEffect(() => {
        fetchProduct();
    }, []);

    const validReviews = product?.reviews?.filter(review => review.reviewed === true) || [];
    const rating = validReviews.length
        ? validReviews.reduce((acc, item) => acc + item.rating, 0) / validReviews.length
        : 0;


    if (pageLoading) {
        return (
            <>
            <ProductLoading />
            </>
        )
    }    

    if (!product) {
        return (
            <>
            <Navbar />
            <div className='max-w-7xl mx-auto'>
            <NoProduct />
            <BestSells />
            <SaleItems />
            <NewReleases />
            </div>
            <Footer />
            </>
        )
    }
    
    
    return (
        <>
            <Navbar />

            <div className="max-w-7xl mx-auto">
            <div>
              <ProductData product={product} rating={rating} validReviews={validReviews} isLoading={pageLoading} />

            {/* Tabs & Content */}
            <div className="p-6">
                {/* Tabs Navigation Skeleton */}
                
                    <div className={`flex space-x-6 border-b border-gray-300`}>
                        {["Reviews", "FAQ", "Related Products"].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`py-4 px-6 text-center border-b-2 font-medium text-sm cursor-pointer ${
                                    activeTab === tab
                                        ? 'border-indigo-400 text-indigo-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                {/* Tab Content Skeleton */}
                <div className="mt-4">
                    
                        <>
                            {activeTab === "Reviews" && <Reviews product={product} />}
                            {activeTab === "FAQ" && <FAQSection />}
                            {activeTab === "Related Products" && <RelatedProducts product={product} />}
                        </>
                </div>
            </div>
            </div>
                <SignInPromo />
                <RecentlyViewedProducts />
                <BestSells />
                <Offer />
                <NewReleases />
                <ComingSoon />
            </div>


            <Footer />
        </>
    );
};

export default DynamicProductPage;
