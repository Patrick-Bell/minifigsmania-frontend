import React, { useState } from "react";
import {
  Menu,
  X,
  Home,
  Settings,
  User,
  Calendar,
  ToyBrick,
  PiggyBank,
  Star,
  HelpCircle,
  Heart,
  ShoppingBag,
  ShoppingBagIcon,
  LogOut,
  LogOutIcon
} from "lucide-react";
import UserOrders from "./UserOrders";
import SidebarItem from "../admin/SidebarItem";
import UserReviews from "./User_Reviews";
import UserDashboard from "./UserDashboard";
import UserSettings from './UserSettings'
import HelpCenter from "./HelpCenter";
import Wishlist from "./Wishlist";
import UserAddress from "./UserAddress";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import TrackOrder from "./TrackOrder";
import UserCart from "./UserCart";
import qrCode from '../assets/barcode.png'

const Sidebar = () => {
  const { cart } = useCart()
  const { logout } = useAuth()
  const [isOpen, setIsOpen] = useState(false);
  const [section, setSection] = useState("Dashboard");

  const renderSection = (section) => {
    switch (section) {
      case "Orders":
        return <UserOrders />;
      case "Reviews":
        return <UserReviews />;
      case 'Dashboard':
        return <UserDashboard setSection={setSection} />
      case 'Help':
        return <HelpCenter />
      case 'Address':
        return <UserAddress />
      case 'Settings':
        return <UserSettings />
      case 'Wishlist':
        return <Wishlist />
      case 'Cart':
        return <UserCart />
      default:
        return <div>Welcome to your dashboard!</div>;
    }
  };

  const navMenu = [
    { id: 1, section: "Dashboard", icon: <Home className="w-5 h-5" /> },
    { id: 8, section: "Cart", icon: <ShoppingBagIcon className="w-5 h-5" /> },
    { id: 2, section: "Orders", icon: <ToyBrick className="w-5 h-5" /> },
    { id: 3, section: "Reviews", icon: <Star className="w-5 h-5" /> },
    { id: 4, section: "Address", icon: <PiggyBank className="w-5 h-5" /> },
    { id: 7, section: "Wishlist", icon: <Heart className="w-5 h-5" /> },
    { id: 5, section: "Help", icon: <HelpCircle className="w-5 h-5" /> },
    { id: 6, section: "Settings", icon: <Settings className="w-5 h-5" /> },
  ];

  return (
    <>

    <div className="flex">
      {/* Sidebar */}
      <div
  className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 p-5 flex flex-col h-full transform ${
    isOpen ? "translate-x-0" : "-translate-x-64"
  } transition-transform md:translate-x-0 md:w-64`}
>
  {/* Header */}
  <div className="flex justify-between items-center mb-8">
    <h2 className="text-2xl font-bold text-indigo-600">My Account</h2>
    <button className="md:hidden" onClick={() => setIsOpen(false)}>
      <X className="w-6 h-6 text-gray-600" />
    </button>
  </div>

  {/* Navigation */}
  <div className="flex-1 overflow-y-auto">
    <nav className="flex flex-col space-y-1">
      {navMenu.map((nav) => (
        <button
          key={nav.id}
          onClick={() => setSection(nav.section)}
          className={`flex cursor-pointer items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition ${
            section === nav.section
              ? "bg-indigo-100 text-indigo-600"
              : "text-gray-700 hover:bg-gray-100"
          }`}
        >
          {nav.icon}
          {nav.section}
          {nav.section === 'Cart' && (
            <span className="ml-auto bg-indigo-600 text-white rounded-lg px-2 py-1 text-xs">
              {cart.length}
            </span>
          )}
        </button>
      ))}
    </nav>
  </div>


  <div className="pt-6">
    <div className="block items-center rounded-lg text-sm font-medium border-gray-200 border">
      <img src={qrCode} alt="Logo" className="w-auto h-auto rounded-lg" />
      <p className="text-center font-bold">Scan me to open on mobile.</p>
    </div>
    
  </div>
  {/* Logout Button at the very bottom */}
  <div className="pt-6">
    <button
      className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition w-full cursor-pointer"
      onClick={() => logout()}
    >
      <LogOut className="w-5 h-5" />
      Logout
    </button>
  </div>
</div>


      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-opacity-30 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 md:ml-64 min-h-screen bg-[#f9fafb]">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white md:hidden">
          <button onClick={() => setIsOpen(true)}>
            <Menu className="w-6 h-6 text-gray-700" />
          </button>
          <p className="text-lg font-bold text-gray-800">{section}</p>
        </div>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="flex justify-between items-center mb-6">
            <p className="text-2xl font-bold text-gray-800">{section}</p>
            <p className="text-gray-500">
              Home <span className="mx-2">/</span> {section}
            </p>
          </div>

          <div className="mt-4">{renderSection(section)}</div>
        </main>
      </div>
    </div>

    </>
  );
};

export default Sidebar;
