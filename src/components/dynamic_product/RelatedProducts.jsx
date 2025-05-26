import React, { useEffect, useState } from "react";
import axios from "axios";
import { getProducts } from "../routes/ProductRoutes";
import ProductCard from "../product_page/ProductCard";

const RelatedProducts = ({ product, products, handleAddToCart }) => {
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [error, setError] = useState(null);

  // Fetch related products from the API
  const fetchRelatedProducts = async () => {
    try {
      const response = await getProducts();
      const products = response;
      const validProducts = products.filter(item => item.active)
      
      // Filter products to find those in the same category and excluding the current product
      const relatedProducts = validProducts?.filter(
        (p) => p.category.toLowerCase() === product.category.toLowerCase() && p.id !== product.id
      );
      
      setRelatedProducts(relatedProducts);
    } catch (err) {
      setError("Failed to load related products");
    }
  };

  const handleView = (id) => {
    window.location.href = `/products/${id}`;
  };

  useEffect(() => {
    fetchRelatedProducts();
  }, [product]);  // Re-fetch when the product changes

  return (
    <>
      {error && <p className="text-red-500">{error}</p>} {/* Show error message if any */}
      
      {relatedProducts.length > 0 ? (
        <>
        <p className="mb-3">There are <span className="text-indigo-600 font-bold">{relatedProducts.length}</span> related products.</p>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
          {relatedProducts.map((relatedProduct) => (
            <div key={relatedProduct.id} className="overflow-hidden transition-shadow duration-300">
              <ProductCard product={relatedProduct} />
            </div>
          ))}
        </div>
        </>
      ) : (
        <p className="text-gray-500">There are no related products</p>
      )}
    </>
  );
};

export default RelatedProducts;
