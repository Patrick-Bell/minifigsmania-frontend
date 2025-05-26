import { MinusIcon, PlusIcon, TruckIcon, CheckIcon, ShareIcon, ClipboardIcon } from '@heroicons/react/20/solid';
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext'
import ShoppingCartSide from '../product_page/ShoppingCartSide';
import ConditionModal from './ConditionModal';
import { XMarkIcon, InformationCircleIcon } from "@heroicons/react/24/outline";


const ProductData = ({ product, rating, validReviews, isLoading }) => {
    const [selectedImage, setSelectedImage] = useState('');
    const [open, setOpen] = useState(false)
    const [openConditions, setOpenConditions] = useState(false)

    const { addItemToCart } = useCart()

    const today = new Date();
    const fiveDaysFromNow = new Date();
    fiveDaysFromNow.setDate(today.getDate() + 5);
    const sevenDaysFromNow = new Date()
    sevenDaysFromNow.setDate(today.getDate() + 7)

    const shareProduct = (product) => {
        const url = window.location.href;
        const text = `Check out this product: ${product.name} - ${url}`;
        if (navigator.share) {
            navigator.share({
                title: product.name,
                text: text,
                url: url,
            })
            .then(() => console.log('Product shared successfully'))
            .catch((error) => console.error('Error sharing product:', error));
        } else {
            alert(text);
        }
    }


    

useEffect(() => {
    if (product?.images?.length) {
        setSelectedImage(product?.images[0]?.url);
    }
}, [product]);

    
    const filters = [
        {
            id: 1,
            name: 'Description',
            icon: <CheckIcon />,
            message: [
                `${product?.name} custom minifigure.`, 
                `Category: ${product?.category}.`,
                'Compatible with major brands such as LEGO.', 
                `Weight: ${product?.weight}g.`, 
                `Height: ${product?.height}cm.`, 
                `Accessories: ${product?.accessories}.`,
                'Not suitable for children under 3 years of age due to small parts.'
            ]
        },
        {
            id: 2,
            name: 'Shipping',
            icon: <TruckIcon />,
            message: [
                `Order now and receive by ${new Date(fiveDaysFromNow).toLocaleDateString()} - ${new Date(sevenDaysFromNow).toLocaleDateString()}.`, 
                'Shipping costs depend on number of minifigures/weight.', 
                'Orders are dispatched within 48 hours of payment (excluding weekends and public holidays).',
                'Shipping costs start from £1.55.'
            ]
        },
        {
            id: 3,
            name: 'Returns',
            icon: <ClipboardIcon />,
            message: [
                'We do not cover the costs of returns.', 
                'Product must be in original packaging and have no sign of use.', 
                'Returns must be made within 30 days of purchase.',
                'Replacement or refund available for defective items.'
            ]
        },
    ];

    const goBack = () => window.history.back();

    return (
        <div className="flex flex-col md:flex-row justify-center p-6 mx-auto gap-10 w-full">
            {/* Product Images */}
            <div className="flex flex-col items-center md:items-start space-y-4">
                
                    <div className="flex flex-col items-center">
                        {/* Main Image */}
                        <img 
                            className="rounded-lg border border-gray-200 w-100 h-100 object-cover hover:object-contain transition duration-300 hover:cursor-zoom-out" 
                            src={selectedImage} 
                            alt={product?.name} 
                        />

                        {/* Thumbnails */}
                        <div className="flex gap-2 mt-2 max-w-100 overflow-auto">
                            {product?.images.map((img, i) => (
                                <img 
                                    key={i} 
                                    className={`w-16 h-16 rounded-lg border border-gray-200 cursor-pointer object-cover transition ${
                                        selectedImage === img.url ? 'border-indigo-500' : 'hover:border-indigo-500'
                                    }`} 
                                    src={img.url} 
                                    alt="Thumbnail" 
                                    onClick={() => setSelectedImage(img.url)} 
                                />
                            ))}
                        </div>
                    </div>
            </div>

            

            {/* Product Details */}
            <div className="w-full md:w-1/2 flex flex-col gap-4">
                {/* Title & Back Button */}
                <div className="flex justify-between items-center">
                    
                        <h1 className="text-3xl font-bold">{product?.name}</h1>

                    <button 
                        onClick={goBack} 
                        className="px-4 py-2 rounded-md border border-[#e9ebee] hover:bg-gray-50 cursor-pointer"
                    >
                        Back
                    </button>
                </div>

                {/* Price Section */}
                 {product?.sale_price > 0 ? (
                    <div className="flex">
                        <p className="text-2xl font-medium line-through text-red-500">£{product.sale_price}</p>
                        <p className="text-2xl ml-3 font-medium text-gray-900">£{product?.price}</p>
                    </div>
                ) : (
                    <p className="text-2xl font-medium text-gray-900">£{product?.price}</p>
                )}

                {/* Star Rating */}
                <div className="flex items-center">
                    
                        {[...Array(5)].map((_, i) => (
                            <svg key={i} xmlns="http://www.w3.org/2000/svg" 
                                className={`h-5 w-5 ${i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}`} 
                                viewBox="0 0 20 20" fill="currentColor"
                            >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            
                        ))}
                </div>

                <div onClick={() => setOpenConditions(true)}>
                    <span className='flex items-center to-black cursor-pointer'>
                    <InformationCircleIcon className='h-4' />
                    <p className='text-sm ml-1'>Condition: <strong>{product.condition}</strong></p>
                    </span>
                </div>

                <ConditionModal isOpen={openConditions} setIsOpen={setOpenConditions} product={product} />

                {/* Add to Cart */}
                <div className="flex w-full gap-2 items-center">
                    <button
                        onClick={() => addItemToCart(product)}
                        className="flex-1 bg-indigo-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-indigo-700 transition cursor-pointer"
                    >
                        Add to Cart
                    </button>

                    <button
                        className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition flex items-center justify-center cursor-pointer"
                        aria-label="Share"
                        onClick={() => shareProduct(product)}
                    >
                        <ShareIcon className="h-5 w-5 text-gray-600" />
                    </button>
                    
                </div>


                <ShoppingCartSide open={open} setOpen={setOpen} />

                {/* Collapsible Sections */}
                
                    <form className="mt-4 border-gray-200">
                    {filters.map((section) => (
                        <Disclosure key={section.id} as="div" className="border-t border-gray-200 px-4 py-6">
                            <h3 className="-mx-2 -my-3 flow-root">
                                <DisclosureButton className="group flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-indigo-500 cursor-pointer">
                                    <span className="font-medium text-gray-400 text-sm">{section.name}</span>
                                    <span className="ml-6 flex items-center">
                                        <PlusIcon aria-hidden="true" className="size-5 group-data-open:hidden" />
                                        <MinusIcon aria-hidden="true" className="size-5 group-not-data-open:hidden" />
                                    </span>
                                </DisclosureButton>
                            </h3>
                            <DisclosurePanel className="pt-6 text-sm text-gray-500">
                                {section.message.map((msg, i) => (
                                    <div key={i} className="flex my-2">
                                        {section.icon && <div className="size-5 mr-2 text-indigo-600">{section.icon}</div>}
                                        {msg}
                                    </div>
                                ))}
                            </DisclosurePanel>
                        </Disclosure>
                    ))}
                </form>
                
            </div>
        </div>
    );
};

export default ProductData;
