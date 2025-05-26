import React, { useEffect, useState } from 'react';
import axios from 'axios'
import OrderCard from './OrderCard';
import OrderDetail from './OrderDetail';

const UserOrders = () => {

    const [orders, setOrders] = useState([])
    const [selectedOrder, setSelectedOrder] = useState(null)
    const [activeTab, setActiveTab] = useState('all-orders')
    const [filteredOrders, setFilteredOrders] = useState([])

    const getOrders = async () => {
        try{
            const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/my-orders`, { withCredentials: true })
            setOrders(response.data)
            setFilteredOrders(response.data)
            console.log('my orders', response.data)
        }catch(e){
            console.log(e)
        }
    }

    useEffect(() => {
        getOrders()
    }, [])

    const handleTabChange = (tab) => {
        setActiveTab(tab)
        if (tab === 'all-orders') {
            setFilteredOrders(orders)
        } else if (['refunded', 'returned', 'resolved'].includes(tab)) {
            const filtered = orders.filter(order =>
                ['refunded', 'returned', 'resolved'].includes(order.status)
            )
            setFilteredOrders(filtered)
        } else {
            const filtered = orders.filter(order => order.status === tab)
            setFilteredOrders(filtered)
        }
    }

    return (
        <>
            {selectedOrder ? (
                <OrderDetail order={selectedOrder} setSelectedOrder={setSelectedOrder} />
            ) : (
                <>
                    <div className="">
                        {/* Order Tabs */}
                        <div className="bg-white rounded-lg mb-4 border border-gray-200">
                            <div className="flex">
                                <div onClick={() => handleTabChange('all-orders')} className={`px-4 py-3 text-sm font-medium ${activeTab === 'all-orders' ? 'text-indigo-500' : 'text-gray-500'} ${activeTab === 'all-orders' ? 'border-b-2' : 'border-b-0'} hover:border-b-2 cursor-pointer rounded-bl-lg`}>
                                    All Orders ({ orders.length })
                                </div>
                                <div onClick={() => handleTabChange('processing')} className={`px-4 py-3 text-sm font-medium ${activeTab === 'processing' ? 'text-indigo-500' : 'text-gray-500'} ${activeTab === 'processing' ? 'border-b-2' : 'border-b-0'} hover:border-b-2 cursor-pointer`}>
                                    Awaiting Shipment ({ orders.filter(order => order.status === 'processing').length })
                                </div>
                                <div onClick={() => handleTabChange('shipped')} className={`px-4 py-3 text-sm font-medium ${activeTab === 'shipped' ? 'text-indigo-500' : 'text-gray-500'} ${activeTab === 'shipped' ? 'border-b-2' : 'border-b-0'} hover:border-b-2 cursor-pointer`}>
                                    Shipped ({ orders.filter(order => order.status === 'shipped').length })
                                </div>
                                <div onClick={() => handleTabChange('delivered')} className={`px-4 py-3 text-sm font-medium ${activeTab === 'delivered' ? 'text-indigo-500' : 'text-gray-500'} ${activeTab === 'delivered' ? 'border-b-2' : 'border-b-0'} hover:border-b-2 cursor-pointer`}>
                                    Completed ({ orders.filter(order => order.status === 'delivered').length })
                                </div>
                                <div onClick={() => handleTabChange('refunded')} className={`px-4 py-3 text-sm font-medium ${activeTab === 'refunded' ? 'text-indigo-500' : 'text-gray-500'} ${activeTab === 'refunded' ? 'border-b-2' : 'border-b-0'} hover:border-b-2 cursor-pointer`}>
                                    Refunded ({ orders.filter(order => ['refunded', 'returned', 'resolved'].includes(order.status)).length })
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Orders List */}
                    {filteredOrders.length > 0 ? (
                        filteredOrders.map((order, i) => (
                            <OrderCard key={i} order={order} setSelectedOrder={setSelectedOrder} />
                        ))
                    ) : (
                        <div className="text-center py-20 text-gray-500 border border-gray-200 rounded-lg bg-white">
                            <p className='text-sm'>No orders in this category.</p>
                            <p className='text-sm'>Click <span onClick={() => handleTabChange('all-orders')} className='text-indigo-500 font-bold cursor-pointer hover:text-indigo-600'>here</span> to see all orders.</p>
                        </div>
                    )}
                </>
            )}
        </>
    );
};

export default UserOrders;
