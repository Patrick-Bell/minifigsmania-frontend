import { useState } from 'react'
import Navbar from '../front_page/Navbar'
import Footer from '../front_page/Footer'

const PaymentsPage = () => {
    return (
        <>
            <Navbar />
            
            <div className="isolate bg-white px-4 sm:px-6 py-16 sm:py-24 lg:px-8 mx-auto">
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

                <div className="mx-auto max-w-2xl text-center mb-12 sm:mb-16">
                    <p className="font-bold text-indigo-600 text-xs sm:text-sm tracking-widest mb-2 sm:mb-3">INFORMATION</p>
                    <h2 className="text-3xl font-bold tracking-tight text-balance text-gray-900 sm:text-5xl">Payment Information</h2>
                </div>

                <div className="max-w-3xl mx-auto text-gray-700 space-y-8 sm:space-y-12">
                    <div className="hidden sm:block border-t border-gray-200 my-8"></div>

                    <div className="space-y-6 sm:space-y-8">
                        <div className="bg-white overflow-hidden">
                            <p className="text-sm font-bold text-indigo-600 uppercase tracking-wider px-4 sm:px-6 pt-6 pb-1">1. Introduction</p>
                            <div className="px-4 sm:px-6 py-5 sm:py-6">
                                <p className="text-sm text-gray-700">This Payment Policy explains the payment methods and processes accepted by MinifigsMania ("we", "our", or "us") for purchases made on our website. We are committed to providing secure, convenient payment options while ensuring the protection of your personal and financial information.</p>
                            </div>
                        </div>

                        <div className="hidden sm:block border-t border-gray-200 my-8"></div>

                        <div className="bg-white overflow-hidden">
                            <p className="text-sm font-bold text-indigo-600 uppercase tracking-wider px-4 sm:px-6 pt-6 pb-1">2. Payment Processing Partner</p>
                            <div className="px-4 sm:px-6 py-5 sm:py-6">
                                <p className="text-sm text-gray-700">We partner with Stripe for all our payment processing needs. Stripe is a globally recognized payment processor that handles billions of dollars every year for businesses of all sizes around the world.</p>
                                <p className="text-sm text-gray-700 mt-3">Stripe features and credentials:</p>
                                <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700 mt-3">
                                    <li>Founded in 2010, Stripe processes payments for millions of businesses worldwide</li>
                                    <li>Processes over $500 billion in transactions annually</li>
                                    <li>Used by major global companies including Amazon, Google, Shopify, and Zoom</li>
                                    <li>PCI Service Provider Level 1 certified (the highest level of certification)</li>
                                    <li>Implements advanced fraud prevention and security measures to protect transactions</li>
                                    <li>Compliant with international security standards and regulations</li>
                                </ul>
                                <p className="text-sm text-gray-700 mt-3">By partnering with Stripe, we ensure that your payment data is handled with industry-leading security protocols and that your transactions are processed efficiently and reliably.</p>
                            </div>
                        </div>

                        <div className="hidden sm:block border-t border-gray-200 my-8"></div>

                        <div className="bg-white overflow-hidden">
                            <p className="text-sm font-bold text-indigo-600 uppercase tracking-wider px-4 sm:px-6 pt-6 pb-1">3. Accepted Payment Methods</p>
                            <div className="px-4 sm:px-6 py-5 sm:py-6">
                                <p className="text-sm text-gray-700">We currently accept the following payment methods through our Stripe integration:</p>
                                <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700 mt-3">
                                    <li><span className="font-medium">Credit/Debit Cards:</span> We accept all major credit and debit cards, including:
                                        <ul className="list-circle pl-5 space-y-1 mt-1">
                                            <li>Visa</li>
                                            <li>Mastercard</li>
                                            <li>American Express</li>
                                            <li>Discover</li>
                                            <li>JCB</li>
                                            <li>Diners Club</li>
                                        </ul>
                                    </li>
                                    <li><span className="font-medium">Digital Wallets:</span> We support the following digital payment methods:
                                        <ul className="list-circle pl-5 space-y-1 mt-1">
                                            <li>Apple Pay (supported on Safari browser and iPhone/iPad devices)</li>
                                            <li>Google Pay</li>
                                        </ul>
                                    </li>
                                </ul>
                                <p className="text-sm text-gray-700 mt-3">Browser compatibility for Apple Pay:</p>
                                <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700 mt-3">
                                    <li>Safari on macOS 10.14 or later</li>
                                    <li>Safari on iOS 10 or later</li>
                                    <li>Please note that Apple Pay is not supported on Chrome, Firefox, or other browsers, even on Apple devices</li>
                                </ul>
                            </div>
                        </div>

                        <div className="hidden sm:block border-t border-gray-200 my-8"></div>

                        <div className="bg-white overflow-hidden">
                            <p className="text-sm font-bold text-indigo-600 uppercase tracking-wider px-4 sm:px-6 pt-6 pb-1">4. Future Payment Options</p>
                            <div className="px-4 sm:px-6 py-5 sm:py-6">
                                <p className="text-sm text-gray-700">We are constantly working to expand our payment options. In the future, we plan to introduce:</p>
                                <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700 mt-3">
                                    <li><span className="font-medium">Payment Gateway:</span> We are looking into implementing PayPal as our second payment gateway.</li>
                                    <li><span className="font-medium">Cash Payments:</span> We are developing options for cash payment upon delivery for local orders.</li>
                                    <li><span className="font-medium">Pay in Installments:</span> We are exploring partnerships to offer "buy now, pay later" options that would allow you to split your payment into smaller installments.</li>
                                </ul>
                                <p className="text-sm text-gray-700 mt-3">We will update this Payment Policy when these additional payment methods become available.</p>
                            </div>
                        </div>

                        <div className="hidden sm:block border-t border-gray-200 my-8"></div>

                        <div className="bg-white overflow-hidden">
                            <p className="text-sm font-bold text-indigo-600 uppercase tracking-wider px-4 sm:px-6 pt-6 pb-1">5. Payment Security</p>
                            <div className="px-4 sm:px-6 py-5 sm:py-6">
                                <p className="text-sm text-gray-700">Protecting your payment information is our top priority. Here's how we ensure the security of your transactions:</p>
                                <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700 mt-3">
                                    <li><span className="font-medium">PCI Compliance:</span> Our payment processing is fully PCI DSS (Payment Card Industry Data Security Standard) compliant.</li>
                                    <li><span className="font-medium">Secure Transmission:</span> All payment data is encrypted using TLS (Transport Layer Security) during transmission.</li>
                                    <li><span className="font-medium">No Card Storage:</span> We do not store your complete credit card information on our servers. Card details are securely handled by Stripe.</li>
                                    <li><span className="font-medium">Fraud Prevention:</span> We utilize Stripe's advanced fraud detection systems to protect both our customers and our business from fraudulent transactions.</li>
                                </ul>
                                <p className="text-sm text-gray-700 mt-3">For additional security, we implement the following measures:</p>
                                <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700 mt-3">
                                    <li><span className="font-medium">3D Secure:</span> For card payments, we use 3D Secure (Verified by Visa, Mastercard SecureCode, American Express SafeKey) where applicable to provide an additional layer of security.</li>
                                    <li><span className="font-medium">Address Verification System (AVS):</span> This system checks if the billing address provided matches the one on file with the card issuer.</li>
                                </ul>
                            </div>
                        </div>

                        <div className="hidden sm:block border-t border-gray-200 my-8"></div>

                        <div className="bg-white overflow-hidden">
                            <p className="text-sm font-bold text-indigo-600 uppercase tracking-wider px-4 sm:px-6 pt-6 pb-1">6. Payment Process</p>
                            <div className="px-4 sm:px-6 py-5 sm:py-6">
                                <p className="text-sm text-gray-700">When you make a purchase on our website, the payment process works as follows:</p>
                                <ol className="list-decimal pl-5 space-y-2 text-sm text-gray-700 mt-3">
                                    <li>You select your products and proceed to checkout.</li>
                                    <li>You enter your shipping and billing information.</li>
                                    <li>You select your preferred payment method from the available options.</li>
                                    <li>For card payments, you enter your card details directly into Stripe's secure payment form.</li>
                                    <li>For Apple Pay or Google Pay, you authorize the payment using your device's authentication method (Face ID, Touch ID, passcode, etc.).</li>
                                    <li>Stripe processes the payment and sends a confirmation to our system.</li>
                                    <li>Once the payment is confirmed, your order is processed and a confirmation email is sent to you.</li>
                                </ol>
                                <p className="text-sm text-gray-700 mt-3">The entire payment process typically takes just a few seconds to complete.</p>
                            </div>
                        </div>

                        <div className="hidden sm:block border-t border-gray-200 my-8"></div>

                        <div className="bg-white overflow-hidden">
                            <p className="text-sm font-bold text-indigo-600 uppercase tracking-wider px-4 sm:px-6 pt-6 pb-1">7. Billing and Receipts</p>
                            <div className="px-4 sm:px-6 py-5 sm:py-6">
                                <p className="text-sm text-gray-700">After your purchase is complete:</p>
                                <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700 mt-3">
                                    <li>An order confirmation email will be sent to your registered email address immediately.</li>
                                    <li>A detailed receipt will be included in the email and also available in your account dashboard.</li>
                                    <li>The charge on your bank statement will appear as "MINIFIGSMANIA" or "STRIPE*MINIFIGSMANIA".</li>
                                </ul>
                                <p className="text-sm text-gray-700 mt-3">If you need additional copies of your receipt or have questions about a charge, you can:</p>
                                <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700 mt-3">
                                    <li>Log in to your account and view your order history</li>
                                    <li>Contact our customer support team at support@minifigstore.example.com</li>
                                </ul>
                            </div>
                        </div>

                        <div className="hidden sm:block border-t border-gray-200 my-8"></div>

                        <div className="bg-white overflow-hidden">
                            <p className="text-sm font-bold text-indigo-600 uppercase tracking-wider px-4 sm:px-6 pt-6 pb-1">8. Currency and Pricing</p>
                            <div className="px-4 sm:px-6 py-5 sm:py-6">
                                <p className="text-sm text-gray-700">All prices on our website are listed in GBP. We only operate within the United Kingdom.</p>
                            </div>
                        </div>

                        <div className="hidden sm:block border-t border-gray-200 my-8"></div>

                        <div className="bg-white overflow-hidden">
                            <p className="text-sm font-bold text-indigo-600 uppercase tracking-wider px-4 sm:px-6 pt-6 pb-1">9. Refunds and Cancellations</p>
                            <div className="px-4 sm:px-6 py-5 sm:py-6">
                                <p className="text-sm text-gray-700">If you need to request a refund or cancel an order:</p>
                                <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700 mt-3">
                                    <li>Refunds are processed through the same payment method used for the original purchase.</li>
                                    <li>Refunds typically take 5-10 business days to appear on your statement, depending on your payment provider's policies.</li>
                                    <li>For orders that have not yet shipped, cancellations and refunds can typically be processed immediately.</li>
                                    <li>For orders that have already shipped, please refer to our Return Policy for detailed instructions.</li>
                                </ul>
                                <p className="text-sm text-gray-700 mt-3">For more information about our refund policies, please visit our <span onClick={() => window.open('/refund', '_blank')} className="text-indigo-600 hover:text-indigo-800 cursor-pointer">Refund Policy</span> page.</p>
                            </div>
                        </div>

                        <div className="hidden sm:block border-t border-gray-200 my-8"></div>

                        <div className="bg-white overflow-hidden">
                            <p className="text-sm font-bold text-indigo-600 uppercase tracking-wider px-4 sm:px-6 pt-6 pb-1">10. Privacy and Data Protection</p>
                            <div className="px-4 sm:px-6 py-5 sm:py-6">
                                <p className="text-sm text-gray-700">We take the privacy and protection of your payment information very seriously. For detailed information about how we handle your personal and payment data, please review our <span onClick={() => window.open('/privacy-policy', '_blank')} className="text-indigo-600 hover:text-indigo-800 cursor-pointer">Privacy Policy</span>.</p>
                                <p className="text-sm text-gray-700 mt-3">Key points regarding payment data:</p>
                                <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700 mt-3">
                                    <li>Your payment details are never stored on our servers</li>
                                    <li>All payment information is encrypted during transmission</li>
                                    <li>We do not share your payment information with third parties except for our payment processor (Stripe)</li>
                                    <li>We comply with all applicable data protection regulations</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="mt-10 sm:mt-12 bg-indigo-50 p-6 sm:p-8 rounded-md border border-gray-200">
                        <h3 className="text-base sm:text-lg font-semibold text-indigo-900 mb-4">Payment Options Summary</h3>
                        <p className="mb-4 text-sm text-indigo-800">To summarize our current payment options:</p>
                        <ul className="space-y-3 text-sm text-indigo-800">
                            <li className="flex items-center">
                                <span className="font-medium mr-2">Cards Accepted:</span> Visa, Mastercard, American Express, Discover, JCB, Diners Club
                            </li>
                            <li className="flex items-center">
                                <span className="font-medium mr-2">Digital Wallets:</span> Apple Pay (Safari/iOS only), Google Pay
                            </li>
                            <li className="flex items-center">
                                <span className="font-medium mr-2">Payment Processor:</span> Stripe (PCI Level 1 certified)
                            </li>
                            <li className="flex items-center">
                                <span className="font-medium mr-2">Future Options:</span> PayPal, Cash payments, in-person payments, installment plans
                            </li>
                            <li className="flex items-center">
                                <span className="font-medium mr-2">Currency:</span> All prices displayed in GBP
                            </li>
                        </ul>
                        <p className="mt-4 text-sm text-indigo-800">This policy will be updated as our payment options evolve.</p>
                    </div>

                    <div className="text-center pt-6 sm:pt-8">
                        <p className="text-sm text-gray-700">
                            If you have any questions about our payment methods or encounter any issues during checkout, please 
                            <span className="text-indigo-600 cursor-pointer hover:text-indigo-800 font-medium px-1">contact us</span> 
                            immediately.
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

export default PaymentsPage