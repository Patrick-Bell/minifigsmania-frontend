import { useEffect, useState } from "react";
import axios from "axios";
import { AiOutlineProduct } from "react-icons/ai";
import { CiCalendarDate } from "react-icons/ci";
import { TbShoppingCartCancel, TbLego } from "react-icons/tb";
import AdminUpdateOrderSelect from "./AdminUpdateOrderSelect";
import { TbTruckDelivery, TbCircleCheck, TbCircleX } from "react-icons/tb";
import { MdPendingActions, MdLocalShipping } from "react-icons/md";
import { FaRegFilePdf } from "react-icons/fa6";
import { GrPrint } from "react-icons/gr";
import { toast } from 'sonner'
import masterCardImg from '../assets/card.png'
import applePay from '../assets/apple-pay.png'
import { getOrders } from "../routes/OrderRoutes";
import UserOrderInvoice from "../user_dashboard/UserOrderInvoice"
import { PDFDownloadLink } from "@react-pdf/renderer";


const AdminOrders = () => {
    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [updatedOrder, setUpdatedOrder] = useState(null);

    const fetchOrders = async () => {
        try {
            const response = await getOrders();
            setOrders(response)
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, [selectedOrder, updatedOrder]);

    const showPay = (order) => {
        if (order.paid) {
            return (
                <span className="text-green-700 bg-green-200 p-1 rounded-md font-bold text-xs">PAID</span>
            )
        } else {
            return (
                <span className="text-red-700 bg-red-200 p-1 rounded-md font-bold text-xs">NOT PAID</span>
            )
    }
}

    const showStaus = (status) => {
        switch (status) {
            case "pending":
                return (
                    <span className="text-gray-700 bg-gray-200 p-1 rounded-md font-bold text-xs">Pending</span>
                );
            case "processing":
                return (
                    <span className="text-blue-700 bg-blue-200 p-1 rounded-md font-bold text-xs">Processing</span>
                );
            case "shipped":
                return (
                    <span className="text-orange-700 bg-orange-200 p-1 rounded-md font-bold text-xs">Shipped</span>
                );
                case "delivered":
                return (
                    <span className="text-green-700 bg-green-200 p-1 rounded-md font-bold text-xs">Delivered</span>
                );
            case "cancelled":
                return (
                    <span className="text-red-700 bg-red-200 p-1 rounded-md font-bold text-xs">Cancelled</span>
                );
            case "refunded":
                return (
                    <span className="text-red-700 bg-red-200 p-1 rounded-md font-bold text-xs">Refunded</span>
                );
        }
    }

    const calculateTotal = (products) => {
        return products.reduce((sum, pro) => sum + pro.price * pro.quantity, 0);
    }

    const ordersValue = orders?.reduce(
        (sum, order) => sum + order?.line_items?.reduce(
            (orderSum, item) => orderSum + (item.quantity * item.price), 0
        ) || 0, 
        0
    ).toFixed(2);
    
    const avgOrder = ordersValue / orders.length


    const editOneOrder = async (id) => {
        try {
            const response = await axios.put(`${import.meta.env.VITE_API_BASE_URL}/api/orders/${id}`,  { order: updatedOrder }, { withCredentials: true } )
            toast.success('Order successfully updated!')
        }catch(e){
            console.log(e)
        }
    }

    return (
        <>
            <div className="p-6 bg-white rounded-lg border border-[#e9ebee]">
            {selectedOrder ? (
                <>
                <div className="flex justify-between items-middle">
                <span className="text-indigo-600 font-bold text-2xl">£{(calculateTotal(selectedOrder.line_items) + Number(selectedOrder.shipping_fee)).toFixed(2)}</span>
                <div className="flex gap-2">
                <button className="px-4 py-2 rounded-md border mb-4 border-[#e9ebee] hover:bg-gray-50 cursor-pointer"><GrPrint /></button>

                <PDFDownloadLink document={<UserOrderInvoice order={selectedOrder} />} fileName={`order-${selectedOrder?.id}.pdf`}>
                      <button className="px-4 py-4 rounded-md border mb-4 border-[#e9ebee] hover:bg-gray-50 cursor-pointer">
                      <FaRegFilePdf className="w-5 h-5 text-gray-600 ml-2" />
                      </button>
                </PDFDownloadLink>

                <button onClick={() => setSelectedOrder(null)} className="px-4 py-2 rounded-md border mb-4 border-[#e9ebee] hover:bg-gray-50 cursor-pointer">Back</button>
                </div>
                </div>

                <div className="px-4 sm:px-0">
                <div className="mt-6 border-t border-gray-100"></div>
        <h3 className="mt-6 text-base/7 font-semibold text-gray-900">Customer Information</h3>
        <p className="mt-1 max-w-2xl text-sm/6 text-gray-500">Review data on the customer </p>
      </div>
      <div className="mt-6 border-t border-gray-100">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-gray-900">Name</dt>
            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{selectedOrder?.name}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-gray-900">Email</dt>
            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{selectedOrder?.email || "N/A"}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-gray-900">Number</dt>
            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{selectedOrder?.phone || "N/A"}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-gray-900">Address</dt>
            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{selectedOrder?.address}</dd>
          </div>
      </div>


      <div className="px-4 sm:px-0">
                <div className="mt-6 border-t border-gray-100"></div>
        <h3 className="mt-6 text-base/7 font-semibold text-gray-900">Shipping Information</h3>
        <p className="mt-1 max-w-2xl text-sm/6 text-gray-500">Review data on shipment status </p>
      </div>
      <div className="mt-6 border-t border-gray-100">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-gray-900">Shipping Address</dt>
            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{selectedOrder?.address}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-gray-900">Shipping Method</dt>
            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">Royal Mail 2nd Class</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-gray-900">Order Date</dt>
            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{new Date(selectedOrder?.date).toLocaleString()}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-gray-900">Expected Delivery Date</dt>
            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{new Date(selectedOrder?.delivery_date).toLocaleDateString()}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-gray-900">Shipping Fee</dt>
            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">£{selectedOrder.shipping_fee}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-gray-900">Shipping Status</dt>
            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{showStaus(selectedOrder?.status)}</dd>
          </div>
      </div>

      <div className="mt-6 border-t border-gray-100"></div>
      

      
      <div className="mt-6 px-4 sm:px-0">
        <h3 className="text-base/7 font-semibold text-gray-900">Payment Information</h3>
        <p className="mt-1 max-w-2xl text-sm/6 text-gray-500">Review data on payment </p>
      </div>
      <div className="mt-6 border-t border-gray-100">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-gray-900">Order Date</dt>
            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{new Date(selectedOrder?.date).toLocaleString()}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-gray-900">Paid</dt>
            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{showPay(selectedOrder)}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-gray-900">Payment Method</dt>
            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">Apple Pay</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-gray-900">Card ending in</dt>
            <div className="flex items-center">
            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{selectedOrder?.last_four || "XXXX"}</dd>
            <img className="w-7 ml-2" src={applePay}/>
            </div>
          </div>
      </div>

      <div className="mt-6 border-t border-gray-100"></div>


      <div className="mt-6 px-4 sm:px-0">
        <h3 className="text-base/7 font-semibold text-gray-900">Order Information</h3>
        <p className="mt-1 max-w-2xl text-sm/6 text-gray-500">Review data on the products ordered </p>
      </div>
      <div className="mt-6 border-t border-gray-100">
      <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-gray-900">Platform</dt>
            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{selectedOrder?.platform}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-gray-900">Total Quantity</dt>
            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{selectedOrder?.line_items.reduce((sum, item) => sum + item.quantity, 0)}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-gray-900">Products</dt>
            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
            <div className="flex gap-4 overflow-x-auto whitespace-nowrap min-w-0 p-2">
                {selectedOrder.line_items.map((product, i) => (
                    <div key={i} className="flex items-center gap-4 border border-gray-100 p-2 rounded-md shrink-0">
                    <img src={product.image} alt={product.name} className="w-16 h-16 object-cover rounded-md" />
                    <div>
                        <h3 className="text-sm font-semibold text-gray-900">{product.name}</h3>
                        <p className="text-sm text-gray-500">£{product.price} x {product.quantity}</p>
                    </div>
                    </div>
                ))}
                </div>
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-gray-900">Sub Total</dt>
            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">£{selectedOrder.line_items.reduce((sum, item) => sum + (item.quantity * item.price), 0).toFixed(2)}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-gray-900">Shipping Fee</dt>
            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">£{selectedOrder?.shipping_fee}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-gray-900">Total</dt>
            <dd className="mt-1 text-sm/6 font-bold text-indigo-700 sm:col-span-2 sm:mt-0">£{(selectedOrder.line_items.reduce((sum, item) => sum + (item.quantity * item.price), 0) + 1.55).toFixed(2)}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-gray-900">Estimated Profit</dt>
            <dd className="mt-1 text-sm/6 font-bold text-gray-400 border-dashed sm:col-span-2 sm:mt-0">£2</dd>
          </div>
      </div>
                  
                </>
            ): updatedOrder ? (
                <>
                <div className="flex justify-between items-center">
                    <h2 className="text-gray-600 font-bold text-2xl">Order #{updatedOrder?.id}</h2>
                    <button 
                        onClick={() => setUpdatedOrder(null)} 
                        className="px-4 py-2 rounded-md border mb-4 border-[#e9ebee]"
                    >
                        Back
                    </button>
                </div>


            
                {/* Update Shipping Status */}
                <div className="p-4 border border-gray-200 rounded-md mt-6">
                    <AdminUpdateOrderSelect
                    label="Update Shipping Status"
                    options={[
                        { value: "pending", label: "Pending", icon: <MdPendingActions className="text-gray-600" /> },
                        { value: "processing", label: "Processing", icon: <TbTruckDelivery className="text-blue-600" /> },
                        { value: "shipped", label: "Shipped", icon: <MdLocalShipping className="text-orange-600" /> },
                        { value: "delivered", label: "Delivered", icon: <TbCircleCheck className="text-green-600" /> },
                        { value: "cancelled", label: "Cancelled", icon: <TbCircleX className="text-red-600" /> }
                    ]}
                    selected={updatedOrder?.status}
                    setSelected={(value) => setUpdatedOrder({ ...updatedOrder, status: value })}
                />
                </div>
            
                {/* Update Payment Status */}
                <div className="p-4 border border-gray-200 rounded-md mt-6">
                <AdminUpdateOrderSelect 
                    label="Update Payment Status"
                    options={[
                        { value: false, label: "Not Paid", icon: <TbCircleX className="text-red-600" /> },
                        { value: true, label: "Paid", icon: <TbCircleCheck className="text-green-600" /> }
                    ]}
                    selected={updatedOrder?.paid ? true : false}
                    setSelected={(value) => setUpdatedOrder({ ...updatedOrder, paid: value === true })}
                />
            </div>
            
                {/* Confirm Button */}
                <button 
                    onClick={() => editOneOrder(updatedOrder?.id)} 
                    className="mt-6 w-full bg-indigo-600 text-white font-medium p-3 rounded-md hover:bg-indigo-700 transition hover:cursor-pointer"
                >
                    Confirm Changes
                </button>
            </>
            
            ):(
                <>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="p-4 rounded-lg border border-[#e9ebee] flex items-center gap-4 bg-white">
                    <div className="p-3 rounded-md bg-[#e9ebee]">
                        <AiOutlineProduct className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-gray-600">Total Orders</h3>
                        <p className="text-2xl font-bold text-gray-900">{orders?.length}</p>
                    </div>
                </div>

                <div className="p-4 rounded-lg border border-[#e9ebee] flex items-center gap-4 bg-white">
                    <div className="p-3 rounded-md bg-[#e9ebee]">
                        <CiCalendarDate className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-gray-600">Average Order</h3>
                        <p className="text-2xl font-bold text-gray-900">£{(avgOrder).toFixed(2)}</p>
                    </div>
                </div>

                <div className="p-4 rounded-lg border border-[#e9ebee] flex items-center gap-4 bg-white">
                    <div className="p-3 rounded-md bg-[#e9ebee]">
                        <TbShoppingCartCancel className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-gray-600">Completed Orders</h3>
                        <p className="text-2xl font-bold text-gray-900"></p>
                    </div>
                </div>

                <div className="p-4 rounded-lg border border-[#e9ebee] flex items-center gap-4 bg-white">
                    <div className="p-3 rounded-md bg-[#e9ebee]">
                        <TbLego className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-gray-600">Refunded Orders</h3>
                        <p className="text-2xl font-bold text-gray-900"></p>
                    </div>
                </div>
            </div>

            <div className="flex justify-between items-middle">
                <h2 className="text-2xl font-semibold mb-4">Orders</h2>
                <button className="px-4 py-2 rounded-md border mb-4 border-[#e9ebee]">Filter</button>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full border-collapse bg-white text-left text-sm text-gray-700">
                    <thead className="bg-gray-100 text-gray-600 uppercase text-xs font-semibold">
                        <tr>
                            <th className="px-6 py-3 border-b border-[#e9ebee]">Order Id</th>
                            <th className="px-6 py-3 border-b border-[#e9ebee]">Date</th>
                            <th className="px-6 py-3 border-b border-[#e9ebee]">No. of items</th>
                            <th className="px-6 py-3 border-b border-[#e9ebee]">Price</th>
                            <th className="px-6 py-3 border-b border-[#e9ebee]">Paid</th>
                            <th className="px-6 py-3 border-b border-[#e9ebee]">Status</th>
                            <th className="px-6 py-3 border-b border-[#e9ebee]">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders?.map((order, i) => (
                            <tr key={i} className="hover:bg-gray-50 transition">
                                <td className="px-6 py-4 border-b border-[#e9ebee]">{order?.id}</td>
                                <td className="px-6 py-4 border-b border-[#e9ebee]">{new Date(order?.date).toLocaleString('en-GB').slice(0, 17)}</td>
                                <td className="px-6 py-4 border-b border-[#e9ebee]">
                                    {order?.line_items.reduce((sum, pro) => sum + pro.quantity, 0)}
                                </td>
                                <td className="px-6 py-4 border-b border-[#e9ebee]">£{order?.total_price}</td>
                                <td className="px-6 py-4 border-b border-[#e9ebee]">{showPay(order)}</td>
                                <td className="px-6 py-4 border-b border-[#e9ebee]">{showStaus(order?.status)}</td>
                                <td className="px-6 py-4 border-b border-[#e9ebee]">
                                    <span onClick={() => setSelectedOrder(order)} className="text-indigo-600 cursor-pointer hover:text-indigo-700">
                                        View
                                    </span>
                                    <span onClick={() => setUpdatedOrder(order)} className="ml-3 text-indigo-600 cursor-pointer hover:text-indigo-700">
                                        Update
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
    );
};

export default AdminOrders;
