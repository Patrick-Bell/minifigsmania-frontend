import { useEffect, useState } from 'react';
import { Star, MessageCircle, ThumbsUp } from 'lucide-react';
import { getMyOrders } from '../routes/OrderRoutes';
import { useAuth } from '../context/AuthContext'
import axios from 'axios';

const UserReviews = () => {
  const [orders, setOrders] = useState([]);
  const [reviewData, setReviewData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth()

  const fetchOrders = async () => {
    setIsLoading(true);
    try {
      const fetchedOrders = await getMyOrders();

      // Flatten and filter only reviewed line items
      const reviewedItems = fetchedOrders
        .filter(order => order.line_items) // Ensure there are line_items in the order
        .flatMap(order => order.line_items) // Flatten the line items
        .filter(item => !item.reviewed); // Only keep reviewed items

        console.log(reviewedItems, 'items, setting orders')

      setOrders(reviewedItems); // Set the state to only the reviewed items

    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Initialize review data when orders are fetched
  useEffect(() => {
    if (orders.length > 0) {
      // Create a new object that stores review data for each line item
      const initialReviewState = orders.reduce((acc, item) => {
        acc[item.id] = {
          rating: 5,
          title: '',
          review: '',
          name: user?.user.name || 'Guess',
          isSubmitting: false,
          isExpanded: false,
          user_id: user?.user?.id,
        };
        return acc;
      }, {});

      setReviewData(initialReviewState);
    }
  }, [orders]);

  // Handle rating change
  const handleRatingChange = (itemId, rating) => {
    setReviewData({
      ...reviewData,
      [itemId]: { ...reviewData[itemId], rating }
    });
  };

  // Handle input change
  const handleInputChange = (itemId, field, value) => {
    setReviewData({
      ...reviewData,
      [itemId]: { ...reviewData[itemId], [field]: value }
    });
  };

  // Handle submit review
  const handleSubmitReview = async (itemId, productId) => {
    const review = reviewData[itemId];
    console.log(review, 'review to send');
    
    setReviewData({
      ...reviewData,
      [itemId]: { ...review, isSubmitting: true }
    });

    // Create Form Data for the Review
    const formData = new FormData();
    console.log('Review User ID:', review.user_id);
    formData.append("review[product_id]", productId);
    formData.append("review[line_item_id]", itemId);
    formData.append("review[rating]", review.rating);
    formData.append("review[header]", review.title);
    formData.append("review[text]", review.review);
    formData.append("review[platform]", "web");
    formData.append("review[user_id]", review.user_id);
    formData.append("review[name]", review.name);

    
    try {
      // 1. Create the review
      console.log(formData, 'data to send now')
      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/reviews`, formData, { withCredentials: true });
      
      // 2. Update the line item as reviewed
      console.log(itemId);
      await axios.patch(`${import.meta.env.VITE_API_BASE_URL}/api/line_items/${itemId}`, {line_item: {reviewed: true }}, { withCredentials: true});
      
      // 3. Update local state to reflect changes
      setOrders(prevOrders => {
        return prevOrders.map(item => {
          if (item.id === itemId) {
            return { ...item, reviewed: true };
          }
          return item;
        });
      });
      
      // 4. Update review data state
      setReviewData(prevReviewData => ({
        ...prevReviewData,
        [itemId]: { ...prevReviewData[itemId], isSubmitting: false }
      }));
      
    } catch (error) {
      console.error('Error submitting review:', error);
      // Reset submitting state if error occurs
      setReviewData(prevReviewData => ({
        ...prevReviewData,
        [itemId]: { ...prevReviewData[itemId], isSubmitting: false }
      }));
    }
  };

  const toggleExpanded = (itemId) => {
    setReviewData({
      ...reviewData,
      [itemId]: { ...reviewData[itemId], isExpanded: !reviewData[itemId].isExpanded }
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-32">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <div className="text-center py-20 text-gray-500 border border-gray-200 rounded-lg bg-white">
          <p className='text-sm'>You currently have no products to review.</p>
          <p className='text-sm'>Click <span onClick={() => window.open('/products')} className='text-indigo-500 font-bold cursor-pointer hover:text-indigo-600'>here</span> to see all products!</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 w-full">
      {/* Review Guidelines */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="font-medium text-lg text-gray-800 flex items-center">
          <MessageCircle className="w-5 h-5 mr-2 text-blue-500" />
          Review Guidelines
        </h3>
        <ul className="mt-3 text-gray-600 text-sm space-y-2">
          <li>• Be honest and specific about your experience with the product.</li>
          <li>• Focus on the product and service.</li>
          <li>• Keep your review constructive and respectful.</li>
          <li>• Products that are not reviewed after 30 days will be automatically reviewed with 5 star ratings.</li>
        </ul>
      </div>

      {/* Review Items */}
      <div className="mx-auto mt-2">
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          {orders?.map((item, index) => (
            <div key={item.id} className={`${index !== 0 ? 'border-t border-gray-200' : ''}`}>
              <div className="p-6">
                <div className="flex items-start">
                  {/* Product Image */}
                  <div className="flex-shrink-0 mr-4">
                    <img 
                      src={item?.image} 
                      alt={item.name} 
                      className="w-24 h-24 object-cover rounded-md border border-gray-200"
                    />
                  </div>
                  
                  {/* Product Info and Review Form */}
                  <div className="flex-1">
                    <h3 className="font-medium text-lg text-gray-800">{item.name}</h3>
                    <p className="text-gray-500 text-sm mb-4">£{item.price.toFixed(2)}</p>

                    {item.reviewed ? (
                      <div className="bg-green-50 p-2 rounded-md border border-green-100">
                        <div className="flex items-center">
                          <ThumbsUp className="w-5 h-5 text-green-500 mr-2" />
                          <span className="text-green-700 text-sm">Thank you for your review!</span>
                        </div>
                      </div>
                    ) : (
                      <div>
                        {/* Star Rating */}
                        <div className="mb-5">
                          <label className="block text-sm font-medium text-gray-700 mb-2">Your Rating</label>
                          <div className="flex gap-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <button 
                                key={star}
                                onClick={() => handleRatingChange(item.id, star)}
                                className="focus:outline-none transition-all"
                              >
                                <Star
                                  fill={reviewData[item.id]?.rating >= star ? "#FFC107" : "none"}
                                  color={reviewData[item.id]?.rating >= star ? "#FFC107" : "#D1D5DB"}
                                  size={28}
                                  className={`hover:scale-110 ${reviewData[item.id]?.rating >= star ? 'drop-shadow-sm' : ''}`}
                                />
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Review Title */}
                        <div className="mb-4">
                          <label htmlFor={`title-${item.id}`} className="block text-sm font-medium text-gray-700 mb-1">
                            Review Title
                          </label>
                          <input
                            id={`title-${item.id}`}
                            type="text"
                            value={reviewData[item.id]?.title || ""}
                            onChange={(e) => handleInputChange(item.id, 'title', e.target.value)}
                            placeholder="Summarize your experience in a few words"
                            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>

                        {/* Review Content */}
                        <div className="mb-4">
                          <div className="flex justify-between items-center mb-1">
                            <label htmlFor={`review-${item.id}`} className="block text-sm font-medium text-gray-700">
                              Your Review
                            </label>
                            <button 
                              type="button" 
                              onClick={() => toggleExpanded(item.id)}
                              className="text-sm text-blue-600 hover:text-blue-800 cursor-pointer"
                            >
                              {reviewData[item.id]?.isExpanded ? 'Shrink' : 'Expand'}
                            </button>
                          </div>
                          <textarea
                            id={`review-${item.id}`}
                            value={reviewData[item.id]?.review || ""}
                            onChange={(e) => handleInputChange(item.id, 'review', e.target.value)}
                            placeholder="Share what you liked or didn't like about this product..."
                            rows={reviewData[item.id]?.isExpanded ? 6 : 3}
                            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                          />
                        </div>

                        {/* Submit Button */}
                        <button
                          onClick={() => handleSubmitReview(item.id, item.product_id)}
                          disabled={
                            !reviewData[item.id] || 
                            reviewData[item.id].rating === 0 || 
                            !reviewData[item.id].title || 
                            !reviewData[item.id].review || 
                            reviewData[item.id].isSubmitting
                          }
                          className="cursor-pointer px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors w-full font-medium"
                        >
                          {reviewData[item.id]?.isSubmitting ? (
                            <>
                              <span className="inline-block animate-spin mr-2">⟳</span>
                              Submitting...
                            </>
                          ) : (
                            'Submit Review'
                          )}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserReviews;
