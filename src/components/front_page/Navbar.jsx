import React from 'react';
import { Fragment, useState, useEffect } from 'react'
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
} from '@headlessui/react'
import { Bars3Icon, MagnifyingGlassIcon, ShoppingBagIcon, XMarkIcon, UserIcon } from '@heroicons/react/24/outline'
import Hero from './Hero'
import ShoppingCartSide from '../product_page/ShoppingCartSide'
import LoginPage from '../modals/LoginPage'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext';
import Register from '../modals/Register'
import axios from 'axios'
import { getProducts } from '../routes/ProductRoutes';
import Logo from '../assets/logo.png'



const navigation = {
  categories: [
    {
      id: 'products',
      name: 'Products',
      featured: [
        {
          name: 'New Collection - Sonic',
          href: 'http://localhost:5173/products?category=sonic',
          imageSrc:
            'data:image/png;base64,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',
          imageAlt: 'Drawstring top with elastic loop closure and textured interior padding.',
        },
        {
          name: 'Popular Figures - Marvel',
          href: 'http://localhost:5173/products?category=marvel',
          imageSrc: 'data:image/png;base64,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',
          imageAlt:
            'Three shirts in gray, white, and blue arranged on table with same line drawing of hands and shapes overlapping on front of shirt.',
        },
      ],
      sections: [
        {
          id: 'sports',
          name: 'Sports',
          items: [
            { name: 'Football (most popular)', href: `http://localhost:5173/products?category=football` },
            { name: 'Basketball', href: '#' },
            { name: 'Other', href: '#' },
          ],
        },
        {
          id: 'tv',
          name: 'TV',
          items: [
            { name: 'Star Wars', href: '#' },
            { name: 'Marvel', href: '#' },
            { name: 'Teenage Mutant Ninja Turtles', href: '#' },
            { name: 'Sonic', href: 'http://localhost:5173/products?category=sonic' },
            { name: 'Simpsons', href: '#' },
          ],
        },
        {
          id: 'other',
          name: 'Other',
          items: [
            { name: 'Military', href: '#' },
          ],
        },
      ],
    },
  ],
  pages: [
    { name: 'Company', href: '/about' },
    { name: 'Stores', href: '#' },
  ],
}

const Navbar = () => {
  const [open, setOpen] = useState(false)
  const [openCart, setOpenCart] = useState(false)
  const [openLoginModal, setOpenLoginModal] = useState(false)
  const [openRegisterModal, setOpenRegisterModal] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState([])

  const { cart, cartNumber, } = useCart()
  const { user } = useAuth() || {}

  console.log(cart, 'cart', cartNumber)

  const handleOpenCart = () => {
    setOpenCart(true)
  }

  const handleOpenLogin = () => {
    setOpenLoginModal(true)
  }

  const handleOpenRegister = () => {
    setOpenRegisterModal(true)
  }

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await getProducts()
      setProducts(res.filter(product => product.active === true))
    }
    fetchProducts()
  }, [])

  const goToDash = () => {
    window.location = '/my-dash'
  }


  return (
    <>
    <LoginPage isOpen={openLoginModal} setIsOpen={setOpenLoginModal} setRegisterModalOpen={setOpenRegisterModal}/>
    <Register isOpen={openRegisterModal} setIsOpen={setOpenRegisterModal} setOpenLogin={setOpenLoginModal} />
    <ShoppingCartSide open={openCart} setOpen={setOpenCart} />


   <div className="w-full">
      {/* Mobile menu */}
      <Dialog open={open} onClose={setOpen} className="relative z-40 lg:hidden">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500/20 blur-md transition-opacity duration-300 ease-linear data-closed:opacity-0"
        />

        <div className="fixed inset-0 z-200 flex">
          <DialogPanel
            transition
            className="relative flex w-full max-w-xs transform flex-col overflow-y-auto bg-white pb-12 shadow-xl transition duration-300 ease-in-out data-closed:-translate-x-full"
          >
            <div className="flex px-4 pt-5 pb-2">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
              >
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="size-6" />
              </button>
            </div>

            {/* Links */}
            <TabGroup className="mt-2">
              <div className="border-b border-gray-200">
                
              </div>
              <TabPanels as={Fragment}>
                {navigation.categories.map((category) => (
                  <TabPanel key={category.name} className="space-y-10 px-4 pt-10 pb-8">
                    <div className="grid grid-cols-2 gap-x-4">
                      {category.featured.map((item) => (
                        <div key={item.name} className="group relative text-sm">
                          <img
                            alt={item.imageAlt}
                            src={item.imageSrc}
                            className="aspect-square w-full rounded-lg bg-gray-100 object-cover group-hover:opacity-75"
                          />
                          <a href={item.href} className="mt-6 block font-medium text-gray-900">
                            <span aria-hidden="true" className="absolute inset-0 z-60" />
                            {item.name}
                          </a>
                          <p aria-hidden="true" className="mt-1">
                            Shop now
                          </p>
                        </div>
                      ))}
                    </div>
                    {category.sections.map((section) => (
                      <div key={section.name}>
                        <p id={`${category.id}-${section.id}-heading-mobile`} className="font-medium text-gray-900">
                          {section.name}
                        </p>
                        <ul
                          role="list"
                          aria-labelledby={`${category.id}-${section.id}-heading-mobile`}
                          className="mt-6 flex flex-col space-y-6"
                        >
                          {section.items.map((item) => (
                            <li key={item.name} className="flow-root">
                              <a href={item.href} className="-m-2 block p-2 text-gray-500">
                                {item.name}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </TabPanel>
                ))}
              </TabPanels>
            </TabGroup>


            <div className="space-y-6 border-t border-gray-200 px-4 py-6 z-90 cursor-pointer">
              {navigation.pages.map((page) => (
                <div key={page.name} className="flow-root">
                  <a href={page.href} className="-m-2 block p-2 font-medium text-gray-900">
                    {page.name}
                  </a>
                </div>
              ))}
            </div>

            <div className="space-y-6 border-t border-gray-200 px-4 py-6">
              {user ? (
                <>
                <div className="flow-root">
                <a className="-m-2 block p-2 font-medium text-gray-900">
                  {user?.user?.name ? `Logged in as ${user?.user?.name}` : 'Welcome back'}
                </a>
              </div>
                <div className="flow-root">
                <a onClick={() => handleOpenLogin()} href="#" className="-m-2 block p-2 font-medium text-gray-900">
                  Sign out
                </a>
              </div>
              </>
              ):(
                <>
              <div className="flow-root">
                <a onClick={() => handleOpenLogin()} href="#" className="-m-2 block p-2 font-medium text-gray-900">
                  Sign in
                </a>
              </div>
      
              <div className="flow-root">
                <a onClick={() => handleOpenRegister()} href="#" className="-m-2 block p-2 font-medium text-gray-900">
                  Create account
                </a>
              </div>
            </>
          )}
          </div>

            <div className="border-t border-gray-200 px-4 py-6">
              <a href="#" className="-m-2 flex items-center p-2">
                <img
                  alt=""
                  src="https://tailwindui.com/plus-assets/img/flags/flag-united-kingdom.svg"
                  className="block h-auto w-5 shrink-0"
                />
                <span className="ml-3 block text-base font-medium text-gray-900">UK</span>
                <span className="sr-only">, change currency</span>
              </a>
            </div>
          </DialogPanel>
        </div>
      </Dialog>

      <header className="relative bg-white z-50">
        <p className="flex h-10 items-center justify-center bg-indigo-600 px-4 text-sm font-medium text-white sm:px-6 lg:px-8">
          Use Promo Code SUMMER25 for 15% of your order!
        </p>

        <nav aria-label="Top" className="mx-auto w-full px-4 sm:px-6 lg:px-8">
          <div className="border-b border-gray-200">
            <div className="flex h-16 items-center">
              <button
                type="button"
                onClick={() => setOpen(true)}
                className="relative rounded-md bg-white p-2 text-gray-400 lg:hidden"
              >
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Open menu</span>
                <Bars3Icon aria-hidden="true" className="size-6" />
              </button>

              {/* Logo */}
              <div className="ml-4 flex lg:ml-0">
                <a href="/">
                  <span className="sr-only">Your Company</span>
                  <img
                    alt=""
                    src={Logo}
                    className="h-15 w-auto"
                  />
                </a>
              </div>


              {/* Flyout menus */}
              <PopoverGroup className="hidden lg:ml-8 lg:block lg:self-stretch">
                <div className="flex h-full space-x-8">
                  {navigation.categories.map((category) => (
                    <Popover key={category.name} className="flex">
                      <div className="relative flex">
                        <PopoverButton className="relative z-60 -mb-px flex items-center border-b-2 border-transparent pt-px text-sm font-medium text-gray-700 transition-colors duration-200 ease-out hover:text-gray-800 data-open:border-indigo-600 data-open:text-indigo-600">
                          {category.name}
                        </PopoverButton>
                      </div>

                      <PopoverPanel
                        transition
                        className="absolute inset-x-0 top-full text-sm text-gray-500 transition data-closed:opacity-0 data-enter:duration-200 data-enter:ease-out data-leave:duration-150 data-leave:ease-in z-60"
                      >
                        {/* Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow */}
                        <div aria-hidden="true" className="absolute inset-0 top-1/2 bg-white shadow-sm" />

                        <div className="relative bg-white">
                          <div className="mx-auto max-w-7xl px-8">
                            <div className="grid grid-cols-2 gap-x-8 gap-y-10 py-16">
                              <div className="col-start-2 grid grid-cols-2 gap-x-8">
                                {category.featured.map((item) => (
                                  <div key={item.name} className="group relative text-base sm:text-sm border p-2 border-gray-200 rounded-md">
                                    <img
                                      alt={item.imageAlt}
                                      src={item.imageSrc}
                                      className="aspect-square w-full rounded-lg bg-gray-100 object-cover group-hover:opacity-75"
                                    />
                                    <a href={item.href} className="mt-6 block font-medium text-gray-900">
                                      <span aria-hidden="true" className="absolute inset-0 z-10" />
                                      {item.name}
                                    </a>
                                    <p aria-hidden="true" className="mt-1">
                                      Shop now
                                    </p>
                                  </div>
                                ))}
                              </div>
                              <div className="row-start-1 grid grid-cols-3 gap-x-8 gap-y-10 text-sm">
                                {category.sections.map((section) => (
                                  <div key={section.name}>
                                    <p id={`${section.name}-heading`} className="font-medium text-gray-900">
                                      {section.name}
                                    </p>
                                    <ul
                                      role="list"
                                      aria-labelledby={`${section.name}-heading`}
                                      className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                    >
                                      {section.items.map((item) => (
                                        <li key={item.name} className="flex">
                                          <a href={item.href} className="hover:text-gray-800">
                                            {item.name}
                                          </a>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </PopoverPanel>
                    </Popover>
                  ))}


                  {navigation.pages.map((page) => (
                    <a
                      key={page.name}
                      href={page.href}
                      className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800 cursor-pointer"
                    >
                      {page.name}
                    </a>
                  ))}
                </div>
              </PopoverGroup>



              <div className="ml-auto flex items-center">



                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                  {!user ? (
                    <>
                    <a onClick={() => handleOpenLogin()} href="#" className="text-sm font-medium text-gray-700 hover:text-gray-800 z-60">
                    Sign in
                  </a>
                  <span aria-hidden="true" className="h-6 w-px bg-gray-200" />
                  <a onClick={() => handleOpenRegister()} href="#" className="text-sm font-medium text-gray-700 hover:text-gray-800 z-60">
                    Create account
                  </a>
                  </>
                  ):(
                    <>
                      <p onClick={() => goToDash()} className="text-sm cursor-pointer">
                        {user?.user?.name 
                          ? <strong>Hi, {user.user.name}</strong> 
                          : <strong>Welcome Back</strong>} 
                        <span aria-hidden="true"> &rarr;</span>
                      </p>
                    </>
                  )}
                </div>

                <div className="hidden lg:ml-8 lg:flex">
                  <a href="#" className="flex items-center text-gray-700 hover:text-gray-800">
                    <img
                      alt=""
                      src="https://tailwindui.com/plus-assets/img/flags/flag-united-kingdom.svg"
                      className="block h-auto w-5 shrink-0"
                    />
                    <span className="ml-3 block text-sm font-medium">UK</span>
                    <span className="sr-only">, change currency</span>
                  </a>
                </div>

                {/* Search */}
                <div onClick={() => setIsSearchOpen(true)} className="flex lg:ml-6">
                  <a href="#" className="p-2 text-gray-400 hover:text-gray-500 z-60">
                    <span className="sr-only">Search</span>
                    <MagnifyingGlassIcon aria-hidden="true" className="size-6 z-60" />
                  </a>
                </div>

                {isSearchOpen && (
                  <div 
                    className="fixed inset-0 bg-neutral-800/30 duration-500 ease-in-out data-closed:opacity-0 flex justify-center items-start pt-10 z-80 transition-all"
                    onClick={() => setIsSearchOpen(false)} // Click outside to close
                  >
                    {/* Search box */}
                    <div 
                      className="relative bg-white p-6 rounded-lg w-3/4 sm:w-1/2 lg:w-1/3 border border-gray-200"
                      onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
                    >
                      {/* Input Field */}
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                        placeholder="Search for products..."
                        autoFocus
                      />

                        {/* Show products results */}
                        <div className="mt-4 max-h-60 overflow-y-auto">
                          {products.length > 0 ? (
                            products
                            .filter((product) => product.name.toLowerCase().includes(searchQuery.toLowerCase()))
                            .map((product) => (
                              <a 
                                key={product.id} 
                                href={`/products/${product.id}`} 
                                className="block p-3 border-b border-gray-200 hover:bg-gray-100"
                              >
                                <div className="flex items-center">
                                  {/* Product Image */}
                                  <img className="w-16 h-16 object-cover rounded-md" src={product?.images[0]?.url} alt={product.name} />

                                  {/* Product Details */}
                                  <div className="ml-3">
                                    <p className="text-lg font-medium text-gray-800">{product.name}</p>
                                    <p className="text-sm text-gray-600">£{product.price}</p>
                                  </div>
                                </div>
                              </a>
                            ))
                          ) : (
                            <p className="text-center mt-2">No products found.</p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                          
                {/* Cart */}
                <div className="ml-4 flow-root lg:ml-6 z-60">
                  <a href="#" className="group -m-2 flex items-center p-2" onClick={() => handleOpenCart()}>
                    <ShoppingBagIcon
                      aria-hidden="true"
                      className="size-6 shrink-0 text-gray-400 group-hover:text-gray-500"
                    />
                    <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">{cartNumber}</span>
                    <span className="sr-only">items in cart, view bag</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
    
    </>
  )
}

export default Navbar