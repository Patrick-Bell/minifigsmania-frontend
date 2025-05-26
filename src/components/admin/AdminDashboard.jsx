import React, { useEffect, useState } from "react";
import axios from "axios";
import { AiOutlineProduct } from "react-icons/ai";
import { CiCalendarDate } from "react-icons/ci";
import { TbShoppingCartCancel } from "react-icons/tb";
import { TbLego } from "react-icons/tb";
import { PaperClipIcon } from '@heroicons/react/20/solid'
import { PDFDownloadLink } from "@react-pdf/renderer";
import AdminLowStockReport from "./reports/AdminLowStockReport";
import { getOrders } from "../routes/OrderRoutes";
import { getProducts } from "../routes/ProductRoutes";
import LowStockReport from "./reports/LowStockReport";
import CurrentMonthOrder from "./reports/CurrentMonthOrder";


const AdminDashboard = () => {

    const [orders, setOrders] = useState([])
    const [products, setProducts] = useState([])
    const [buyValue, setBuyValue] = useState(4.99)
    const [lowStock, setLowStock] = useState([])
    const [monthOrders, setMonthOrders] = useState([])

    const fetchData = async () => {
        try {
           
            const orderRes = await getOrders()
            const productRes = await getProducts()

            const lowStockProducts = productRes.filter(product => product.stock <= 5)
            setLowStock(lowStockProducts)

            // filter orders for current month
            const currentDate = new Date();
            const currentMnoth = currentDate.getMonth()
            const currentYear = currentDate.getFullYear()
            const currentMonthOrders = orderRes.filter(order => {
              const orderDate = new Date(order.created_at);
              return orderDate.getMonth() === currentMnoth && orderDate.getFullYear() === currentYear;
            })

            console.log(currentMonthOrders, 'current month orders')


            setOrders(orderRes)
            setProducts(productRes)
            setMonthOrders(currentMonthOrders)
    
        } catch (e) {
            console.error('Error fetching data:', e);
        }
    };

    useEffect(() => {
        fetchData()
    }, [])

    const numberOfProducts = products.length
    const ordersValue = orders?.reduce(
        (sum, order) => sum + order.line_items?.reduce(
            (orderSum, item) => orderSum + (item.quantity * item.price), 0
        ) || 0, 
        0
    ).toFixed(2);
    const inventoryStock = products.reduce((sum, item) => sum + item.stock * item.price, 0).toFixed(2)

    const getStatusCounts = (orders) => {
        return orders.reduce((acc, order) => {
          const status = order.status || "Pending"; // Default to "Pending" if status is missing
          acc[status] = (acc[status] || 0) + 1;
          return acc;
        }, {});
      };
      
      const statusCounts = getStatusCounts(orders);

      const findPopularProducts = (orders) => {
        const productCounts = {};
      
        orders.forEach(order => {
          order?.line_items.forEach(product => {
            if (productCounts[product.name]) {
              productCounts[product.name].quantity += product.quantity;
            } else {
              productCounts[product.name] = {
                name: product.name,
                image: product.image,
                quantity: product.quantity
              };
            }
          });
        });
      
        // Convert object to array and sort by quantity (highest first)
        return Object.values(productCounts).sort((a, b) => b.quantity - a.quantity);
      };
      
      // Example usage
      const popularProducts = findPopularProducts(orders);
      console.log(popularProducts);

      

    return (

        <>
            <div className="p-6 bg-white rounded-lg border border-[#e9ebee]">

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <div className="p-4 rounded-lg border border-[#e9ebee] flex items-center gap-4 bg-white">
        <div className="p-3 rounded-md bg-[#e9ebee]">
            <AiOutlineProduct className="w-6 h-6" />
        </div>
        <div>
            <h3 className="text-sm font-semibold text-gray-600">Total Stock Revenue</h3>
            <p className="text-2xl font-bold text-gray-900">£{inventoryStock}</p>
        </div>
        </div>

        <div className="p-4 rounded-lg border border-[#e9ebee] flex items-center gap-4 bg-white">
        <div className="p-3 rounded-md bg-[#e9ebee]">
            <CiCalendarDate className="w-6 h-6" />
        </div>
        <div>
            <h3 className="text-sm font-semibold text-gray-600">Total Orders</h3>
            <p className="text-2xl font-bold text-gray-900">{orders.length}</p>
        </div>
        </div>

        <div className="p-4 rounded-lg border border-[#e9ebee] flex items-center gap-4 bg-white">
        <div className="p-3 rounded-md bg-[#e9ebee]">
            <TbShoppingCartCancel className="w-6 h-6" />
        </div>
        <div>
            <h3 className="text-sm font-semibold text-gray-600">Total Sales (£)</h3>
            <p className="text-2xl font-bold text-gray-900">£{ordersValue}</p>
        </div>
        </div>

        <div className="p-4 rounded-lg border border-[#e9ebee] flex items-center gap-4 bg-white">
        <div className="p-3 rounded-md bg-[#e9ebee]">
            <TbLego className="w-6 h-6" />
        </div>
        <div>
            <h3 className="text-sm font-semibold text-gray-600">Total Products</h3>
            <p className="text-2xl font-bold text-gray-900">{numberOfProducts}</p>
        </div>
        </div>
      </div>

      <div class="grid grid-cols-2 grid-rows-2 gap-4">
  <div class="p-4 border border-[#e9ebee]">
    <p className="py-2 font-bold">Shipping Status</p>
    <table className="w-full border-collapse bg-white text-left text-sm text-gray-700">
    <thead className="bg-gray-100 text-gray-600 uppercase text-xs font-semibold">
    <tr className="bg-gray-100 text-gray-700">
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Status
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Quantity
                </th>
              </tr>
            </thead>
            <tbody>
            {Object.entries(statusCounts).map(([status, count]) => (
        <tr key={status} className="hover:bg-gray-50 transition">
        <td className="px-6 py-2 border-b border-[#e9ebee]">{status}</td>
        <td className="px-6 py-2 border-b border-[#e9ebee]">{count} <span className="text-xs">({((count / orders.length) * 100).toFixed(2) }%)</span></td>
      </tr>
    ))}
            </tbody>
          </table>
  </div>


  <div className="p-4 border border-[#e9ebee]">
  <p className="py-2 font-bold">Popular Products</p>
  {/* Wrap table in a div for scroll functionality */}
  <div className="overflow-x-auto max-h-[200px] overflow-y-auto">
    <table className="w-full border-collapse bg-white text-left text-sm text-gray-700">
    <thead className="bg-gray-100 text-gray-600 uppercase text-xs font-semibold sticky top-0 z-10">
    <tr>
          <th className="border border-gray-300 px-4 py-2">Product</th>
          <th className="border border-gray-300 px-4 py-2">Quantity Sold</th>
        </tr>
      </thead>
      <tbody>
        {popularProducts.map((product, index) => (
          <tr key={index} className="hover:bg-gray-50 transition">
            <td className="px-6 py-2 border-b border-[#e9ebee] flex items-center space-x-3">
              <img src={product.image} alt={product.name} className="w-10 h-10 rounded" />
              <span>{product.name}</span>
            </td>
            <td className="px-6 py-2 border-b border-[#e9ebee]">{product.quantity}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>





<div className="p-4 border border-[#e9ebee]">
      <p className="text-sm font-bold">Quick Actions</p>
      <p className="text-xs mt-1 text-gray-400 mb-2">Perform quick actions</p>

      <div className="border-t border-[#e9ebee] flex justify-between items-center p-2">
        <p className="text-xs">Low Stock Report</p>
        <PDFDownloadLink document={<LowStockReport lowStockItems={lowStock} />} fileName="lowstock.pdf">
                      <button className="text-xs transition text-indigo-500 hover:text-indigo-700 cursor-pointer flex items-center">Download
                      <PaperClipIcon className="w-3 h-3 text-gray-600 ml-2" />
                      </button>
          </PDFDownloadLink>
      </div>

      <div className="border-t border-[#e9ebee] flex justify-between items-center p-2">
        <p className="text-xs">Sales Report</p>
        <div className="flex items-center cursor-pointer">
          <p className="mr-2 text-indigo-500 hover:text-indigo-600 text-xs">Download</p>
          <PaperClipIcon className="w-3 h-3 text-gray-600" />
        </div>
      </div>

      <div className="border-t border-[#e9ebee] flex justify-between items-center p-2">
        <p className="text-xs">Month Order Report</p>
        <div className="flex items-center cursor-pointer">
          <PDFDownloadLink document={<CurrentMonthOrder orders={monthOrders} />} fileName="mothlyorderreport.pdf">
                      <button className="text-xs transition text-indigo-500 hover:text-indigo-700 cursor-pointer flex items-center">Download
                      <PaperClipIcon className="w-3 h-3 text-gray-600 ml-2" />
                      </button>
          </PDFDownloadLink>
        </div>
      </div>

      <div className="border-t border-[#e9ebee] flex justify-between items-center p-2">
        <p className="text-xs">Users Report</p>
        <div className="flex items-center cursor-pointer">
          <p className="mr-2 text-indigo-500 hover:text-indigo-600 text-xs">Download</p>
          <PaperClipIcon className="w-3 h-3 text-gray-600" />
        </div>
      </div>

      <div className="border-t border-[#e9ebee] flex justify-between items-center p-2">
        <p className="text-xs">Low Stock Report</p>
        <div className="flex items-center cursor-pointer">
          <p className="mr-2 text-indigo-500 hover:text-indigo-600 text-xs">Download</p>
          <PaperClipIcon className="w-3 h-3 text-gray-600" />
        </div>
      </div>
    </div>

  </div>



      </div>
        </>
    )
}

export default AdminDashboard