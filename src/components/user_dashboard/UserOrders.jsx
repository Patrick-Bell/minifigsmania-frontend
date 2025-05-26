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
                    <div className="w-full">
                        {/* Order Tabs */}
                        <div className="bg-white rounded-lg mb-4 border border-gray-200">
                            {/* Desktop Tabs */}
                            <div className="hidden md:flex">
                                <div onClick={() => handleTabChange('all-orders')} className={`px-4 py-3 text-sm font-medium ${activeTab === 'all-orders' ? 'text-indigo-500 border-b-2 border-indigo-500' : 'text-gray-500'} hover:text-indigo-500 hover:border-b-2 hover:border-indigo-300 cursor-pointer rounded-bl-lg transition-colors`}>
                                    All Orders ({orders.length})
                                </div>
                                <div onClick={() => handleTabChange('processing')} className={`px-4 py-3 text-sm font-medium ${activeTab === 'processing' ? 'text-indigo-500 border-b-2 border-indigo-500' : 'text-gray-500'} hover:text-indigo-500 hover:border-b-2 hover:border-indigo-300 cursor-pointer transition-colors`}>
                                    Awaiting Shipment ({orders.filter(order => order.status === 'processing').length})
                                </div>
                                <div onClick={() => handleTabChange('shipped')} className={`px-4 py-3 text-sm font-medium ${activeTab === 'shipped' ? 'text-indigo-500 border-b-2 border-indigo-500' : 'text-gray-500'} hover:text-indigo-500 hover:border-b-2 hover:border-indigo-300 cursor-pointer transition-colors`}>
                                    Shipped ({orders.filter(order => order.status === 'shipped').length})
                                </div>
                                <div onClick={() => handleTabChange('delivered')} className={`px-4 py-3 text-sm font-medium ${activeTab === 'delivered' ? 'text-indigo-500 border-b-2 border-indigo-500' : 'text-gray-500'} hover:text-indigo-500 hover:border-b-2 hover:border-indigo-300 cursor-pointer transition-colors`}>
                                    Completed ({orders.filter(order => order.status === 'delivered').length})
                                </div>
                                <div onClick={() => handleTabChange('refunded')} className={`px-4 py-3 text-sm font-medium ${activeTab === 'refunded' ? 'text-indigo-500 border-b-2 border-indigo-500' : 'text-gray-500'} hover:text-indigo-500 hover:border-b-2 hover:border-indigo-300 cursor-pointer transition-colors`}>
                                    Refunded ({orders.filter(order => ['refunded', 'returned', 'resolved'].includes(order.status)).length})
                                </div>
                            </div>

                            {/* Mobile Tabs - Scrollable */}
                            <div className="md:hidden overflow-x-auto">
                                <div className="flex min-w-max">
                                    <div onClick={() => handleTabChange('all-orders')} className={`px-3 py-3 text-xs font-medium whitespace-nowrap ${activeTab === 'all-orders' ? 'text-indigo-500 border-b-2 border-indigo-500' : 'text-gray-500'} cursor-pointer transition-colors`}>
                                        All ({orders.length})
                                    </div>
                                    <div onClick={() => handleTabChange('processing')} className={`px-3 py-3 text-xs font-medium whitespace-nowrap ${activeTab === 'processing' ? 'text-indigo-500 border-b-2 border-indigo-500' : 'text-gray-500'} cursor-pointer transition-colors`}>
                                        Awaiting ({orders.filter(order => order.status === 'processing').length})
                                    </div>
                                    <div onClick={() => handleTabChange('shipped')} className={`px-3 py-3 text-xs font-medium whitespace-nowrap ${activeTab === 'shipped' ? 'text-indigo-500 border-b-2 border-indigo-500' : 'text-gray-500'} cursor-pointer transition-colors`}>
                                        Shipped ({orders.filter(order => order.status === 'shipped').length})
                                    </div>
                                    <div onClick={() => handleTabChange('delivered')} className={`px-3 py-3 text-xs font-medium whitespace-nowrap ${activeTab === 'delivered' ? 'text-indigo-500 border-b-2 border-indigo-500' : 'text-gray-500'} cursor-pointer transition-colors`}>
                                        Completed ({orders.filter(order => order.status === 'delivered').length})
                                    </div>
                                    <div onClick={() => handleTabChange('refunded')} className={`px-3 py-3 text-xs font-medium whitespace-nowrap ${activeTab === 'refunded' ? 'text-indigo-500 border-b-2 border-indigo-500' : 'text-gray-500'} cursor-pointer transition-colors`}>
                                        Refunded ({orders.filter(order => ['refunded', 'returned', 'resolved'].includes(order.status)).length})
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Orders List */}
                    <div className="space-y-4">
                        {filteredOrders.length > 0 ? (
                            filteredOrders.map((order, i) => (
                                <OrderCard key={i} order={order} setSelectedOrder={setSelectedOrder} />
                            ))
                        ) : (
                            <div className="text-center py-12 md:py-20 text-gray-500 border border-gray-200 rounded-lg bg-white">
                                <p className='text-sm mb-2'>No orders in this category.</p>
                                <p className='text-sm px-4'>Click <span onClick={() => handleTabChange('all-orders')} className='text-indigo-500 font-bold cursor-pointer hover:text-indigo-600 underline'>here</span> to see all orders.</p>
                            </div>
                        )}
                    </div>
                </>
            )}
        </>
    );
};

export default UserOrders;