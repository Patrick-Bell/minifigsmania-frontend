import { useEffect, useState } from "react";
import axios from "axios";
import { AiOutlineProduct } from "react-icons/ai";
import { CiCalendarDate } from "react-icons/ci";
import { TbShoppingCartCancel, TbLego } from "react-icons/tb";
import { GrPrint, GrUpdate } from "react-icons/gr";
import { FaRegFilePdf } from "react-icons/fa6";



const AdminReviews = () => {
    const [reviews, setReviews] = useState([]);
    const [seleectedReview, setSelectedReview] = useState(null);
    const [reviewedProduct, setReviewedProduct] = useState(null);

    const fetchReviews = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/reviews`);

            setReviews(response.data);
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        fetchReviews();
    }, []);

    const findReviewedProduct = async (id) => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/products/${id}}`);

            setReviewedProduct(response.data);
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        findReviewedProduct(seleectedReview?.product_id)
    }, [seleectedReview])

    const handleReviewStatusChange = async (reviewId, newStatus) => {
        try {
            await axios.put(`${import.meta.env.VITE_API_BASE_URL}/api/reviews/${reviewId}`, { reviewed: newStatus }, { withCredentials: true });

            setReviews((prevReviews) => 
                prevReviews.map((review) => 
                    review.id === reviewId ? { ...review, reviewed: newStatus } : review
                )
            );
        } catch (error) {
            console.error("Error updating review status:", error);
        }
    };

    const totalReviews = reviews.length;
    const acceptedReviews = reviews.filter((review) => review.reviewed).length;
    const pendingReviews = reviews.filter((review) => !review.reviewed).length;
    


    return (

        <>
         <div className="p-6 bg-white rounded-lg border border-[#e9ebee]">

        {seleectedReview ? (
            <>
            <div className="flex justify-between items-middle">
                <span className="text-indigo-600 font-bold text-2xl"></span>
                <div className="flex gap-2">
                <button className="px-4 py-2 rounded-md border mb-4 border-[#e9ebee] hover:bg-gray-50 cursor-pointer"><GrPrint /></button>
                <button className="px-4 py-2 rounded-md border mb-4 border-[#e9ebee] hover:bg-gray-50 cursor-pointer"><FaRegFilePdf /></button>
                <button onClick={() => setSelectedReview(null)} className="px-4 py-2 rounded-md border mb-4 border-[#e9ebee] hover:bg-gray-50 cursor-pointer">Back</button>
                </div>
                </div>   

                <div className="px-4 sm:px-0">
        <h3 className="text-base/7 font-semibold text-gray-900">Review Information</h3>
        <p className="mt-1 max-w-2xl text-sm/6 text-gray-500">Review data for product #{seleectedReview.product_id}</p>
      </div>
      <div className="mt-6 border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-gray-900">Name</dt>
            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{seleectedReview.name}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-gray-900">Review Heading</dt>
            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{seleectedReview.header}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-gray-900">Review Text</dt>
            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{seleectedReview.text}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-gray-900">Rating</dt>
            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{seleectedReview.rating}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-gray-900">Platform</dt>
            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{seleectedReview.platform}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-gray-900">Review Accepted</dt>
            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{seleectedReview.reviewed ? 
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="green" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
          </svg>          
             : 
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="red" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
                }</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-gray-900">Product</dt>
            <div className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0 flex items-center gap-4">
            <img className="w-20" src={reviewedProduct?.images[0]?.url} alt={reviewedProduct?.name} />
            <div>
            <p>{reviewedProduct?.name}</p>
            <p>£{reviewedProduct?.price}</p>
            </div>
            </div>
          </div>
        </dl>
      </div>
            </>
        ):(
            <>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="p-4 rounded-lg border border-[#e9ebee] flex items-center gap-4 bg-white">
                    <div className="p-3 rounded-md bg-[#e9ebee]">
                        <AiOutlineProduct className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-gray-600">Total Reviews</h3>
                        <p className="text-2xl font-bold text-gray-900">{totalReviews}</p>
                    </div>
                </div>

                <div className="p-4 rounded-lg border border-[#e9ebee] flex items-center gap-4 bg-white">
                    <div className="p-3 rounded-md bg-[#e9ebee]">
                        <CiCalendarDate className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-gray-600">Recent Reviews</h3>
                        <p className="text-2xl font-bold text-gray-900">2</p>
                    </div>
                </div>

                <div className="p-4 rounded-lg border border-[#e9ebee] flex items-center gap-4 bg-white">
                    <div className="p-3 rounded-md bg-[#e9ebee]">
                        <TbShoppingCartCancel className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-gray-600">Accepted Reviews</h3>
                        <p className="text-2xl font-bold text-gray-900">{acceptedReviews}</p>
                    </div>
                </div>

                <div className="p-4 rounded-lg border border-[#e9ebee] flex items-center gap-4 bg-white">
                    <div className="p-3 rounded-md bg-[#e9ebee]">
                        <TbLego className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-gray-600">Pending Reviews</h3>
                        <p className="text-2xl font-bold text-gray-900">{pendingReviews}</p>
                    </div>
                </div>
            </div>


            <div className="flex justify-between items-middle">
                <h2 className="text-2xl font-semibold mb-4">Reviews</h2>
                <button className="px-4 py-2 rounded-md border mb-4 border-[#e9ebee]">Filter</button>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full border-collapse bg-white text-left text-sm text-gray-700">
                    <thead className="bg-gray-100 text-gray-600 uppercase text-xs font-semibold">
                        <tr>
                            <th className="px-6 py-3 border-b border-[#e9ebee]">Review Id</th>
                            <th className="px-6 py-3 border-b border-[#e9ebee]">Date</th>
                            <th className="px-6 py-3 border-b border-[#e9ebee]">Rating</th>
                            <th className="px-6 py-3 border-b border-[#e9ebee]">Status</th>
                            <th className="px-6 py-3 border-b border-[#e9ebee]">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                    {reviews?.map((review, i) => (
                            <tr key={i} className="hover:bg-gray-50 transition">
                                <td className="px-6 py-4 border-b border-[#e9ebee]">{review.id}</td>
                                <td className="px-6 py-4 border-b border-[#e9ebee]">{new Date(review.created_at).toLocaleDateString()}</td>
                                <td className="px-6 py-4 border-b border-[#e9ebee]">{review.rating}</td>
                                <td className="px-6 py-4 border-b border-[#e9ebee]">
                                    <input type="checkbox" checked={review.reviewed} onChange={() => handleReviewStatusChange(review.id, !review.reviewed)}/>
                                </td>
                                <td className="px-6 py-4 border-b border-[#e9ebee]">
                                    <span onClick={() => setSelectedReview(review)} className="text-indigo-600 cursor-pointer hover:text-indigo-700">
                                        View
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            </>
        )}
         

        </div>

        
        </>
    )

}

export default AdminReviews;