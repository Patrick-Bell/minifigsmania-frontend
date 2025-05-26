import React, { useEffect, useState } from "react";
import { ShoppingBag, Star, Clock, Package, TrendingUp, Eye, Heart, CreditCard, Section } from "lucide-react";
import { getMyOrders } from "../routes/OrderRoutes";
import { useAuth } from "../context/AuthContext";
import { getMyReviews } from "../routes/ReviewRoutes";
import { getProducts } from '../routes/ProductRoutes'
import ProductCard from '../product_page/ProductCard'
import TrackOrder from './TrackOrder'
import SpecialOffers from "./SpecialOffers";
import { myWishlist } from "../routes/WishlistRoutes";


const UserDashboard = ({ setSection }) => {

  const { user } = useAuth()
  const [orders, setOrders] = useState([])
  const [reviews, setReviews] = useState([])
  const [total, setTotal] = useState(0)
  const [recommendedProducts, setRecommendedProducts] = useState([])
  const [trackingModal, setTrackingModal] = useState(false)
  const [showSpecialOffers, setShowSpecialOffers] = useState(false)
  const [favourites, setFavourites] = useState([])

  const fetchMyOrders = async () => {
    const orders = await getMyOrders()
    setOrders(orders)
    const reviews = await getMyReviews()
    setReviews(reviews)

    const total = orders.reduce((acc, order) => acc + order.total_price, 0)
    setTotal(total)

    const products = await getProducts()
    console.log(products, 'prpducts to test')
    const randomProducts = products.sort(() => 0.5 - Math.random()).slice(0, 6)
    setRecommendedProducts(randomProducts)
  }

  const closeModal = () => {
    setTrackingModal(false)
  }

  const closeSpecialOffers = () => {
    setShowSpecialOffers(false)
  }

  useEffect(() => {
    fetchMyOrders()
  }, [])

  const stats = [
    { title: "Total Orders", value: orders.length, icon: <ShoppingBag className="w-5 h-5 text-blue-500" />, color: "bg-blue-100" },
    { title: "Reviews Given", value: reviews.length, icon: <Star className="w-5 h-5 text-yellow-500" />, color: "bg-yellow-100" },
    { title: "Wishlist Items", value: favourites.length, icon: <Heart className="w-5 h-5 text-red-500" />, color: "bg-red-100" },
    { title: "Total Spent", value: '£' + total, icon: <CreditCard className="w-5 h-5 text-green-500" />, color: "bg-green-100" },
  ];

  const quickLinks = [
    { name: "Track Order", icon: <Package className="w-5 h-5" /> },
    { name: "My Wishlist", icon: <Heart className="w-5 h-5" /> },
    { name: "View Products", icon: <Eye className="w-5 h-5" /> },
    { name: "Special Offers", icon: <TrendingUp className="w-5 h-5" /> },
  ];

  return (
    <>
        <TrackOrder isOpen={trackingModal} onClose={closeModal} />
        <SpecialOffers isOpen={showSpecialOffers} onClose={closeSpecialOffers} />

    <div className="grid grid-cols-1 gap-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl p-6 text-white">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h2 className="text-xl font-bold mb-1">Welcome back, {user?.user?.name}!</h2>
            <p className="text-indigo-100">Your last login was on April 13, 2025</p>
          </div>
          <div className="mt-4 md:mt-0">
            <button onClick={() => setSection('Orders')} className="bg-white text-indigo-600 px-4 py-2 rounded-lg font-medium text-sm hover:bg-indigo-50 transition cursor-pointer">
              View All Orders
            </button>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-4 rounded-xl border border-gray-200">
            <div className="flex items-center space-x-4">
              <div className={`${stat.color} p-3 rounded-lg`}>
                {stat.icon}
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                <p className="text-xl font-bold text-gray-800">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-gray-800">Recent Orders</h3>
            <button onClick={() => setSection('Orders')} className="text-sm text-indigo-600 hover:text-indigo-800 font-medium cursor-pointer">
              View All
            </button>
          </div>
        
        {orders.length === 0 ? (
          <>
          <p className="text-sm">You currently have no orders. Click <span><a className="text-indigo-500 cursor-pointer font-bold" href="/products">here</a></span> to view our products.</p>
          </>
        ):(
      <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <th className="px-4 py-3">Order</th>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {orders.map((order, index) => (
                  <tr key={index} className="text-sm text-gray-800 hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium">
                      {order.id}
                      <div className="text-xs text-gray-500">{order.product}</div>
                    </td>
                    <td className="px-4 py-3">{new Date(order.date).toLocaleDateString()}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        order.status === "delivered" 
                          ? "bg-green-100 text-green-800" 
                          : "bg-blue-100 text-blue-800"
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-medium">£{order.total_price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
          
        </div>

        {/* Quick Access */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Quick Access</h3>
          
          <div className="grid grid-cols-2 gap-3">
          {quickLinks.map((link, index) => (
            <button 
              key={index}
              className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition cursor-pointer"
              onClick={() => {
                if (link.name === "Track Order") {
                  setTrackingModal(true);
                } else if (link.name === 'View Products') {
                  window.open('/products', '_blank');
                } else if (link.name === 'My Wishlist') {
                  setSection('Wishlist');
                 } else if (link.name === 'Special Offers') {
                    setShowSpecialOffers(true);
                  }
              }}
            >
      <div className="p-2 bg-white rounded-lg mb-2">
        {link.icon}
      </div>
      <span className="text-sm font-medium text-gray-700">{link.name}</span>
    </button>
  ))}
</div>

          
          {/* Help Section */}
          <div className="mt-6 bg-indigo-50 p-4 rounded-lg">
            <div className="flex items-start space-x-3">
              <div className="p-2 bg-indigo-100 rounded-lg">
                <Clock className="w-5 h-5 text-indigo-600" />
              </div>
              <div>
                <h4 className="font-medium text-gray-800">Need Help?</h4>
                <p className="text-sm text-gray-600 mt-1">Our support team is available 24/7</p>
                <button className="mt-2 text-sm font-medium text-indigo-600 hover:text-indigo-800 cursor-pointer">
                  Contact Support →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    </>
  );
};

export default UserDashboard;