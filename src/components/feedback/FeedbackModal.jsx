import { Fragment, useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Bell, User, MessageSquare, ExternalLink, HelpCircle, Phone, Mail, Star, Send } from "lucide-react";
import { Dialog, Transition } from "@headlessui/react";
import { createMessage } from "../routes/MessageRoutes";
import { toast } from "sonner";


const HelpCenterModal = ({ isOpen, setIsOpen }) => {
  const [activeTab, setActiveTab] = useState("feedback");
  const [formErrors, setFormErrors] = useState({});


  const [formData, setFormData] = useState({
    issue: '',
    rating: 5,
    feedback: ''
  })

  const handleSubmitFeedback = async (e) => {
    e.preventDefault();

    let errors = {};
    if (!formData.feedback.trim()) {
      errors.feedback = "Feedback cannot be empty.";
    }
  
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      setTimeout(() => {
        setFormErrors({})
      }, 3000);
      return;
    }


    try{
      const response = await createMessage(formData)
      toast.success('Message sent successfully.', {
        description: 'Thank you for reaching out! We will get back to you soon.',
      })
      setFormData({
        issue: '',
        rating: 5,
        feedback: ''
      })
      setIsOpen(false)

    }catch(e){
      console.log(e)
    }
    
  };

  const importantLinks = [
    { title: "Frequently Asked Questions", icon: <HelpCircle className="w-5 h-5" />, href: "/frequently-asked-questions" },
    { title: "Contact Support", icon: <Phone className="w-5 h-5" />, href: "/contact" },
    { title: "Email Us", icon: <Mail className="w-5 h-5" />, href: "mailto:support@example.com" },
    { title: "Terms of Service", icon: <ExternalLink className="w-5 h-5" />, href: "/terms-and-conditions" },
    { title: "Cookie Policy", icon: <ExternalLink className="w-5 h-5" />, href: "/cookies-policy" },
    { title: "Privacy Policy", icon: <ExternalLink className="w-5 h-5" />, href: "/privacy-policy" }
  ];

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={() => setIsOpen(false)}>
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
              <Dialog.Panel className="bg-white rounded-xl shadow-lg w-full max-w-md">
                {/* Header */}
                <div className="flex justify-between items-center p-5 border-b border-gray-200">
                  <Dialog.Title className="text-xl font-semibold text-gray-800">Help Center</Dialog.Title>
                  <button 
                    onClick={() => setIsOpen(false)}
                    className="p-1 rounded-full hover:bg-gray-100"
                  >
                    <XMarkIcon className="w-5 h-5 text-gray-500 cursor-pointer" />
                  </button>
                </div>

                {/* Tabs */}
                <div className="border-b border-gray-200">
                  <div className="flex">
                    <button
                      onClick={() => setActiveTab("feedback")}
                      className={`flex items-center px-5 py-3 text-sm font-medium transition border-b-2 cursor-pointer ${
                        activeTab === "feedback"
                          ? "border-indigo-600 text-indigo-600"
                          : "border-transparent text-gray-500 hover:text-gray-700"
                      }`}
                    >
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Feedback
                    </button>
                    
                    <button
                      onClick={() => setActiveTab("links")}
                      className={`flex items-center px-5 py-3 text-sm font-medium transition border-b-2 cursor-pointer ${
                        activeTab === "links"
                          ? "border-indigo-600 text-indigo-600"
                          : "border-transparent text-gray-500 hover:text-gray-700"
                      }`}
                    >
                      <Bell className="w-4 h-4 mr-2" />
                      Important Links
                    </button>
                  </div>
                </div>

                {/* Tab Content */}
                <div className="p-5">
                  {activeTab === "feedback" && (
                    <div>
                      <p className="text-gray-600 mb-4 text-sm">
                        We value your feedback! Please share your thoughts on our website to help us improve your browsing experience.
                      </p>
                      
                      <div>
                        {/* Feedback Type Selection */}
                        <div className="mb-4">
                          <label className="block text-sm font-medium text-gray-700 mb-1">Feedback Type</label>
                          <select 
                            className="w-full rounded-md border border-gray-300 py-2 px-3 text-sm"
                            value={formData.issue}
                            onChange={(e) => setFormData({ ...formData, issue: e.target.value})}
                          >
                            <option value="general">General Feedback</option>
                            <option value="usability">Website Usability</option>
                            <option value="performance">Website Performance</option>
                            <option value="feature">Feature Request</option>
                            <option value="bug">Bug Report</option>
                          </select>
                        </div>
                        
                        {/* Star Rating */}
                        <div className="mb-4">
                          <label className="block text-sm font-medium text-gray-700 mb-1">Rate Your Experience</label>
                          <div className="flex items-center">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <button
                                key={star}
                                type="button"
                                onClick={(e) => setFormData({ ...formData, rating: star })}
                                className="p-1 focus:outline-none cursor-pointer"
                              >
                                <Star 
                                  className={`w-6 h-6 ${
                                    star <= formData.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                                  }`} 
                                />
                              </button>
                            ))}
                          </div>
                        </div>
                        
                        {/* Feedback Text */}
                        <div className="mb-4">
                          <label className="block text-sm font-medium text-gray-700 mb-1">Your Feedback</label>
                          <textarea
  rows={4}
  className={`w-full rounded-md border py-2 px-3 text-sm resize-none ${
    formErrors.feedback ? 'border-red-500' : 'border-gray-300'
  }`}
  placeholder="Tell us what you think..."
  value={formData.feedback}
  onChange={(e) => setFormData({ ...formData, feedback: e.target.value })}
/>
{formErrors.feedback && (
  <p className="text-red-500 text-xs mt-1">{formErrors.feedback}</p>
)}

                        </div>
                        
                        {/* Submit Button */}
                        <div className="flex justify-end">
                          <button
                            onClick={handleSubmitFeedback}
                            className="flex items-center bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium cursor-pointer transition"
                          >
                            <Send className="w-4 h-4 mr-2" />
                            Submit Feedback
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {activeTab === "links" && (
                    <div>
                      <p className="text-gray-600 mb-4 text-sm">
                        Quick access to important resources and information about our website and services.
                      </p>
                      
                      <div className="grid grid-cols-1 gap-2">
                        {importantLinks.map((link, index) => (
                          <a
                            key={index}
                            href={link.href}
                            className="flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition"
                          >
                            <div className="flex items-center">
                              <div className="flex-shrink-0 mr-3 text-indigo-500">
                                {link.icon}
                              </div>
                              <div className="text-sm font-medium text-gray-800">
                                {link.title}
                              </div>
                            </div>
                            <div className="text-gray-400">
                              <ExternalLink className="w-4 h-4" />
                            </div>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Footer */}
                <div className="p-4 bg-gray-50 rounded-b-xl text-center text-xs text-gray-500">
                  Need immediate assistance? Contact our support team at support@example.com
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default HelpCenterModal;