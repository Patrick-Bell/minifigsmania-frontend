import { useEffect, useState } from "react";
import axios from "axios";
import { AiOutlineProduct } from "react-icons/ai";
import { CiCalendarDate } from "react-icons/ci";
import { TbShoppingCartCancel, TbLego } from "react-icons/tb";
import { GrPrint, GrUpdate } from "react-icons/gr";
import { FaRegFilePdf } from "react-icons/fa6";
import { PaperClipIcon } from '@heroicons/react/20/solid'
import { PDFDownloadLink } from "@react-pdf/renderer";
import AdminOrderPDF from "./AdminOrderPDF";



const AdminUsers = () => {


    const [users, setUsers] = useState([])
    const [selectedUser, setSelectedUser] = useState(null)

    const fetchUsers = async () => {
        try{
            const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/users`)
            setUsers(response.data)
            console.log(response.data)
        }catch(e){
            console.log(e)
        }
    }

    useEffect(() => {
        fetchUsers()
    }, [])

    const totalUsers = users?.length

    const handleSelectedUser = async (id) => {
        try{
            const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/users/${id}`)
            setSelectedUser(response.data)
            console.log(response.data, 'selected user')
        }catch(e){
            console.log(e)
        }
    }

   
    return (

        <>
        <div className="p-6 bg-white rounded-lg border border-[#e9ebee]">

            {selectedUser ? (
                <>
                <div className="flex justify-between items-middle">
                <span className="text-indigo-600 font-bold text-2xl"></span>
                <div className="flex gap-2">
                <button className="px-4 py-2 rounded-md border mb-4 border-[#e9ebee] hover:bg-gray-50 cursor-pointer"><GrPrint /></button>
                <button className="px-4 py-2 rounded-md border mb-4 border-[#e9ebee] hover:bg-gray-50 cursor-pointer"><FaRegFilePdf /></button>
                <button onClick={() => setSelectedUser(null)} className="px-4 py-2 rounded-md border mb-4 border-[#e9ebee] hover:bg-gray-50 cursor-pointer">Back</button>
                </div>
                </div>   

                <div className="px-4 sm:px-0">
        <h3 className="text-base/7 font-semibold text-gray-900">User Information</h3>
        <p className="mt-1 max-w-2xl text-sm/6 text-gray-500">Review data on User, Orders & Reviews. </p>
      </div>
      <div className="mt-6 border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-gray-900">Name</dt>
            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">Need to add this to schema.</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-gray-900">Email</dt>
            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{selectedUser?.email}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-gray-900">Member since</dt>
            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{new Date(selectedUser?.created_at).toLocaleDateString('en-GB')}</dd>
          </div>
   
        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-gray-900">Orders</dt>
            <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              <ul role="list" className="divide-y divide-gray-100 rounded-md border border-gray-200">
              {selectedUser?.orders?.map((order, i) => (
                <li className="flex items-center justify-between py-4 pr-5 pl-4 text-sm/6">
                  <div className="flex w-0 flex-1 items-center">
                    <PaperClipIcon aria-hidden="true" className="size-5 shrink-0 text-gray-400" />
                    <div className="ml-4 flex min-w-0 flex-1 gap-2">
                      <span className="truncate font-medium">order_{i + 1}_{new Date(order.created_at).toLocaleDateString('en-GB')}.pdf</span>
                    </div>
                  </div>
                  <div className="ml-4 shrink-0">
                  <PDFDownloadLink document={<AdminOrderPDF order={order} />} fileName="invoice.pdf">
                    {({ loading }) => (
                      <button className="px-4 py-2 font-sm transition text-indigo-500 hover:text-indigo-700 cursor-pointer">Download
                      </button>
                    )}
                  </PDFDownloadLink>
                  </div>
                </li>
              ))}
              </ul>
            </dd>
          </div>
        </dl>
        
        <div className="ml-4">
   
  </div>


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
                        <h3 className="text-sm font-semibold text-gray-600">Total Users</h3>
                        <p className="text-2xl font-bold text-gray-900">{totalUsers}</p>
                    </div>
                </div>

                <div className="p-4 rounded-lg border border-[#e9ebee] flex items-center gap-4 bg-white">
                    <div className="p-3 rounded-md bg-[#e9ebee]">
                        <CiCalendarDate className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-gray-600">Recent Users</h3>
                        <p className="text-2xl font-bold text-gray-900">2</p>
                    </div>
                </div>

                <div className="p-4 rounded-lg border border-[#e9ebee] flex items-center gap-4 bg-white">
                    <div className="p-3 rounded-md bg-[#e9ebee]">
                        <TbShoppingCartCancel className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-gray-600">Google Users</h3>
                        <p className="text-2xl font-bold text-gray-900"></p>
                    </div>
                </div>

                <div className="p-4 rounded-lg border border-[#e9ebee] flex items-center gap-4 bg-white">
                    <div className="p-3 rounded-md bg-[#e9ebee]">
                        <TbLego className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-gray-600">Pending Reviews</h3>
                        <p className="text-2xl font-bold text-gray-900"></p>
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
                            <th className="px-6 py-3 border-b border-[#e9ebee]">User Id</th>
                            <th className="px-6 py-3 border-b border-[#e9ebee]">Email</th>
                            <th className="px-6 py-3 border-b border-[#e9ebee]">Joined</th>
                            <th className="px-6 py-3 border-b border-[#e9ebee]">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                    {users.map((user, i) => (
                            <tr key={i} className="hover:bg-gray-50 transition">
                                <td className="px-6 py-4 border-b border-[#e9ebee]">{user?.id}</td>
                                <td className="px-6 py-4 border-b border-[#e9ebee]">{user?.email}</td>
                                <td className="px-6 py-4 border-b border-[#e9ebee]">{new Date(user?.created_at).toLocaleString('en-GB')}</td>
                                <td className="px-6 py-4 border-b border-[#e9ebee]">
                                    <span onClick={() => handleSelectedUser(user?.id)} className="text-indigo-600 cursor-pointer hover:text-indigo-700">
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

export default AdminUsers