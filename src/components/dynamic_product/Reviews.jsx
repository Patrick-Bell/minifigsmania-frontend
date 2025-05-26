const Reviews = ({ product }) => {  
    // Filter only reviews that have been reviewed
    const validReviews = product?.reviews?.filter(review => review.reviewed === true) || [];
  
    // Calculate average rating
    const rating = validReviews.length
      ? validReviews.reduce((acc, item) => acc + item.rating, 0) / validReviews.length
      : 0; 
  
    // Get total number of reviews
    const totalReviews = validReviews.length;
  
    // Get rating counts dynamically
    const ratingCounts = [5, 4, 3, 2, 1].map((rating) => {
      const count = validReviews.filter((review) => review.rating === rating).length;
      const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
      return { rating, count, percentage };
    });
  
    return (
      <div>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-medium">Customer Reviews</h3>
        </div>
        
        <div className="flex flex-col md:flex-row mb-8">
          {/* Left Section: Rating Summary */}
          <div className="md:w-1/3 mb-6 md:mb-0 text-center">
            <div className="text-5xl font-bold text-gray-900 mb-2">{rating.toFixed(1)}</div>
            <div className="flex justify-center mb-2">
              {[...Array(5)].map((_, i) => (
                <svg key={i} xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}`} viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <p className="text-gray-600">{totalReviews} reviews</p>
  
            {/* Rating Bar */}
            <div className="mt-6 px-4">
              {ratingCounts.map(({ rating, count, percentage }) => (
                <div key={rating} className="flex items-center mb-2">
                  <div className="w-10 text-right text-gray-600">{rating}</div>
                  <div className="ml-2 flex-1">
                    <div className="h-2 bg-gray-200 rounded-full">
                      <div 
                        className="h-2 bg-yellow-400 rounded-full" 
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="ml-2 w-10 text-gray-600 text-sm">{percentage.toFixed(0)}%</div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Right Section: User Reviews */}
          <div className="md:w-2/3 md:pl-8 ">
            {validReviews.length > 0 ? (
              validReviews.map((review, i) => (
                <div key={i} className="bg-white p-6 border-b border-[#e9ebee]">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="text-lg font-semibold text-gray-900">{review.name}</h4>
                  <span className="text-sm text-gray-500">{new Date(review.created_at).toLocaleDateString()}</span>
                </div>
                
                <div className="flex items-center mb-3">
                  {[...Array(5)].map((_, i) => (
                    <svg 
                      key={i} 
                      xmlns="http://www.w3.org/2000/svg" 
                      className={`h-5 w-5 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`} 
                      viewBox="0 0 20 20" 
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                
                <h5 className="text-base font-medium text-gray-800 mb-2">{review.header}</h5>
                
                <p className="text-gray-700 text-sm leading-relaxed">
                  {review.text}
                </p>
              </div>
              
              ))
            ) : (
              <p className="text-gray-500">No reviews yet.</p>
            )}
          </div>
        </div>
      </div>
    );
  };
  
  export default Reviews;
  