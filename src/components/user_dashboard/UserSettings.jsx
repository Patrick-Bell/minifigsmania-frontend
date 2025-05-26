import React, { useState } from "react";
import { Bell, User, Lock, Save } from "lucide-react";
import { Switch } from "@headlessui/react";
import NotificationToggle from "./NotificationToggle";
import axios from 'axios';
import { toast } from 'sonner'
import { useAuth } from '../context/AuthContext'

const UserSettingsBasic = () => {
  const { user, checkAuth } = useAuth()
  // State for form values
  const [personalInfo, setPersonalInfo] = useState({
    name: user?.user.name,
    email: user?.user.email,
    phone_number: user?.user.phone_number
  });

  const [password, setPassword] = useState({
    current: "",
    new: "",
    confirm: ""
  });

  const [notifications, setNotifications] = useState({
    order_notifications: user?.user.order_notifications,
    promotion_notifications: user?.user.promotion_notifications,
    new_product_notifications: user?.user.new_product_notifications,
    newsletter_notifications: user?.user.newsletter_notifications
  });

  const [activeTab, setActiveTab] = useState("personal");

  // Handle personal info form changes
  const handlePersonalInfoChange = (e) => {
    const { name, value } = e.target;
    setPersonalInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle password form changes
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPassword(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNotificationToggle = async (setting, label) => {
    try {
      // Prepare data to send to the backend: toggle the specific setting
      const updatedNotifications = {
        ...notifications,
        [setting]: !notifications[setting], // Toggle the specific setting
      };
  
      // Send the update to the backend
      const response = await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/api/update-user`,
        { user: updatedNotifications },
        { withCredentials: true }
      );
      console.log(response.data);
  
      // Update the local state with the response data
      setNotifications({
        order_notifications: response.data.order_notifications,
        promotion_notifications: response.data.promotion_notifications,
        new_product_notifications: response.data.new_product_notifications,
        newsletter_notifications: response.data.newsletter_notifications,
      });
  
      // Optionally call checkAuth to update the user state after change
      await checkAuth();
  
      // Show success toast
      toast.success(`Notification preferences updated`, {
        description: `You have successfully updated your ${label} preference.`,
      });
  
    } catch (e) {
      console.log(e);
      // Show error toast
      toast.error('Error updating notification preferences', {
        description: 'Please try again later.',
      });
    }
  };
  
  

  // Mock submit function
  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    console.log(password)
    try {
      const response = await axios.put(`${import.meta.env.VITE_API_BASE_URL}/api/reset-password`, { password }, { withCredentials: true })
      console.log(response.data)
      toast.success('Password Changed Successfully', {
        description: 'You have successfully changed your password.'
      })
      setPassword({
        current: "",
        new: "",
        confirm: ""
      })
    }catch(e){
      console.log(e)
      toast.error('Error updating password', {
        description: e.response.data.error
      })
    }
    
  };

  const handlePersonalSubmit = async (e) => {
    e.preventDefault()

    try{
      const response = await axios.put(`${import.meta.env.VITE_API_BASE_URL}/api/update-user`, { user: personalInfo }, { withCredentials: true })
      toast.success('Personal Information Updated', {
        description: 'Your personal information has been updated successfully.'
      })
      setPersonalInfo({
        name: response.data.name,
        email: response.data.email,
        phone_number: response.data.phone_number
      })
      await checkAuth()

      console.log(response.data, 'response data')
      console.log(user)

    }catch(e){
      console.log(e)
      toast.error('Error updating personal information', {
        description: e.response.data.error
      }
      )
    }
  }


  return (
    <div className="bg-white rounded-xl border border-gray-200">
      {/* Tabs */}
      <div className="border-b border-gray-200">
        <div className="flex">
          <button
            onClick={() => setActiveTab("personal")}
            className={`flex items-center px-6 py-4 text-sm font-medium transition border-b-2 cursor-pointer ${
              activeTab === "personal"
                ? "border-indigo-600 text-indigo-600"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            <User className="w-4 h-4 mr-2" />
            Personal Info
          </button>
          
          <button
            onClick={() => setActiveTab("notifications")}
            className={`flex items-center px-6 py-4 text-sm font-medium transition border-b-2 cursor-pointer ${
              activeTab === "notifications"
                ? "border-indigo-600 text-indigo-600"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            <Bell className="w-4 h-4 mr-2" />
            Notifications
          </button>
          
          <button
            onClick={() => setActiveTab("password")}
            className={`flex items-center px-6 py-4 text-sm font-medium transition border-b-2 cursor-pointer ${
              activeTab === "password"
                ? "border-indigo-600 text-indigo-600"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            <Lock className="w-4 h-4 mr-2" />
            Password
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-6">
        {/* Personal Info Tab */}
        {activeTab === "personal" && (
          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-6">Personal Information</h3>
            
            <form onSubmit={handlePersonalSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={personalInfo.name}
                    onChange={handlePersonalInfoChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                </div>
              
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={personalInfo.email}
                    onChange={handlePersonalInfoChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 hover:cursor-not-allowed"
                    disabled
                  />
                </div>
                
                <div>
                  <label htmlFor="phone_number" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone_number"
                    name="phone_number"
                    value={personalInfo.phone_number}
                    onChange={handlePersonalInfoChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>
              
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="cursor-pointer px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 flex items-center"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        )}
        

        {/* Notifications Tab */}
        {activeTab === "notifications" && (
          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-6">Notification Preferences</h3>
            
            <div className="space-y-6">
              <div className="space-y-4">
                {[
                  { id: "order_notifications", label: "Order Updates", description: "Get notified about order status changes. You WILL receive an email confirmation on every order you make for proof of purchase." },
                  { id: "promotion_notifications", label: "Promotions & Discounts", description: "Receive exclusive offers and discounts" },
                  { id: "new_product_notifications", label: "New Product Arrivals", description: "Be the first to know about new products" },
                  { id: "newsletter_notifications", label: "Newsletter", description: "Receive our monthly newsletter" }
                ].map((item) => (
                  <div key={item.id} className="flex items-center justify-between border-b border-gray-100 pb-4">
                    <div>
                      <p className="text-sm font-medium text-gray-800">{item.label}</p>
                      <p className="text-xs text-gray-500">{item.description}</p>
                    </div>
                    <NotificationToggle
                        enabled={notifications[item.id]}
                        onChange={() => handleNotificationToggle(item.id, item.label)}
                      />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Password Tab */}
        {activeTab === "password" && (
          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-6">Change Password</h3>
            
            <form onSubmit={handlePasswordSubmit}>
              <div className="space-y-4">
                <div>
                  <label htmlFor="current" className="block text-sm font-medium text-gray-700 mb-1">
                    Current Password
                  </label>
                  <input
                    type="password"
                    id="current"
                    name="current"
                    value={password.current}
                    onChange={handlePasswordChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="new" className="block text-sm font-medium text-gray-700 mb-1">
                    New Password
                  </label>
                  <input
                    type="password"
                    id="new"
                    name="new"
                    value={password.new}
                    onChange={handlePasswordChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Password must be at least 8 characters with letters and numbers
                  </p>
                </div>
                
                <div>
                  <label htmlFor="confirm" className="block text-sm font-medium text-gray-700 mb-1">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    id="confirm"
                    name="confirm"
                    value={password.confirm}
                    onChange={handlePasswordChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                </div>
              </div>
              
              <div className="mt-6">
                <button
                  type="submit"
                  className="cursor-pointer px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 flex items-center"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Update Password
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserSettingsBasic;