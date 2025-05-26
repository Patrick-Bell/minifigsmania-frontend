import React, { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { toast } from "sonner";

const ResetPasswordModal = ({ isOpen, setIsOpen }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      toast.error("Email is required");
      return;
    }

    setLoading(true);

    try {
      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/forgot-password`, {
        email,
      });

      toast.success("Check your email!", {
        description: "If the address is valid, you'll receive a reset link shortly.",
      });

      setEmail("");
      setIsOpen(false);
    } catch (err) {
      toast.error(`Error sending password reset email`, {
        description: `${err.response.data.error}`,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={setIsOpen}>
        {/* Overlay */}
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
            <Dialog.Panel className="bg-white p-6 rounded-xl shadow-lg w-full max-w-sm">
              {/* Header */}
              <div className="flex justify-between items-center mb-4">
                <Dialog.Title className="text-lg font-medium text-gray-900">
                  Reset Password
                </Dialog.Title>
                <button onClick={() => setIsOpen(false)}>
                  <XMarkIcon className="w-5 text-gray-500 hover:text-gray-700" />
                </button>
              </div>

              <p className="text-sm text-gray-600 mb-4">
                Enter your email to receive a password reset link.
              </p>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="you@example.com"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-2 rounded-md text-white ${
                    loading ? "bg-indigo-400" : "bg-indigo-600 hover:bg-indigo-700"
                  }`}
                >
                  {loading ? "Sending..." : "Send Reset Link"}
                </button>
              </form>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
    </>
  );
};

export default ResetPasswordModal;
