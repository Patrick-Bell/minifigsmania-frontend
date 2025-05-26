import React from 'react';
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { toast, Toaster } from 'sonner'
import { useAuth } from '../context/AuthContext';

const Register = ({ isOpen, setIsOpen, setOpenLogin }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const [errors, setErrors] = useState({});

  const { signup } = useAuth()

  const handleOpenLogin = () => {
    setIsOpen(false);
    setOpenLogin(true);
  };

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Validate Form
  const validate = () => {
    let tempErrors = {};

    if (!formData.name.trim()) tempErrors.name = "Name is required";
    if (!formData.email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/))
      tempErrors.email = "Invalid email address";
    if (formData.password.length < 6)
      tempErrors.password = "Password must be at least 6 characters";
    if (formData.password !== formData.password_confirmation)
      tempErrors.password_confirmation = "Passwords do not match";

    setTimeout(() => {
        setErrors({})
    }, 3000);

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!validate()) return;
  
    try {

      const response = await signup(formData);
    
      console.log("Signup Success:", response.data);
    
      // only close the modal and open login if signup actually worked
      setIsOpen(false);
      setOpenLogin(true);
      
    } catch (error) {
      const tempErrors = {};

      if(error.response.data.error.includes('Email')){
        toast.error(error.response.data.error, {
          description: 'A user with this email alreadt exists. If you have forgotten your password, please reset it.',
        });
        tempErrors.email = error.response.data.error;
      }

      setErrors(tempErrors);
      
  } 
}
  
  



  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={setIsOpen}>
        {/* Background Overlay */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/50" />
        </Transition.Child>


        {/* Modal Container */}
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="bg-white p-6 rounded-xl shadow-lg w-96">
              {/* Header */}
              <div className="flex justify-between items-center">
                <Dialog.Title className="text-xl font-semibold text-gray-800">
                  Sign up
                </Dialog.Title>
                <button onClick={() => setIsOpen(false)}>
                  <XMarkIcon className="w-5 text-gray-500 hover:text-gray-700 cursor-pointer" />
                </button>
              </div>

              <p className="text-gray-500 text-sm mb-4">
                Enter your details to register
              </p>

              {/* Form */}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="block text-gray-700 text-sm">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                      errors.name ? "border-red-500 focus:ring-red-500" : "focus:ring-indigo-500"
                    }`}
                  />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>

                <div className="mb-3">
                  <label className="block text-gray-700 text-sm">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                      errors.email ? "border-red-500 focus:ring-red-500" : "focus:ring-indigo-500"
                    }`}
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>

                <div className="mb-3">
                  <label className="block text-gray-700 text-sm">Password</label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                      errors.password ? "border-red-500 focus:ring-red-500" : "focus:ring-indigo-500"
                    }`}
                  />
                  {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                </div>

                <div className="mb-3">
                  <label className="block text-gray-700 text-sm">Confirm Password</label>
                  <input
                    type="password"
                    name="password_confirmation"
                    value={formData.password_confirmation}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                      errors.password_confirmation ? "border-red-500 focus:ring-red-500" : "focus:ring-indigo-500"
                    }`}
                  />
                  {errors.password_confirmation && (
                    <p className="text-red-500 text-xs mt-1">{errors.password_confirmation}</p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full bg-indigo-600 text-white py-2 rounded-lg mt-2 hover:bg-indigo-700 cursor-pointer disabled:opacity-50"
                  disabled={Object.keys(errors).length > 0}
                >
                  Register
                </button>
                <button
                  className="w-full mt-2 px-4 py-2 border rounded-lg flex justify-center gap-2 hover:bg-gray-100 cursor-pointer"
                >
                  <img
                    className="w-6 h-6"
                    src="https://www.svgrepo.com/show/475656/google-color.svg"
                    loading="lazy"
                    alt="google logo"
                  />
                  <span>Continue with Google</span>
                </button>
              </form>

              {/* Divider */}
              <div className="flex items-center my-4">
                <div className="h-px flex-1 bg-gray-300"></div>
                <span className="mx-3 text-gray-500 text-sm">or</span>
                <div className="h-px flex-1 bg-gray-300"></div>
              </div>

              {/* Sign Up Button */}
              <button
                onClick={() => handleOpenLogin()}
                className="w-full border py-2 rounded-lg text-gray-700 hover:bg-gray-100 cursor-pointer"
              >
                Log In
              </button>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Register;
