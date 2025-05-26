import { useState } from 'react'
import Navbar from '../front_page/Navbar'
import Footer from '../front_page/Footer'

const Refund = () => {
    return (
        <>
            <Navbar />
            
            <div className="isolate bg-white px-4 sm:px-6 py-16 sm:py-24 lg:px-8 mx-auto">
                {/* Background decorative element */}
                <div
                    aria-hidden="true"
                    className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
                >
                    <div
                        style={{
                            clipPath:
                            'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                        }}
                        className="relative left-1/2 -z-10 aspect-1155/678 w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
                    />
                </div>
                
                {/* Header Section */}
                <div className="mx-auto max-w-2xl text-center mb-12 sm:mb-16">
                    <p className="font-bold text-indigo-600 text-xs sm:text-sm tracking-widest mb-2 sm:mb-3">POLICY</p>
                    <h2 className="text-3xl font-bold tracking-tight text-balance text-gray-900 sm:text-5xl">Refunds & Returns</h2>
                    <p className="mt-4 sm:mt-6 text-base sm:text-lg leading-7 sm:leading-8 text-gray-600 max-w-xl mx-auto">
                        Thank you for shopping with us. We want to ensure you have a great experience with our custom Lego figures.
                    </p>
                </div>

                {/* Main Content */}
                <div className="max-w-3xl mx-auto text-gray-700 space-y-8 sm:space-y-12">
                    <div className="hidden sm:block border-t border-gray-200 my-8"></div>

                    
                    <div className="space-y-6 sm:space-y-8">
                        {/* RETURN ELIGIBILITY */}
                        <div className="bg-white overflow-hidden">
                            <p className="text-sm font-bold text-indigo-600 uppercase tracking-wider px-4 sm:px-6 pt-6 pb-1">RETURN ELIGIBILITY</p>
                            
                            <div className="px-4 sm:px-6 py-5 sm:py-6">
                                <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
                                    <li>Returns must be initiated within 30 days of receiving your order.</li>
                                    <li>Items must be in original, unopened packaging with all figure(s) and assessories.</li>
                                </ul>
                            </div>
                        </div>

                        {/* Divider */}
                        <div className="hidden sm:block border-t border-gray-200 my-8"></div>

                        {/* NON-RETURNABLE ITEMS */}
                        <div className="bg-white overflow-hiddenborder-gray-200">
                            <p className="text-sm font-bold text-indigo-600 uppercase tracking-wider px-4 sm:px-6 pt-6 pb-1">NON-RETURNABLE ITEMS</p>
                            
                            <div className="px-4 sm:px-6 py-5 sm:py-6">
                                <p className="mb-3 text-sm text-gray-700">The following items cannot be returned or exchanged:</p>
                                <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
                                    <li>Figures with any signs of use, play, or damage.</li>
                                    <li>Items with damaged, missing, or altered packaging.</li>
                                    <li>Items where protective seals or stickers have been broken or removed.</li>
                                    <li>Digital products or downloadable content.</li>
                                    <li>Gift cards or store credit.</li>
                                    <li>Bundled items sold at a discount (unless the entire bundle is returned).</li>
                                </ul>
                            </div>
                        </div>

                        {/* Divider */}
                        <div className="hidden sm:block border-t border-gray-200 my-8"></div>

                        {/* RETURN PROCESS */}
                        <div className="bg-white rounded-xl overflow-hidden">
                            <p className="text-sm font-bold text-indigo-600 uppercase tracking-wider px-4 sm:px-6 pt-6 pb-1">RETURN PROCESS</p>
                            
                            <div className="px-4 sm:px-6 py-5 sm:py-6">
                                <ol className="list-decimal pl-5 space-y-3 text-sm text-gray-700">
                                    <li>
                                        <strong>Contact Us:</strong> Email our customer service at support@legocustoms.com or submit a return request through your account within 30 days of delivery.
                                    </li>
                                    <li>
                                        <strong>Return Authorisation:</strong> Wait for our confirmation email with a Return Authorisation Number (RAN) and return instructions.
                                    </li>
                                    <li>
                                        <strong>Examination:</strong> If your product has been removed from its original packaging, we will examine the item to determine if it is eligible for a return. You will need to send us clear pictures of the item(s).
                                    </li>
                                    <li>
                                        <strong>Package Your Return:</strong> Carefully package the items in their original packaging, including all accessories, parts, and documentation.
                                    </li>
                                    <li>
                                        <strong>Shipping:</strong> Ship the items back using a trackable shipping method. The RAN must be clearly marked on the outside of the package.
                                    </li>
                                    <li>
                                        <strong>Processing Time:</strong> Once received, returns typically take 5-7 business days to process.
                                    </li>
                                </ol>
                            </div>
                        </div>

                        {/* Divider */}
                        <div className="hidden sm:block border-t border-gray-200 my-8"></div>

                        {/* REFUND INFORMATION */}
                        <div className="bg-white rounded-xl overflow-hidden">
                            <p className="text-sm font-bold text-indigo-600 uppercase tracking-wider px-4 sm:px-6 pt-6 pb-1">REFUND INFORMATION</p>
                            
                            <div className="px-4 sm:px-6 py-5 sm:py-6">
                                <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
                                    <li>Refunds will be issued to the original payment method used for the purchase.</li>
                                    <li>Original shipping charges are non-refundable unless the return is due to our error.</li>
                                    <li>Return shipping costs are the responsibility of the customer unless the return is due to our error.</li>
                                    <li>A 15% restocking fee may apply to certain returns (excluding defective items).</li>
                                    <li>Refunds typically appear in your account within 5-10 business days after processing, depending on your payment provider.</li>
                                    <li>For returns without a receipt, we may offer store credit at the current selling price.</li>
                                </ul>
                            </div>
                        </div>

                        {/* Divider */}
                        <div className="hidden sm:block border-t border-gray-200 my-8"></div>

                        {/* DEFECTIVE ITEMS */}
                        <div className="bg-white rounded-xl overflow-hidden">
                            <p className="text-sm font-bold text-indigo-600 uppercase tracking-wider px-4 sm:px-6 pt-6 pb-1">DEFECTIVE ITEMS</p>
                            
                            <div className="px-4 sm:px-6 py-5 sm:py-6">
                                <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
                                    <li>Contact us within 48 hours of receiving the item with clear photos of the defect.</li>
                                    <li>Manufacturing defects are eligible for replacement or refund at our discretion.</li>
                                    <li>Normal wear and tear, improper use, or customer-caused damage is not considered defective.</li>
                                    <li>Minor variations in color, detail, or finish are inherent in handcrafted custom figures and are not considered defects.</li>
                                    <li>We may request additional information or photos to assess the defect claim.</li>
                                </ul>
                            </div>
                        </div>

                        {/* Divider */}
                        <div className="hidden sm:block border-t border-gray-200 my-8"></div>

                        {/* EXCHANGES */}
                        <div className="bg-white rounded-xl overflow-hidden">
                            <p className="text-sm font-bold text-indigo-600 uppercase tracking-wider px-4 sm:px-6 pt-6 pb-1">EXCHANGES</p>
                            
                            <div className="px-4 sm:px-6 py-5 sm:py-6">
                                <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
                                    <li>We offer direct exchanges for the same item if it's available in our inventory.</li>
                                    <li>For exchanges of different items, we process a return and new purchase separately.</li>
                                    <li>Shipping costs for exchanges may apply unless the exchange is due to our error.</li>
                                    <li>Price differences will apply when exchanging for a different item.</li>
                                    <li>Exchange requests must be made within the same 14-day return window.</li>
                                </ul>
                            </div>
                        </div>

        
                        {/* Divider */}
                        <div className="hidden sm:block border-t border-gray-200 my-8"></div>

                        {/* POLICY MODIFICATIONS */}
                        <div className="bg-white rounded-xl overflow-hidden">
                            <p className="text-sm font-bold text-indigo-600 uppercase tracking-wider px-4 sm:px-6 pt-6 pb-1">POLICY MODIFICATIONS</p>
                            
                            <div className="px-4 sm:px-6 py-5">
                                <p className="text-sm text-gray-700">We reserve the right to modify this return policy at any time. Changes will be posted on our website and will apply to purchases made after the posting date. The return policy in effect at the time of your purchase will apply to that order.</p>
                            </div>
                        </div>
                    </div>

                    {/* Contact Information */}
                    <div className="mt-10 sm:mt-12 bg-indigo-50 p-6 sm:p-8 rounded-md border border-gray-200">
                        <h3 className="text-base sm:text-lg font-semibold text-indigo-900 mb-4">Contact Information</h3>
                        <p className="mb-4 text-sm text-indigo-800">If you have any questions about our return policy, please contact us:</p>
                        <ul className="space-y-3 text-sm text-indigo-800">
                            <li className="flex items-center">
                                <span className="font-medium mr-2">Email:</span> returns@legocustoms.com
                            </li>
                            <li className="flex items-center">
                                <span className="font-medium mr-2">Customer Service Hours:</span> Monday-Friday, 9:00 AM - 5:00 PM
                            </li>
                        </ul>
                        <p className="mt-4 text-sm text-indigo-800">We will get back to you within 48 hours.</p>
                    </div>
                    
                    {/* Footer Notes */}
                    <div className="text-center pt-6 sm:pt-8">
                        <p className="text-sm text-gray-700">
                            If you have any questions about our refund policy, please 
                            <span className="text-indigo-600 cursor-pointer hover:text-indigo-800 font-medium px-1">contact us</span> 
                            before making a purchase.
                        </p>
                        
                        <p className="mt-4 sm:mt-6 text-xs text-gray-500 italic">
                            Last Updated: March 31, 2025
                        </p>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Refund
