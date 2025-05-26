import { useEffect, useState } from "react";
import axios from "axios";
import { AiOutlineProduct } from "react-icons/ai";
import { CiCalendarDate } from "react-icons/ci";
import { TbShoppingCartCancel, TbLego } from "react-icons/tb";
import { GrPrint, GrUpdate } from "react-icons/gr";
import { FaRegFilePdf } from "react-icons/fa6";
import { toast, Toaster } from 'sonner'
import { Bell, User } from "lucide-react";



const AdminPromo = () => {
    const [promotions, setPromotions] = useState([]);
    const [selectedPromotion, setSelectedPromotion] = useState(null);
    const [reviewedPromotion, setReviewedPromotion] = useState(null);
    const [addPromotionSection, setAddPromotionSection] = useState(false);
    const [activeTab, setActiveTab] = useState("percent");


    const openAddPromotion = () => {
        setAddPromotionSection(true);
      }

      const [newPromotion, setNewPromotion] = useState({
        title: '',
        description: '',
        minimum_spend: 0,
        amount_off: 0,
        highlighted: false,
        code: "",
        percent_off: "",
        duration: "",
        expires_at: "",
        active: false
      });


    const fetchPromotions = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/promotions`);

            setPromotions(response.data);
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        fetchPromotions();
    }, []);

    const findReviewedPromotion = async (id) => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/promotions/${id}}`);

            setReviewedPromotion(response.data);
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        findReviewedPromotion(selectedPromotion?.id)
    }, [selectedPromotion])

    const handleReviewStatusChange = async (reviewId, newStatus) => {
        try {
            await axios.put(`${import.meta.env.VITE_API_BASE_URL}/api/promotions/${reviewId}`, { active: newStatus });

            setPromotions((prevReviews) => 
                prevReviews.map((promotion) => 
                    promotion.id === reviewId ? { ...promotion, active: newStatus } : promotion
                )
            );
        } catch (error) {
            console.error("Error updating review status:", error);
        }
    };

    const addPromotion = async () => {
        try{
          const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/promotions`, newPromotion, { withCredentials: true });
          console.log(response.data);
          toast.success('Promotion added successfully');
          setNewPromotion({
            title: '',
            description: '',
            amount_off: 0,
            minimum_spend: 0,
            highlighted: false,
            code: "",
            percent_off: "",
            duration: "",
            expires_at: "",
            active: "",
          });


        }catch(e){
          console.log(e)
        }
      }



    return (

        <>
         <div className="p-6 bg-white rounded-lg border border-[#e9ebee]">

        {selectedPromotion ? (
            <>
            <div className="flex justify-between items-middle">
                <span className="text-indigo-600 font-bold text-2xl"></span>
                <div className="flex gap-2">
                <button className="px-4 py-2 rounded-md border mb-4 border-[#e9ebee] hover:bg-gray-50 cursor-pointer"><GrPrint /></button>
                <button className="px-4 py-2 rounded-md border mb-4 border-[#e9ebee] hover:bg-gray-50 cursor-pointer"><FaRegFilePdf /></button>
                <button onClick={() => setSelectedPromotion(null)} className="px-4 py-2 rounded-md border mb-4 border-[#e9ebee] hover:bg-gray-50 cursor-pointer">Back</button>
                </div>
                </div>   

                <div className="px-4 sm:px-0">
        <h3 className="text-base/7 font-semibold text-gray-900">Promotion Information</h3>
        <p className="mt-1 max-w-2xl text-sm/6 text-gray-500">Data for Promotion #{selectedPromotion.id}</p>
      </div>
      <div className="mt-6 border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-gray-900">Code</dt>
            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{selectedPromotion.code}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-gray-900">Discount</dt>
            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{selectedPromotion.percent_off}%</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-gray-900">Duration</dt>
            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{selectedPromotion.duration}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-gray-900">Expires</dt>
            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{selectedPromotion.expires_at}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-gray-900">Redeemed</dt>
            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{selectedPromotion.redeemed_count}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-gray-900">Active</dt>
            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{selectedPromotion.active ? 
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="green" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
          </svg>          
             : 
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="red" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
                }</dd>
          </div>
        </dl>
      </div>
            </>
        ): addPromotionSection ? (
            <>
              <>
              <div className="flex justify-between items-middle">
                  <span className="text-indigo-600 font-bold text-2xl"></span>
                  <div className="flex gap-2">
                  <button className="px-4 py-2 rounded-md border mb-4 border-[#e9ebee] hover:bg-gray-50 cursor-pointer"><GrPrint /></button>
                  <button className="px-4 py-2 rounded-md border mb-4 border-[#e9ebee] hover:bg-gray-50 cursor-pointer"><FaRegFilePdf /></button>
                  <button onClick={() => setAddPromotionSection(false)} className="px-4 py-2 rounded-md border mb-4 border-[#e9ebee] hover:bg-gray-50 cursor-pointer">Back</button>
                  </div>
                  </div>    
                  <div>
        <div className="px-4 sm:px-0">
          <h3 className="text-base/7 font-semibold text-gray-900">Add Promotion</h3>
          <p className="mt-1 max-w-2xl text-sm/6 text-gray-500">Create a new promotion code/coupon.</p>
        </div>


        <div className="border-b border-gray-200">
        <div className="flex">
          <button
            onClick={() => setActiveTab("percent")}
            className={`flex items-center px-6 py-4 text-sm font-medium transition border-b-2 ${
              activeTab === "percent"
                ? "border-indigo-600 text-indigo-600"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            <User className="w-4 h-4 mr-2" />
            Percent off Promotion
          </button>
          
          <button
            onClick={() => setActiveTab("amount")}
            className={`flex items-center px-6 py-4 text-sm font-medium transition border-b-2 ${
              activeTab === "amount"
                ? "border-indigo-600 text-indigo-600"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            <Bell className="w-4 h-4 mr-2" />
            Fixed Amount Promotion
          </button>
        </div>
      </div>


        <div className="mt-6 border-t border-gray-100">
          <dl className="divide-y divide-gray-100">
            

          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <p className="text-sm/6 font-medium text-gray-900">Title</p>
              <input 
                type="text"
                className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0 border border-gray-300 rounded-md p-2"
                value={newPromotion.title || ''}  // ✅ Ensures it doesn't crash on undefined values
                onChange={(e) => setNewPromotion({ ...newPromotion, title: e.target.value })}  // ✅ Updates state on change
              />
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <p className="text-sm/6 font-medium text-gray-900">Description</p>
              <input 
                type="text"
                className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0 border border-gray-300 rounded-md p-2"
                value={newPromotion.description || ''}  // ✅ Ensures it doesn't crash on undefined values
                onChange={(e) => setNewPromotion({ ...newPromotion, description: e.target.value })}  // ✅ Updates state on change
              />
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <p className="text-sm/6 font-medium text-gray-900">Highlighted</p>
              <input 
                type="checkbox"
                className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0 border border-gray-300 rounded-md"
                checked={newPromotion.highlighted || false}  // ✅ Reflects actual boolean state
                onChange={(e) =>
                  setNewPromotion({ ...newPromotion, highlighted: e.target.checked })
                }  // ✅ Updates state on change
              />
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <p className="text-sm/6 font-medium text-gray-900">Code</p>
              <input 
                type="text"
                className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0 border border-gray-300 rounded-md p-2"
                value={newPromotion.code || ''}  // ✅ Ensures it doesn't crash on undefined values
                onChange={(e) => setNewPromotion({ ...newPromotion, code: e.target.value })}  // ✅ Updates state on change
              />
            </div>
            {activeTab === "percent" && (
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <p className="text-sm/6 font-medium text-gray-900">Percentage Off</p>
              <input 
                type="text"
                className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0 border border-gray-300 rounded-md p-2"
                value={newPromotion.percent_off || ''}  // ✅ Ensures it doesn't crash on undefined values
                onChange={(e) => setNewPromotion({ ...newPromotion, percent_off: e.target.value })}  // ✅ Updates state on change
              />
            </div>
            )}
            {activeTab === "amount" && (
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <p className="text-sm/6 font-medium text-gray-900">Amount Off</p>
              <input 
                type="text"
                className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0 border border-gray-300 rounded-md p-2"
                value={newPromotion.amount_off || ''}  // ✅ Ensures it doesn't crash on undefined values
                onChange={(e) => setNewPromotion({ ...newPromotion, amount_off: e.target.value })}  // ✅ Updates state on change
              />
            </div>
            )}
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <p className="text-sm/6 font-medium text-gray-900">Minimum Spend</p>
              <input 
                type="text"
                className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0 border border-gray-300 rounded-md p-2"
                value={newPromotion.minimum_spend || ''}  // ✅ Ensures it doesn't crash on undefined values
                onChange={(e) => setNewPromotion({ ...newPromotion, minimum_spend: e.target.value })}  // ✅ Updates state on change
              />
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <p className="text-sm/6 font-medium text-gray-900">Duration</p>
              <input 
                type="text"
                className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0 border border-gray-300 rounded-md p-2"
                value={newPromotion.duration || ''}  // ✅ Ensures it doesn't crash on undefined values
                onChange={(e) => setNewPromotion({ ...newPromotion, duration: e.target.value })}  // ✅ Updates state on change
              />
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <p className="text-sm/6 font-medium text-gray-900">Expires</p>
              <input 
                type="date"
                className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0 border border-gray-300 rounded-md p-2"
                value={newPromotion.expires_at || ''}  // ✅ Ensures it doesn't crash on undefined values
                onChange={(e) => setNewPromotion({ ...newPromotion, expires_at: e.target.value })}  // ✅ Updates state on change
              />
            </div>
            
            
            
          </dl>
        </div>
        <button onClick={() => addPromotion()} className="w-full bg-indigo-600 p-2 rounded-md text-white hover:bg-indigo-700 cursor-pointer transition-all">Confirm</button>
      </div>
      </>
            </>
        ): (
            <>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="p-4 rounded-lg border border-[#e9ebee] flex items-center gap-4 bg-white">
                    <div className="p-3 rounded-md bg-[#e9ebee]">
                        <AiOutlineProduct className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-gray-600">Total Promotions</h3>
                        <p className="text-2xl font-bold text-gray-900">0</p>
                    </div>
                </div>

                <div className="p-4 rounded-lg border border-[#e9ebee] flex items-center gap-4 bg-white">
                    <div className="p-3 rounded-md bg-[#e9ebee]">
                        <CiCalendarDate className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-gray-600">Active Promotions</h3>
                        <p className="text-2xl font-bold text-gray-900">2</p>
                    </div>
                </div>

                <div className="p-4 rounded-lg border border-[#e9ebee] flex items-center gap-4 bg-white">
                    <div className="p-3 rounded-md bg-[#e9ebee]">
                        <TbShoppingCartCancel className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-gray-600">Upcoming Promotions</h3>
                        <p className="text-2xl font-bold text-gray-900">0</p>
                    </div>
                </div>

                <div className="p-4 rounded-lg border border-[#e9ebee] flex items-center gap-4 bg-white">
                    <div className="p-3 rounded-md bg-[#e9ebee]">
                        <TbLego className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-gray-600">Redeemed Promotions</h3>
                        <p className="text-2xl font-bold text-gray-900">0</p>
                    </div>
                </div>
            </div>


            <div className="flex justify-between items-middle">
                <h2 className="text-2xl font-semibold mb-4">Promotions / Coupons</h2>
                <button onClick={() => openAddPromotion()} className="px-4 py-2 rounded-md border mb-4 border-[#e9ebee] ml-2 cursor-pointer hover:bg-gray-50">Add Promotion</button>
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
                    {promotions?.map((promotion, i) => (
                            <tr key={i} className="hover:bg-gray-50 transition">
                                <td className="px-6 py-4 border-b border-[#e9ebee]">{promotion.id}</td>
                                <td className="px-6 py-4 border-b border-[#e9ebee]">{new Date(promotion.created_at).toLocaleDateString()}</td>
                                <td className="px-6 py-4 border-b border-[#e9ebee]">{promotion.code}</td>
                                <td className="px-6 py-4 border-b border-[#e9ebee]">
                                    <input type="checkbox" checked={promotion.active} onChange={() => handleReviewStatusChange(promotion.id, !promotion.active)}/>
                                </td>
                                <td className="px-6 py-4 border-b border-[#e9ebee]">
                                    <span onClick={() => setSelectedPromotion(promotion)} className="text-indigo-600 cursor-pointer hover:text-indigo-700">
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

export default AdminPromo;