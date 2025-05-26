import { useState } from 'react'
import Navbar from '../front_page/Navbar'
import Footer from '../front_page/Footer'

const TermsAndConditionsPage = () => {
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
                    <h2 className="text-3xl font-bold tracking-tight text-balance text-gray-900 sm:text-5xl">Terms & Conditions</h2>
                </div>

                {/* Main Content */}
                <div className="max-w-3xl mx-auto text-gray-700 space-y-8 sm:space-y-12">
                    <div className="hidden sm:block border-t border-gray-200 my-8"></div>

                    
                    <div className="space-y-6 sm:space-y-8">
                        {/* RETURN ELIGIBILITY */}
                        <div className="bg-white overflow-hidden">
                            <p className="text-sm font-bold text-indigo-600 uppercase tracking-wider px-4 sm:px-6 pt-6 pb-1">1. Introduction</p>
                            
                            <div className="px-4 sm:px-6 py-5 sm:py-6">
                                <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
                                    <li>These terms and conditions govern your use of our website and your purchases from MinifigsMania.</li>
                                    <li>By accessing our site or placing an order, you confirm that you have read, understood, and agreed to these terms.</li>
                                    <li>If you do not agree with any part of these terms, please do not use our website.</li>
                                </ul>
                            </div>
                        </div>

                        {/* Divider */}
                        <div className="hidden sm:block border-t border-gray-200 my-8"></div>

                        {/* NON-RETURNABLE ITEMS */}
                        <div className="bg-white overflow-hiddenborder-gray-200">
                            <p className="text-sm font-bold text-indigo-600 uppercase tracking-wider px-4 sm:px-6 pt-6 pb-1">2. Products</p>
                            
                            <div className="px-4 sm:px-6 py-5 sm:py-6">
                                <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
                                    <li>All products listed are described to the best of our ability. Some items may be pre-owned or removed from original packaging — this will be clearly stated in the product condition tab.</li>
                                    <li>Images are for illustrative purposes only and may differ slightly from the actual product.</li>
                                    <li>We reserve the right to modify or discontinue products at any time without prior notice.</li>
                                </ul>
                            </div>
                        </div>

                        {/* Divider */}
                        <div className="hidden sm:block border-t border-gray-200 my-8"></div>

                        {/* RETURN PROCESS */}
                        <div className="bg-white rounded-xl overflow-hidden">
                            <p className="text-sm font-bold text-indigo-600 uppercase tracking-wider px-4 sm:px-6 pt-6 pb-1">3. Orders</p>
                            
                            <div className="px-4 sm:px-6 py-5 sm:py-6">
                            <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
                                <li>Orders are subject to availability and acceptance. An order confirmation does not constitute acceptance; a contract is formed only once the order has been shipped.</li>
                                <li>We reserve the right to refuse or cancel orders due to pricing errors, suspected fraud, or supply issues.</li>
                                <li>You are responsible for ensuring your order details, including delivery address, are accurate at checkout.</li>
                            </ul>
                            </div>
                        </div>

                        {/* Divider */}
                        <div className="hidden sm:block border-t border-gray-200 my-8"></div>

                        {/* REFUND INFORMATION */}
                        <div className="bg-white rounded-xl overflow-hidden">
                            <p className="text-sm font-bold text-indigo-600 uppercase tracking-wider px-4 sm:px-6 pt-6 pb-1">4. Pricing & Payment</p>
                            
                            <div className="px-4 sm:px-6 py-5 sm:py-6">
                                <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
                                    <li>All prices are displayed in GBP (£).</li>
                                    <li>We accept payment via major credit and debit cards, Apple Pay, Google Pay, and other methods supported by Stripe.</li>
                                    <li>Payment is required at the time of purchase. We do not offer installment payments or credit terms.</li>
                                    <li>For more information about Stripe, please click <span className='text-indigo-600 cursor-pointer' onClick={() => window.open('https://stripe.com/gb', '_blank')}>here</span> to learn more.</li>
                                </ul>
                            </div>
                        </div>

                        {/* Divider */}
                        <div className="hidden sm:block border-t border-gray-200 my-8"></div>

                        {/* DEFECTIVE ITEMS */}
                        <div className="bg-white rounded-xl overflow-hidden">
                            <p className="text-sm font-bold text-indigo-600 uppercase tracking-wider px-4 sm:px-6 pt-6 pb-1">5. Shipping</p>
                            
                            <div className="px-4 sm:px-6 py-5 sm:py-6">
                                <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
                                    <li>We currently only ship within the United Kingdom using Royal Mail.</li>
                                    <li>Orders are typically dispatched within 48 hours of payment confirmation (excluding weekends and public holidays).</li>
                                    <li>Standard delivery times are 2–7 working days. However, delays may occur due to postal disruptions or holiday periods.</li>
                                    <li>Shipping costs are calculated at checkout based on weight and number of items.</li>
                                    <li>You will receive a confirmation email with tracking information once your order is dispatched.</li>
                                    <li>You can find more about our shipping options by clicking <span className='text-indigo-600 cursor-pointer' onClick={() => window.open('/shipping', '_blank')}>here</span>.</li>
                                </ul>
                            </div>
                        </div>

                        {/* Divider */}
                        <div className="hidden sm:block border-t border-gray-200 my-8"></div>

                        {/* EXCHANGES */}
                        <div className="bg-white rounded-xl overflow-hidden">
                            <p className="text-sm font-bold text-indigo-600 uppercase tracking-wider px-4 sm:px-6 pt-6 pb-1">6. Returns & Refunds</p>
                            
                            <div className="px-4 sm:px-6 py-5 sm:py-6">
                                <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
                                    <li>You have the right to return items within 30 days of receiving your order, provided the items are in their original condition and packaging.</li>
                                    <li>To initiate a return, contact our customer service at returns@minifigstore.example.com or use the return process in your account.</li>
                                    <li>Return shipping costs are the responsibility of the customer unless the item is faulty or incorrect. You may be required to show pictures before returning the item(s).</li>
                                    <li>Refunds will be processed within 5–10 working days after we receive and inspect the returned item.</li>
                                    <li>We reserve the right to refuse a return if items show signs of use or damage.</li>
                                    <li>To find out more about Refund & Returns, click <span className='text-indigo-600 cursor-pointer' onClick={() => window.open('/refund', '_blank')}>here</span>.</li>
                                </ul>
                            </div>
                        </div>

                        {/* Divider */}
                        <div className="hidden sm:block border-t border-gray-200 my-8"></div>

                        {/* INTERNATIONAL RETURNS */}
                        <div className="bg-white rounded-xl overflow-hidden">
                            <p className="text-sm font-bold text-indigo-600 uppercase tracking-wider px-4 sm:px-6 pt-6 pb-1">7. Account Registration</p>
                            
                            <div className="px-4 sm:px-6 py-5 sm:py-6">
                                <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
                                    <li>Creating an account allows you to track orders, manage returns, and view past purchases.</li>
                                    <li>You must provide accurate and complete information when registering and keep your account details up to date.</li>
                                    <li>You are responsible for maintaining the confidentiality of your account and password.</li>
                                    <li>We reserve the right to suspend or terminate accounts that violate these terms or engage in fraudulent activity.</li>
                                </ul>
                            </div>
                        </div>


                        <div className="hidden sm:block border-t border-gray-200 my-8"></div>

                        {/* INTERNATIONAL RETURNS */}
                        <div className="bg-white rounded-xl overflow-hidden">
                            <p className="text-sm font-bold text-indigo-600 uppercase tracking-wider px-4 sm:px-6 pt-6 pb-1">8. Privacy & Data Protection</p>
                            
                            <div className="px-4 sm:px-6 py-5 sm:py-6">
                                <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
                                    <li>We collect and use your personal data in accordance with our Privacy Policy, available on our website.</li>
                                    <li>We use industry-standard security measures, including SSL and Stripe for secure payments.</li>
                                    <li>Your personal information will never be sold or shared with third parties for marketing purposes.</li>
                                </ul>
                            </div>
                        </div>

                        

                        {/* Divider */}
                        <div className="hidden sm:block border-t border-gray-200 my-8"></div>

                        {/* POLICY MODIFICATIONS */}
                        <div className="bg-white rounded-xl overflow-hidden">
                            <p className="text-sm font-bold text-indigo-600 uppercase tracking-wider px-4 sm:px-6 pt-6 pb-1">9. POLICY MODIFICATIONS</p>
                            
                            <div className="px-4 sm:px-6 py-5">
                                <p className="text-sm text-gray-700">We reserve the right to modify this return policy at any time. Changes will be posted on our website and will apply to purchases made after the posting date. The return policy in effect at the time of your purchase will apply to that order.</p>
                            </div>
                        </div>

                        {/* Divider */}
                        <div className="hidden sm:block border-t border-gray-200 my-8"></div>

                        {/* POLICY MODIFICATIONS */}
                        <div className="bg-white rounded-xl overflow-hidden">
                            <p className="text-sm font-bold text-indigo-600 uppercase tracking-wider px-4 sm:px-6 pt-6 pb-1">10. Contact Information</p>
                            
                            <div className="px-4 sm:px-6 py-5">
                                <p className="text-sm text-gray-700">If you have any questions about these Terms & Conditions, please contact us at support@minifigstore.example.com.</p>
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
                            If you have any questions about our terms and conditions, please 
                            <span className="text-indigo-600 cursor-pointer hover:text-indigo-800 font-medium px-1">contact us</span> 
                            before making a purchase.
                        </p>
                        
                        <p className="mt-4 sm:mt-6 text-xs text-gray-500 italic">
                            Last Updated: May 20, 2025
                        </p>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default TermsAndConditionsPage
