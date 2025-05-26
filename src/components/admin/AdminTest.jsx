import React, { useState } from 'react';

const AdminTest = () => {
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  
  // Sample product data
  const product = {
    id: 1,
    name: "Star Wars Millennium Falcon",
    price: 169.99,
    originalPrice: 189.99,
    rating: 4.9,
    reviewCount: 423,
    category: "Star Wars",
    sku: "75257",
    pieceCount: 1353,
    ageRecommendation: "9+",
    inStock: true,
    description: "Inspire young Star Wars fans with this awesome Millennium Falcon building toy for kids. This iconic LEGO Star Wars starship has lots of details to impress fans, including opening top panels, a lowering ramp, and a 4-minifigure cockpit with a detachable canopy.",
    features: [
      "Authentic details of the Millennium Falcon from Star Wars: The Rise of Skywalker",
      "Includes 7 characters: Finn, Chewbacca, C-3PO, Lando Calrissian, Boolio, and 2 Porgs",
      "Features rotating top and bottom gun turrets, 2 spring-loaded shooters, and a ramp that lowers",
      "Ideal for play and display with removable panels to access the detailed interior",
      "Great gift for Star Wars fans and collectors of all ages"
    ],
    specifications: {
      dimensions: "17.8 x 12.0 x 4.7 inches",
      weight: "4.37 pounds",
      material: "ABS Plastic",
      boxContents: "1353 pieces, instruction booklet, sticker sheet",
      manufacturerRecommendedAge: "9 years and up"
    },
    images: [
      "/api/placeholder/600/500",
      "/api/placeholder/600/500",
      "/api/placeholder/600/500",
      "/api/placeholder/600/500"
    ],
    relatedProducts: [
      {
        id: 2,
        name: "Star Wars X-Wing Starfighter",
        price: 89.99,
        image: "/api/placeholder/200/180",
        rating: 4.7
      },
      {
        id: 3,
        name: "Star Wars AT-AT Walker",
        price: 159.99,
        image: "/api/placeholder/200/180",
        rating: 4.8
      },
      {
        id: 4,
        name: "Star Wars Death Star",
        price: 499.99,
        image: "/api/placeholder/200/180",
        rating: 4.9
      },
      {
        id: 5,
        name: "Star Wars Imperial Star Destroyer",
        price: 699.99,
        image: "/api/placeholder/200/180",
        rating: 4.8
      }
    ]
  };

  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = () => {
    setIsAddedToCart(true);
    setTimeout(() => {
      setIsAddedToCart(false);
    }, 2000);
  };

  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header would be here - reusing from homepage */}
      
      {/* Breadcrumb */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex text-sm">
            <a href="#" className="text-gray-500 hover:text-yellow-500">Home</a>
            <span className="mx-2 text-gray-400">/</span>
            <a href="#" className="text-gray-500 hover:text-yellow-500">Star Wars</a>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-gray-900 font-medium">{product.name}</span>
          </div>
        </div>
      </div>
      
      {/* Product Detail */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row -mx-4">
          {/* Product Images */}
          <div className="lg:w-1/2 px-4 mb-8 lg:mb-0">
            <div className="mb-4">
              <img 
                src={product.images[selectedImage]} 
                alt={product.name}
                className="w-full rounded-lg shadow-md"
              />
            </div>
            <div className="flex space-x-2 overflow-x-auto">
              {product.images.map((image, index) => (
                <button 
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`flex-shrink-0 border-2 rounded ${
                    selectedImage === index ? 'border-yellow-400' : 'border-transparent'
                  }`}
                >
                  <img 
                    src={image} 
                    alt={`${product.name} - View ${index + 1}`}
                    className="w-20 h-20 object-cover rounded"
                  />
                </button>
              ))}
            </div>
          </div>
          
          {/* Product Info */}
          <div className="lg:w-1/2 px-4">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
                <div className="flex items-center mb-4">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`} viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-gray-600 ml-2">{product.rating} ({product.reviewCount} reviews)</span>
                </div>
              </div>
              <div className="flex space-x-2">
                <button className="text-gray-400 hover:text-gray-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>
                <button className="text-gray-400 hover:text-gray-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                </button>
              </div>
            </div>
            
            <div className="flex items-center mb-6">
              <span className="text-3xl font-bold text-gray-900">${product.price}</span>
              {product.originalPrice && (
                <span className="ml-3 text-xl text-gray-500 line-through">${product.originalPrice}</span>
              )}
              {product.originalPrice && (
                <span className="ml-3 bg-red-100 text-red-700 px-2 py-1 rounded text-sm font-medium">
                  Save ${(product.originalPrice - product.price).toFixed(2)}
                </span>
              )}
            </div>
            
            <div className="mb-6">
              <div className="flex items-center text-sm mb-2">
                <span className={`mr-1 rounded-full w-3 h-3 ${product.inStock ? 'bg-green-500' : 'bg-red-500'}`}></span>
                <span className={product.inStock ? 'text-green-600' : 'text-red-600'}>
                  {product.inStock ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
                <div><span className="font-medium">SKU:</span> {product.sku}</div>
                <div><span className="font-medium">Category:</span> {product.category}</div>
                <div><span className="font-medium">Pieces:</span> {product.pieceCount}</div>
                <div><span className="font-medium">Age:</span> {product.ageRecommendation}</div>
              </div>
            </div>
            
            <div className="mb-6">
              <p className="text-gray-700">{product.description}</p>
            </div>
            
            <div className="mb-8">
              <div className="flex items-center mb-4">
                <div className="mr-4">
                  <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
                  <div className="flex border border-gray-300 rounded">
                    <button 
                      onClick={decrementQuantity}
                      className="px-3 py-1 bg-gray-100 border-r border-gray-300 text-gray-600 hover:bg-gray-200"
                    >
                      -
                    </button>
                    <input 
                      type="number" 
                      id="quantity"
                      value={quantity}
                      onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                      className="w-12 text-center focus:outline-none"
                    />
                    <button 
                      onClick={incrementQuantity}
                      className="px-3 py-1 bg-gray-100 border-l border-gray-300 text-gray-600 hover:bg-gray-200"
                    >
                      +
                    </button>
                  </div>
                </div>
                
                <div className="flex-1 flex items-end">
                  <button 
                    onClick={handleAddToCart}
                    className={`w-full rounded-md py-3 px-8 flex items-center justify-center text-base font-medium ${
                      isAddedToCart 
                        ? 'bg-green-600 text-white' 
                        : 'bg-yellow-400 text-gray-900 hover:bg-yellow-500'
                    } transition-colors duration-200`}
                  >
                    {isAddedToCart ? (
                      <>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        Added to Cart
                      </>
                    ) : (
                      <>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        Add to Cart
                      </>
                    )}
                  </button>
                </div>
              </div>
              
              <button className="w-full border border-gray-300 rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-gray-700 hover:bg-gray-100">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                Add to Wishlist
              </button>
            </div>
            
            <div className="border-t border-gray-200 pt-4">
              <div className="flex justify-center space-x-4">
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-sm text-gray-600">Fast Delivery</span>
                </div>
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <span className="text-sm text-gray-600">Genuine Product</span>
                </div>
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                  <span className="text-sm text-gray-600">Secure Payment</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Product Tabs */}
        <div className="mt-12">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                onClick={() => setActiveTab('description')}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                  activeTab === 'description'
                    ? 'border-yellow-400 text-yellow-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Description
              </button>
              <button
                onClick={() => setActiveTab('features')}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                  activeTab === 'features'
                    ? 'border-yellow-400 text-yellow-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Features
              </button>
              <button
                onClick={() => setActiveTab('specifications')}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                  activeTab === 'specifications'
                    ? 'border-yellow-400 text-yellow-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Specifications
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                  activeTab === 'reviews'
                    ? 'border-yellow-400 text-yellow-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Reviews ({product.reviewCount})
              </button>
            </nav>
          </div>
          
          <div className="py-6">
            {activeTab === 'description' && (
              <div className="prose max-w-none">
                <p className="mb-4">{product.description}</p>
                <p>
                  The Millennium Falcon from Star Wars: The Rise of Skywalker is a legendary LEGO set that captures all the authentic details of the iconic Corellian freighter. This LEGO Star Wars collectible model has been redesigned to include more details than ever before, making it a fantastic addition to any fan's collection.
                </p>
              </div>
            )}
            
            {activeTab === 'features' && (
              <div>
                <h3 className="text-lg font-medium mb-4">Product Features</h3>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {activeTab === 'specifications' && (
              <div>
                <h3 className="text-lg font-medium mb-4">Product Specifications</h3>
                <div className="bg-gray-100 rounded-lg overflow-hidden">
                  <div className="grid grid-cols-1 md:grid-cols-2">
                    {Object.entries(product.specifications).map(([key, value], index) => (
                      <div key={index} className={`p-4 ${index % 2 === 0 ? 'bg-gray-50' : ''}`}>
                        <div className="font-medium mb-1">{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</div>
                        <div className="text-gray-700">{value}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'reviews' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-medium">Customer Reviews</h3>
                  <button className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-700">
                    Write a Review
                  </button>
                </div>
                
                <div className="flex flex-col md:flex-row mb-8">
                  <div className="md:w-1/3 mb-6 md:mb-0">
                    <div className="text-center">
                      <div className="text-5xl font-bold text-gray-900 mb-2">{product.rating}</div>
                      <div className="flex justify-center mb-2">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`} viewBox="0 0 20 20" fill="currentColor">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <p className="text-gray-600">{product.reviewCount} reviews</p>
                    </div>
                    
                    <div className="mt-6 px-4">
                      {[5, 4, 3, 2, 1].map((rating) => (
                        <div key={rating} className="flex items-center mb-2">
                          <div className="w-10 text-right text-gray-600">{rating}</div>
                          <div className="ml-2 flex-1">
                            <div className="h-2 bg-gray-200 rounded-full">
                              <div 
                                className="h-2 bg-yellow-400 rounded-full" 
                                style={{ width: `${rating === 5 ? 70 : rating === 4 ? 20 : rating === 3 ? 7 : rating === 2 ? 2 : 1}%` }}
                              ></div>
                            </div>
                          </div>
                          <div className="ml-2 w-10 text-gray-600 text-sm">
                            {rating === 5 ? 70 : rating === 4 ? 20 : rating === 3 ? 7 : rating === 2 ? 2 : 1}%
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="md:w-2/3 md:pl-8 md:border-l md:border-gray-200">
                    <div className="mb-8 pb-8 border-b border-gray-200">
                      <div className="flex items-start mb-2">
                        <img 
                          src="/api/placeholder/40/40" 
                          alt="User"
                          className="w-10 h-10 rounded-full mr-4"
                        />
                        <div>
                          <h4 className="font-medium">John D.</h4>
                          <div className="flex items-center text-sm text-gray-600">
                            <div className="flex mr-2">
                              {[...Array(5)].map((_, i) => (
                                <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                              ))}
                            </div>
                            <span>2 months ago</span>
                          </div>
                        </div>
                      </div>
                      <h5 className="font-semibold mb-2">Amazing LEGO Set!</h5>
                      <p className="text-gray-700">
                        This Millennium Falcon is an incredible build! The details are fantastic and it really captures the look of the ship from the films. Building it was challenging but very enjoyable. Highly recommended for any Star Wars fan.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminTest;