import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  X,
  Calendar,
  Users,
  Award,
  ExternalLink,
  ShoppingBag,
  Star,
  Shield,
  Truck,
  ToyBrick,
  HelpingHand,
  Heart,
  MapPin,
  Mail,
  Instagram,
  Twitter,
  Youtube,
  Facebook,
  Package,
  Zap,
  Clock,
  Globe,
} from "lucide-react";
import Logo from '../assets/logo.png'
import { TbBrandEtsy, TbBrandTiktokFilled, TbBrandVinted, TbLegoFilled } from "react-icons/tb";


const AboutModal = ({ isOpen, setIsOpen }) => {

    const socialLinks = [
        {
          name: "eBay Store",
          url: "https://www.ebay.co.uk/usr/minifigsmania",
          icon: ShoppingBag,
          description: "Browse our full collection",
          color: "bg-[#e53238]",
        },
        {
          name: "Etsy Shop",
          url: "https://etsy.com/your-shop",
          icon: TbBrandEtsy,
          description: "Limited Selection",
          color: "bg-[#f56400]",
        },
        {
          name: "Instagram",
          url: "",
          icon: Instagram,
          description: "Coming Soon...",
          color: "bg-gradient-to-br from-[#f58529] via-[#dd2a7b] to-[#8134af]",
        },
        {
          name: "Vinted",
          url: "https://vinted.com/minifigsmania",
          icon: TbBrandVinted,
          description: "Limited Selection",
          color: "bg-[#00bfa6]",
        },
        {
          name: "TikTok",
          url: "https://tiktok.com/@minifigsmaniastore",
          icon: TbBrandTiktokFilled,
          description: "Follow us for fun content",
          color: "bg-[#010101]",
        },
        {
          name: "MinifigsMania Website",
          url: "/products",
          icon: TbLegoFilled,
          description: "Includes all products & website exclusives",
          color: "bg-indigo-600",
          },
      ];
      
  if (!isOpen) return null;

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={setIsOpen}>
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

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-2 sm:p-4 text-center">
            <Dialog.Panel className="relative w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all">
              <div className="relative bg-indigo-500 text-white p-4">
                <button
                  onClick={() => setIsOpen(false)}
                  className="absolute top-3 right-3 text-white/80 hover:text-white transition-colors p-1.5 hover:bg-white/10 rounded-full"
                >
                  <X size={16} />
                </button>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                    <img src={Logo} className="text-white rounded-md" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">MinifigsMania</h2>
                    <p className="text-white/80 text-xs">Our Social Medias</p>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-4 max-h-[70vh] overflow-y-auto">
                  <div className="space-y-4">
                    <div className="text-center mb-4">
                      <h3 className="text-lg font-bold text-gray-900 mb-1">Connect With Us</h3>
                      <p className="text-xs text-gray-600">Follow us across all platforms for the latest updates</p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                      {socialLinks.map((link, index) => (
                        <a
                          key={index}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg duration-200 hover:border-gray-300"
                        >
                          <div className="flex items-center space-x-3">
                            <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${link.color} flex items-center justify-center`}>
                              <link.icon className="text-white" size={14} />
                            </div>
                            <div>
                              <div className="font-semibold text-sm text-gray-900">{link.name}</div>
                              <div className="text-xs text-gray-600">{link.description}</div>
                            </div>
                          </div>
                          <ExternalLink className="text-gray-400 group-hover:text-gray-600 transition-colors" size={14} />
                        </a>
                      ))}
                    </div>

                   
                  </div>
                </div>

              <div className="bg-gradient-to-r from-gray-50 to-indigo-50 px-4 py-3 border-t border-gray-200">
                <div className="flex items-center justify-center space-x-2">
                  <span className="text-xs text-gray-700">Thank you for being part of our community!</span>
                  <Heart className="text-red-500" size={12} />
                </div>
              </div>
            </Dialog.Panel>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default AboutModal;
