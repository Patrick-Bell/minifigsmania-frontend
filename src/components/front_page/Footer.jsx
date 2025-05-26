import React, { useState } from 'react';
import { payment } from '../api/Payment';
import Logo from '../assets/logo.png'
import { subscribeNewsletter } from '../routes/NewsletterRoutes';
import { toast } from 'sonner'
import { ArrowUpIcon, BuildingStorefrontIcon, DevicePhoneMobileIcon } from '@heroicons/react/20/solid'
import { FaTiktok } from "react-icons/fa";
import { TbLego } from "react-icons/tb";
import MobileModal from './MobileModal';



const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)

  const createNewsletter = async (e) => {
    e.preventDefault()

    if(!email){
      toast.error('Please enter a valid email address.')
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      toast.error('Please enter a valid email address.');
      return;
    }

    setLoading(true)
    try{
      await subscribeNewsletter(email)
      toast.success('You have successfully subscribed to our newsletter')
      setEmail('')
      setLoading(false)
    }catch(e){
      console.log(e)
    }
  }

  const platforms = [
    { name: 'eBay', icon: <BuildingStorefrontIcon className='text-white h-5 w-5' /> },
    { name: 'Mobile', icon: <DevicePhoneMobileIcon className='text-white h-5 w-5' /> }, // replace with real URL and icon
    { name: 'TikTok', icon: <FaTiktok className='text-white h-5 w-5' /> },
    { name: 'Products', icon: <TbLego className='text-white h-5 w-5' /> }
  ];

  const handleClick = (name) => {
    switch (name) {
      case 'eBay':
        window.open('https://www.ebay.co.uk/usr/minifigsmania', '_blank');
        break;
      case 'Mobile':
        setOpen(true)
        break;
      case 'TikTok':
        window.open('https://www.tiktok.com/@minifigsmania', '_blank');
        break;
      case 'Products':
        window.open('/products', '_blank');
        break;
      default:
        break;
    }
  }

  return (
    <>
    <MobileModal isOpen={open} setIsOpen={setOpen} />
    <footer className="bg-gray-600 text-gray-200 py-12">
      <div className="container mx-auto px-4">
        {/* Newsletter Subscription */}
        <div className="bg-gray-800 rounded-xl p-8 mb-12 shadow-lg">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="mb-4 md:mb-0">
              <h3 className="text-xl font-bold text-white">Join our newsletter</h3>
              <p className="text-gray-300 mt-2">Stay updated with new releases and exclusive offers</p>
            </div>
            <div className="w-full md:w-2/5">
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="px-4 py-3 rounded-l-lg w-full focus:outline-none text-gray-800 bg-white" 
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
                <button 
                  type="submit" 
                  className="bg-indigo-600 hover:bg-indigo-700 px-6 rounded-r-lg font-medium transition-colors cursor-pointer"
                  onClick={(e) => createNewsletter(e)}
                  disabled={loading}
                >
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Logo and company description */}
          <div className="lg:col-span-1">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center mr-3">
                <span className="text-white font-bold text-xl">
                  <img onClick={() => window.open('/')} className='rounded-md cursor-pointer' src={Logo} alt="MinifigsMania Logo" />
                </span>
              </div>
              <span className="text-xl font-bold text-white">MinifigsMania</span>
            </div>
            <p className="text-gray-400 mb-6">Your premier destination for collectible minifigures from all your favorite franchises. Join our community now!</p>
            
            {/* Social Media Links */}
            <div className="flex space-x-4">
            {platforms.map(({ name, icon }) => (
              <p
                key={name}
                onClick={() => handleClick(name)}
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-indigo-600 transition-colors cursor-pointer"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={name}
              >
                <span className="text-lg">{icon}</span>
              </p>
            ))}
          </div>
          </div>

          {/* Categories */}
          <div className="lg:col-span-1">
            <h6 className="text-lg font-semibold text-white mb-6">Categories</h6>
            <div className="grid grid-cols-2 gap-x-4">
              <ul className="space-y-3 text-sm text-gray-400">
                {[
                  { name: 'Football', link: '/products?category=football' },
                  { name: 'NBA', link: '/products?category=nba' },
                  { name: 'Squid Game', link: '/products?category=squid game' },
                  { name: 'Marvel', link: '/products?category=marvel' },
                  { name: 'Disney', link: '/products?category=disney' },
                  { name: 'The Simpsons', link: '/products?category=simpsons' }
                ].map((item, index) => (
                  <li key={index}>
                    <a href={item.link} className="hover:text-indigo-400 transition-colors">
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
              <ul className="space-y-3 text-sm text-gray-400">
                {[
                  { name: 'Stranger Things', link: '/products?category=stranger things' },
                  { name: 'Sonic The Hedgehog', link: '/products?category=sonic' },
                  { name: 'TMNT', link: '/products?category=tmnt' },
                  { name: 'Military', link: '/products?category=military' },
                  { name: 'Harry Potter', link: '/products?category=harry potter' },
                  { name: 'TV', link: '/products?category=tv' }
                ].map((item, index) => (
                  <li key={index}>
                    <a href={item.link} className="hover:text-indigo-400 transition-colors">
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Links Sections */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Get to know us",
                  links: [{ name: 'Company', link: '/about' }, { name: 'About', link: '/about' }],
                },
                {
                  title: "For Consumers",
                  links: [{ name: 'Payments', link: '/payment-types' }, { name: 'Shipping Options', link: '/shipping' }, { name: 'Returns Policy', link: '/refund' }, { name: 'Frequently Asked Questions', link: '/frequently-asked-questions'}, { name: 'View All Products', link: '/products' } ],
                },
                {
                  title: "Help",
                  links: [{ name: 'Contact Us', link: '/contact' }],
                },
              ].map((section, index) => (
                <div key={index} className="flex flex-col">
                  <h6 className="text-white text-lg font-semibold mb-6">{section.title}</h6>
                  <ul className="space-y-3 text-sm text-gray-400">
                    {section.links.map((link, idx) => (
                      <li key={idx}>
                        <a href={link.link} className="hover:text-indigo-400 transition-colors">
                          {link.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="border-t border-gray-700 py-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className='flex justify-around items-center'>
        <span className="text-white font-medium whitespace-nowrap text-sm">Payment Methods</span>
            <ul className="flex items-center gap-4 flex-wrap ml-3">
              {payment.map((payment, index) => (
                <li key={index}>
                  <a href="#!" className="rounded flex items-center justify-center">
                    <img
                      src={payment.icon}
                      alt={payment.name || "Payment method"}
                      className="h-8 w-8"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div onClick={() => window.open('https://www.ebay.co.uk/usr/minifigsmania')} className='flex hover:underline cursor-pointer'>
            <p className='text-sm'>View eBay store</p>
            <BuildingStorefrontIcon className='w-5 h-5 ml-2' />
          </div>
          </div>
          
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-gray-400">
          <div className="flex flex-wrap gap-6 justify-center md:justify-start">
            <a onClick={() => window.open('/terms-and-conditions', '_blank')} className="hover:text-white transition-colors cursor-pointer">Terms & Conditions</a>
            <a onClick={() => window.open('/privacy-policy', '_blank')} className="hover:text-white transition-colors cursor-pointer">Privacy Policy</a>
            <a onClick={() => window.open('/cookies-policy', '_blank')} className="hover:text-white transition-colors cursor-pointer">Cookie Policy</a>
          </div>
          <div onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className='flex hover:underline cursor-pointer hover:text-white'>
            <p>Back to top</p>
            <ArrowUpIcon className='w-5 h-5'/>
          </div>
          <div>
            <p>© {currentYear} MinifigsMania. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
    </>
  );
};

export default Footer;