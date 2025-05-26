import React, { useState, useEffect } from 'react'
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon, FunnelIcon, MinusIcon, PlusIcon, Squares2X2Icon } from '@heroicons/react/20/solid'
import ProductCard from './ProductCard'
import Navbar from '../front_page/Navbar'
import ShoppingCartSide from './ShoppingCartSide'
import Footer from '../front_page/Footer'
import axios from 'axios'
import ProductCardSkeleton from './ProductCardSkeleton'
import { useLocation } from 'react-router-dom'
import { ToyBrick } from 'lucide-react'

const ProductFilter = () => {
  const [selectedSortOption, setSelectedSortOption] = useState('Most Popular');
  const [productsPerPage, setProductsPerPage] = useState(4); // Default items per page

  const fetchProducts = async () => {
    try{
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/products`);
      setProducts(response.data.filter(product => product.active))
      setFilteredProducts(response.data.filter(product => product.active))
      console.log(response, 'data', response.data)
    }catch(e){
      console.log(e)
    } finally {
      setTimeout(() => {
        setIsLoading(false)
      }, 1000)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])
  
  const useQuery = () => {
    return new URLSearchParams(useLocation().search)
  }
  const query = useQuery()
  const category = query.get("category") // Get the 'category' query param
  const tag = query.get('tag')
  const stock = query.get('stock')

  const [products, setProducts] = useState([])
  const [show, setShow] = useState(4)
  const [allFilters, setAllFilters] = useState({
    category: category ? [category] : [],
    tag: tag ? [tag] : [],
    stock: stock ? [stock] : [],
    rating: []
  })

  const [isLoading, setIsLoading] = useState(true)

  const allCategories = products.map(product => product.category)
  const uniqueCategories = [...new Set(allCategories)]

  const allTags = products.map(product => product.tag)
  const uniqueTags = [...new Set(allTags)]

  const uniqueStock = ['in stock', 'out of stock']

  const sortOptions = [
    { name: 'Most Popular', href: '#', current: true },
    { name: 'Newest Arrivals', href: '#', current: false },
    { name: 'Price: Low to High', href: '#', current: false },
    { name: 'Price: High to Low', href: '#', current: false },
  ]

  const pageOptions = [
    { name: 4, href: '#', current: true },
    { name: 8, href: '#', current: false },
    { name: 12, href: '#', current: false },
    { name: 20, href: '#', current: false },
  ]
    
  const filters = [
    {
      id: 'category',
      name: 'Category',
      options: [
        ...uniqueCategories.map((category) => ({
          value: category?.toLowerCase(),
          label: category,
          checked: allFilters.category.includes(category?.toLowerCase()),
        })),
      ],
    },
    {
      id: 'tag',
      name: 'Tag',
      options: [
        ...uniqueTags.map((tag) => ({
          value: tag?.toLowerCase(),
          label: tag,
          checked: allFilters.tag.includes(tag?.toLowerCase()),
        })),
      ],
    },
    {
      id: 'rating',
      name: 'Rating',
      options: [
        ...[0, 1, 2, 3, 4, 5].map((rating) => ({
          value: Number(rating),
          label: rating,
          checked: allFilters.rating.map(Number).includes(rating),
        })),
      ],
    },
    {
      id: 'stock',
      name: 'Stock',
      options: [
        ...uniqueStock.map((stock) => ({
          value: stock?.toLowerCase(),
          label: stock,
          checked: allFilters.stock.includes(stock?.toLowerCase()),
        })),
      ],
    },
  ]
    
  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const [filteredProducts, setFilteredProducts] = useState([])
  const [showMoreBtn, setShowMoreBtn] = useState('Show more')

  // Handler for when items per page changes
  const handleProductsPerPageChange = (numItems) => {
    setProductsPerPage(numItems);
    setShow(numItems);
    setShowMoreBtn('Show more');
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleShowMore = () => {
    if (show + productsPerPage >= filteredProducts.length) {
      setShowMoreBtn('Back to top')
    }
    setShow((prev) => prev + productsPerPage)
  }

  const backToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  const sortProducts = (products) => {
    switch (selectedSortOption) {
      case 'Price: Low to High':
        return products.sort((a, b) => a.price - b.price);
      case 'Price: High to Low':
        return products.sort((a, b) => b.price - a.price);
      case 'Newest Arrivals':
        return products.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      case 'Most Popular':
      default:
        return products; // No sorting or custom logic for popularity
    }
  };

  const sortedProducts = sortProducts(filteredProducts);

  const handleFilterChange = (event, filterType) => {
    const { value, checked } = event.target;
  
    // Convert value to number for known numeric filters
    const isNumericFilter = ['rating', 'price'].includes(filterType);
    const parsedValue = isNumericFilter ? Number(value) : value.toLowerCase();
  
    setAllFilters(prevFilters => {
      const updatedFilters = checked
        ? [...prevFilters[filterType], parsedValue] // Add item
        : prevFilters[filterType].filter(item => item !== parsedValue); // Remove item
  
      console.log(`Updated ${filterType}:`, updatedFilters);
      
      return { ...prevFilters, [filterType]: updatedFilters };
    });
  };
  

  const resetFilters = (e) => {
    e.preventDefault();

    setAllFilters({
      category: [],
      tag: [],
      stock: [],
      rating: []
    });
    setFilteredProducts(products);
    setShow(productsPerPage); // Reset show to initial value based on productsPerPage
    setShowMoreBtn('Show more'); // Reset button text
  }
  

  useEffect(() => {
    const filtered = products
      .map(product => {
        // Check if there are reviews
        const validRatings = product?.reviews.filter(review => review.reviewed === true)
        const ratings = validRatings.length;
        const averageRating = ratings > 0
        ? Math.round(validRatings.reduce((acc, review) => acc + review.rating, 0) / ratings)
        : 0; // If no reviews, set averageRating to 0
        
        return { ...product, averageRating: Number(averageRating) };
      })
      .filter(product =>
        (allFilters.category.length === 0 || allFilters.category.includes(product.category?.toLowerCase())) &&
        (allFilters.tag.length === 0 || allFilters.tag.includes(product.tag?.toLowerCase())) &&
        (allFilters.stock.length === 0 ||
          (allFilters.stock.includes('in stock') && product.stock > 0) ||
          (allFilters.stock.includes('out of stock') && product.stock === 0)) &&
        (allFilters.rating.length === 0 || allFilters.rating.includes(product.averageRating))
      );
  
    setFilteredProducts(filtered);
    setShow(productsPerPage); // Reset show to initial value based on productsPerPage
    setShowMoreBtn('Show more'); // Reset button text
  }, [allFilters, products, productsPerPage]);
  
  return (
    <>
    <div>
      <Navbar />
      <div>
        {/* Mobile filter dialog */}
        <Dialog open={mobileFiltersOpen} onClose={setMobileFiltersOpen} className="relative z-100 lg:hidden">
          <DialogBackdrop
            transition
            className="fixed inset-0 bg-black/25 transition-opacity duration-300 ease-linear data-closed:opacity-0"
          />

          <div className="fixed inset-0 z-40 flex">
            <DialogPanel
              transition
              className="relative ml-auto flex size-full max-w-xs transform flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl transition duration-300 ease-in-out data-closed:translate-x-full"
            >
              <div className="flex items-center justify-between px-4">
                <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                <button
                  type="button"
                  onClick={() => setMobileFiltersOpen(false)}
                  className="-mr-2 flex size-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                >
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon aria-hidden="true" className="size-6" />
                </button>
              </div>

              {/* Filters */}
              <form className="mt-4 border-t border-gray-200">
                <h3 className="sr-only">Categories</h3>
                
                {filters.map((section) => (
                  <Disclosure key={section.id} as="div" className="border-t border-gray-200 px-4 py-6">
                    <h3 className="-mx-2 -my-3 flow-root">
                      <DisclosureButton className="group flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                        <span className="font-medium text-gray-900">{section.name}</span>
                        <span className="ml-6 flex items-center">
                          <PlusIcon aria-hidden="true" className="size-5 group-data-open:hidden" />
                          <MinusIcon aria-hidden="true" className="size-5 group-not-data-open:hidden" />
                        </span>
                      </DisclosureButton>
                    </h3>
                    <DisclosurePanel className="pt-6">
                      <div className="space-y-6">
                        {section.options.map((option, optionIdx) => (
                          <div key={option.value} className="flex gap-3">
                            <div className="flex h-5 shrink-0 items-center">
                              <div className="group grid size-4 grid-cols-1">
                                <input
                                  checked={option.checked}
                                  onChange={(event) => handleFilterChange(event, section.id)}
                                  id={`filter-mobile-${section.id}-${optionIdx}`}
                                  name={`${section.id}[]`}
                                  type="checkbox"
                                  value={option.value}
                                  className="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                                />
                                <svg
                                  fill="none"
                                  viewBox="0 0 14 14"
                                  className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25"
                                >
                                  <path
                                    d="M3 8L6 11L11 3.5"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="opacity-0 group-has-checked:opacity-100"
                                  />
                                  <path
                                    d="M3 7H11"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="opacity-0 group-has-indeterminate:opacity-100"
                                  />
                                </svg>
                              </div>
                            </div>
                            <label
                              htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                              className="min-w-0 flex-1 text-gray-500"
                            >
                              {option.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </DisclosurePanel>
                  </Disclosure>
                ))}
              </form>
            </DialogPanel>
          </div>
        </Dialog>


        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between border-b border-gray-200 pt-24 pb-6">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">All Products</h1>

            <div className="flex items-center">
              {/* Sort Menu */}
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <MenuButton className="z-100 group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900 cursor-pointer">
                    Sort
                    <ChevronDownIcon
                      aria-hidden="true"
                      className="-mr-1 ml-1 size-5 shrink-0 text-gray-400 group-hover:text-gray-500"
                    />
                  </MenuButton>
                </div>

                <MenuItems
                  transition
                  className="absolute z-40 right-0 mt-2 w-40 origin-top-right rounded-md bg-white ring-1 shadow-2xl ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                >
                  <div className="py-1">
                    {sortOptions.map((option) => (
                      <MenuItem key={option.name}>
                        <button
                          onClick={() => setSelectedSortOption(option.name)}
                          className={classNames(
                            option.name === selectedSortOption
                              ? 'font-medium text-gray-900'
                              : 'text-gray-500',
                            'block px-4 py-2 text-sm data-focus:bg-gray-100 data-focus:outline-hidden w-full cursor-pointer text-left'
                          )}
                        >
                          {option.name}
                        </button>
                      </MenuItem>
                    ))}
                  </div>
                </MenuItems>
              </Menu>

              {/* Per Page Menu */}
              <Menu as="div" className="relative inline-block text-left ml-4">
                <div>
                  <MenuButton className="z-100 group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900 cursor-pointer">
                    Show
                    <ChevronDownIcon
                      aria-hidden="true"
                      className="-mr-1 ml-1 size-5 shrink-0 text-gray-400 group-hover:text-gray-500"
                    />
                  </MenuButton>
                </div>

                <MenuItems
                  transition
                  className="absolute z-40 right-0 mt-2 w-40 origin-top-right rounded-md bg-white ring-1 shadow-2xl ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                >
                  <div className="py-1">
                    {pageOptions.map((option) => (
                      <MenuItem key={option.name}>
                        <button
                          onClick={() => handleProductsPerPageChange(option.name)}
                          className={classNames(
                            option.name === productsPerPage
                              ? 'font-medium text-gray-900'
                              : 'text-gray-500',
                            'block px-4 py-2 text-sm data-focus:bg-gray-100 data-focus:outline-hidden w-full cursor-pointer text-left'
                          )}
                        >
                          {option.name} per page
                        </button>
                      </MenuItem>
                    ))}
                  </div>
                </MenuItems>
              </Menu>

              <button
                type="button"
                onClick={() => setMobileFiltersOpen(true)}
                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
              >
                <span className="sr-only">Filters</span>
                <FunnelIcon aria-hidden="true" className="size-5" />
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pt-6 pb-24">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
              {/* Filters */}
              <form className="hidden lg:block">
                <h3 className="sr-only">Categories</h3>
                
                {filters.map((section) => (
                  <Disclosure key={section.id} as="div" className="border-b border-gray-200 py-6">
                    <h3 className="-my-3 flow-root">
                      <DisclosureButton className="group flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500 cursor-pointer">
                        <span className="font-medium text-gray-900">{section.name}</span>
                        <span className="ml-6 flex items-center">
                          <PlusIcon aria-hidden="true" className="size-5 group-data-open:hidden" />
                          <MinusIcon aria-hidden="true" className="size-5 group-not-data-open:hidden" />
                        </span>
                      </DisclosureButton>
                    </h3>
                    <DisclosurePanel className="pt-6">
                      <div className="space-y-4">
                        {section.options.map((option, optionIdx) => (
                          <div key={option.value} className="flex gap-3">
                            <div className="flex h-5 shrink-0 items-center">
                              <div className="group grid size-4 grid-cols-1">
                                <input
                                  checked={option.checked}
                                  onChange={(event) => handleFilterChange(event, section.id)}
                                  id={`filter-${section.id}-${optionIdx}`}
                                  name={`${section.id}[]`}
                                  type="checkbox"
                                  value={option.value}
                                  className="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                                />
                                <svg
                                  fill="none"
                                  viewBox="0 0 14 14"
                                  className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25"
                                >
                                  <path
                                    d="M3 8L6 11L11 3.5"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="opacity-0 group-has-checked:opacity-100"
                                  />
                                  <path
                                    d="M3 7H11"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="opacity-0 group-has-indeterminate:opacity-100"
                                  />
                                </svg>
                              </div>
                            </div>
                            <label htmlFor={`filter-${section.id}-${optionIdx}`} className="text-sm text-gray-600">
                              {option.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </DisclosurePanel>
                  </Disclosure>
                ))}
                <button onClick={(e) => resetFilters(e)} className='mt-4 bg-indigo-600 hover:bg-indigo-700 cursor-pointer w-full p-2 text-white rounded-md'>Reset</button>
              </form>

              {/* Product grid */}
              <div className="lg:col-span-3">
                {isLoading ? (
                <div className="mx-auto max-w-2xl py-6 px-4 sm:px-6 lg:max-w-7xl">
                  <ProductCardSkeleton times={filteredProducts.length} />
                </div>
              ) : (
                filteredProducts.length === 0 ? (
                  <div className="min-h-50 flex flex-col justify-center items-center text-center py-12 space-y-4">
                    <ToyBrick className="text-gray-400 w-12 h-12" />
                    <p className="text-gray-600 text-2xl font-semibold">No Products Found</p>
                    <p className="text-gray-500 text-sm">It looks like no products match your filters.</p>
                  </div>
                ) : (
                  <div className="bg-white">
                    <div className="mx-auto max-w-2xl py-6 px-4 sm:px-6 lg:max-w-7xl">
                      <div className="mt-6 grid grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8 h-auto pointer-events-auto">
                        {sortedProducts.slice(0, show).map((product) => (
                          <ProductCard key={product.id} product={product} />
                        ))}
                      </div>
                    </div>

                    {filteredProducts.length > productsPerPage && (
                      <>
                        <div className="w-full bg-gray-200 rounded-full h-1">
                          <div
                            className="bg-indigo-500 h-1 rounded-full"
                            style={{ width: Math.min((show / filteredProducts.length) * 100, 100) + "%" }}
                          />
                        </div>
                        <button
                          onClick={show >= filteredProducts.length ? backToTop : handleShowMore}
                          className="bg-indigo-600 mt-2 flex justify-center align-middle m-auto p-2 text-sm rounded-sm text-white cursor-pointer hover:bg-indigo-700 transition-colors"
                        >
                          {showMoreBtn}
                        </button>
                      </>
                    )}
                  </div>
                )
              )}
              </div>
            </div>
          </section>
        </main>
      </div>
      <Footer />
    </div>
    </>
  )
}

export default ProductFilter