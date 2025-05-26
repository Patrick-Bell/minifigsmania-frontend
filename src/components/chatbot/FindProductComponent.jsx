import { useState, useEffect } from "react";
import { getProducts } from "../routes/ProductRoutes";

const FindProductComponent = ({ setChatHistory }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchAllProducts = async () => {
    setIsLoading(true);
    try {
      const response = await getProducts();
      const filtered = response.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setProducts(filtered);
    } catch (e) {
      console.error("Error fetching products:", e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (searchQuery.trim()) {
      fetchAllProducts();
    } else {
      setProducts([]);
    }
  }, [searchQuery]);

  const handleSearch = () => {
    if (!searchQuery.trim()) return;

    setChatHistory(prev => [
      ...prev,
      { type: 'user', text: `Searching for: ${searchQuery}` },
      {
        type: 'bot',
        text: `Here are the search results for "${searchQuery}". We found ${products.length} product(s). Click to view products.`
      },
      {
        type: 'bot',
        text: (
          <div className="block">
            {products.length > 0 ? (
              products.map(product => (
                <a 
                key={product.id} 
                href={`/products/${product.id}`} 
                target="_blank"
                className="block p-3 border-b border-gray-200 hover:bg-gray-100"
              >
                <div className="flex items-center">
                  {/* Product Image */}
                  <img className="w-16 h-16 object-cover rounded-md" src={product?.images[0]?.url} alt={product.name} />

                  {/* Product Details */}
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-800">{product.name}</p>
                    <p className="text-sm text-gray-600">£{product.price}</p>
                  </div>
                </div>
              </a>
              ))
            ) : (
              <p className="text-gray-500 col-span-full">No products found.</p>
            )}
          </div>
        )
      }
    ]);
    setSearchQuery('');
  };

  return (
    <div className="space-y-6 bg-white p-6 rounded-md border border-gray-200">
      <div>
        <h3 className="text-xl font-semibold text-gray-800">Find Products</h3>
        <p className="text-sm text-gray-500">Search our product catalog for great deals and unique items.</p>
      </div>

      <div className="space-y-2">
        <label htmlFor="product-search" className="block text-sm font-medium text-gray-700">
          What are you looking for?
        </label>
        <div className="flex space-x-2">
          <input
            id="product-search"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-sm"
            placeholder="Search for minifigure or category"
          />
          <button
            onClick={handleSearch}
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition cursor-pointer"
          >
            Search
          </button>
        </div>
      </div>

      
    </div>
  );
};

export default FindProductComponent;
