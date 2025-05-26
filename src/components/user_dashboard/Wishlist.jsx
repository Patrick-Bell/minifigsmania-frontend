import React, { useEffect, useState } from 'react';
import { Heart, ShoppingCart, Share2, Filter, X, Grid, List, Trash2 } from 'lucide-react';
import { myWishlist } from '../routes/WishlistRoutes';
import WishlistCard from '../product_page/WishlistCard';

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [viewMode, setViewMode] = useState('grid');
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const fetchMyWishlist = async () => {
    const response = await myWishlist();
    setWishlistItems(response);
  };

  useEffect(() => {
    fetchMyWishlist();
  }, [viewMode]);

  // Get unique categories for filtering
  const categories = ['All', ...new Set(wishlistItems.map(item => 
    item.product?.category || 'Uncategorized'))];

  // Filter items by category
  const filteredItems = selectedCategory === 'All' 
    ? wishlistItems 
    : wishlistItems.filter(item => item.product?.category === selectedCategory);

  // Empty state
  if (wishlistItems.length === 0) {
    return (
        <div className="text-center py-6 border border-gray-200 bg-white rounded-lg">
        <div className="flex justify-center mb-3">
          <Heart className="w-12 h-12 text-gray-300" />
        </div>
        <p className="text-gray-500 mb-4">Your wishlist is empty</p>
        <button 
          onClick={() => window.open('/products', '_blank')}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition cursor-pointer"
        >
          Browse Products
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      {/* Wishlist Header */}
      <div className="p-6 border-b border-gray-100">
      <div className='flex align-middle justify-between'>
      <div>
      <h3 className="text-lg font-bold text-gray-800 flex items-center"> <Heart className='mr-2 w-5 h-5 text-indigo-600' />Your Wishlist</h3>
      <p className="text-gray-500 text-xs">Items you've saved for future inspiration and purchases</p>
      </div>
      <div>
      <span className="px-2.5 py-1 bg-indigo-100 text-indigo-800 text-xs font-medium rounded-full">
          {wishlistItems.length} items
        </span>
      </div>
      </div>
      </div>

      {/* Filters and View Options */}
      <div className="p-4 flex flex-wrap items-center justify-between border-b border-gray-100">
        <div className="flex items-center space-x-2 mb-2 sm:mb-0">
          <button 
            onClick={() => setFilterOpen(!filterOpen)}
            className="flex items-center px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium"
            aria-expanded={filterOpen}
          >
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </button>
          
          <div className="hidden md:flex items-center space-x-1">
            {categories.map(category => (
              <button 
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3 py-1 text-sm rounded-full ${
                  selectedCategory === category 
                    ? 'bg-indigo-100 text-indigo-700' 
                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <button 
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-md ${viewMode === 'grid' ? 'bg-gray-200' : 'bg-gray-100'}`}
          >
            <Grid className="w-4 h-4" />
          </button>
          <button 
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-md ${viewMode === 'list' ? 'bg-gray-200' : 'bg-gray-100'}`}
          >
            <List className="w-4 h-4" />
          </button>
          <span className="text-sm text-gray-500">{filteredItems.length} items</span>
        </div>
      </div>
      
      {/* Mobile Filters (shown when filter is open) */}
      {filterOpen && (
        <div className="p-4 border-b border-gray-100 bg-gray-50">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium text-gray-800">Filter by Category</h3>
            <button onClick={() => setFilterOpen(false)}>
              <X className="w-5 h-5 text-gray-400" />
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button 
                key={category}
                onClick={() => {
                  setSelectedCategory(category);
                  setFilterOpen(false);
                }}
                className={`px-4 py-2 text-sm rounded-full ${
                  selectedCategory === category 
                    ? 'bg-indigo-100 text-indigo-700' 
                    : 'bg-white border border-gray-200 text-gray-600'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Wishlist Items */}
      {viewMode === 'grid' ? (
        <div className="p-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {filteredItems.map((item, index) => (
              <div key={index} className="group relative">
                <WishlistCard product={item.product} viewMode={viewMode} setViewMode={setViewMode} />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="divide-y divide-gray-100">
          {filteredItems.map((item, index) => (
            <div key={index} className="p-4 flex items-center">
              <div className="w-20 h-20 flex-shrink-0 bg-gray-100 rounded-md overflow-hidden">
                {item.product?.images && item?.product?.images[0] ? (
                  <img 
                    src={item?.product?.images[0]?.url} 
                    alt={item.product.name} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-200">
                    <span className="text-gray-400 text-xs">No image</span>
                  </div>
                )}
              </div>
              <div className="ml-4 flex-grow">
                <h3 className="font-medium text-gray-800">{item.product?.name}</h3>
                <p className="text-gray-500 text-sm">{item.product?.category}</p>
                <p className="font-bold mt-1">£{item.product?.price?.toFixed(2)}</p>
              </div>
              <div className="flex space-x-2">
                <button className="p-2 rounded-full hover:bg-gray-100">
                  <ShoppingCart className="w-5 h-5 text-gray-600" />
                </button>
                <button className="p-2 rounded-full hover:bg-gray-100">
                  <Share2 className="w-5 h-5 text-gray-600" />
                </button>
                <button className="p-2 rounded-full hover:bg-gray-100 text-red-500">
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {/* Recommendations Section */}
     
    </div>
  );
};

export default Wishlist;