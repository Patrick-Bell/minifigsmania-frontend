import { useState } from 'react'
import Navbar from '../front_page/Navbar'
import Footer from '../front_page/Footer'

const CookiesPage = () => {
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
                    <p className="font-bold text-indigo-600 text-xs sm:text-sm tracking-widest mb-2 sm:mb-3">POLICY</p>
                    <h2 className="text-3xl font-bold tracking-tight text-balance text-gray-900 sm:text-5xl">Cookie Policy</h2>
                </div>

                <div className="max-w-3xl mx-auto text-gray-700 space-y-8 sm:space-y-12">
                    <div className="hidden sm:block border-t border-gray-200 my-8"></div>

                    <div className="space-y-6 sm:space-y-8">
                        <div className="bg-white overflow-hidden">
                            <p className="text-sm font-bold text-indigo-600 uppercase tracking-wider px-4 sm:px-6 pt-6 pb-1">1. Introduction</p>
                            <div className="px-4 sm:px-6 py-5 sm:py-6">
                                <p className="text-sm text-gray-700">This Cookie Policy explains how MinifigsMania ("we", "our", or "us") uses cookies and similar technologies on our website and online services. This policy provides you with clear and comprehensive information about the cookies we use and the purposes for which we use them.</p>
                            </div>
                        </div>

                        <div className="hidden sm:block border-t border-gray-200 my-8"></div>

                        <div className="bg-white overflow-hidden">
                            <p className="text-sm font-bold text-indigo-600 uppercase tracking-wider px-4 sm:px-6 pt-6 pb-1">2. What Are Cookies?</p>
                            <div className="px-4 sm:px-6 py-5 sm:py-6">
                                <p className="text-sm text-gray-700">Cookies are small text files that are stored on your device (computer, tablet, or mobile) when you visit a website. They allow the website to recognize your device and remember some information about your visit, like your preferences and settings. Cookies are widely used to make websites work more efficiently and provide a better browsing experience.</p>
                                <p className="text-sm text-gray-700 mt-3">Cookies can be "persistent" or "session" cookies. Persistent cookies remain on your device for a set period or until you delete them, while session cookies are deleted once you close your web browser.</p>
                            </div>
                        </div>

                        <div className="hidden sm:block border-t border-gray-200 my-8"></div>

                        <div className="bg-white overflow-hidden">
                            <p className="text-sm font-bold text-indigo-600 uppercase tracking-wider px-4 sm:px-6 pt-6 pb-1">3. How We Use Cookies</p>
                            <div className="px-4 sm:px-6 py-5 sm:py-6">
                                <p className="text-sm text-gray-700">We use cookies for the following purposes:</p>
                                <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700 mt-3">
                                    <li><span className="font-medium">Authentication:</span> We use cookies to identify you when you log in to our website. These cookies store your JSON Web Token (JWT), which is a secure method of transmitting information between parties as a JSON object. This enables you to navigate through our website without having to repeatedly log in during your browsing session.</li>
                                    <li><span className="font-medium">User Preferences:</span> We use cookies to remember your preferences and settings for future visits, including recently viewed products to enhance your shopping experience.</li>
                                </ul>
                                <p className="text-sm text-gray-700 mt-3">In the future, we may expand our use of cookies to include:</p>
                                <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700 mt-3">
                                    <li><span className="font-medium">Analytics:</span> To understand how visitors interact with our website by collecting and reporting information anonymously.</li>
                                    <li><span className="font-medium">Shopping Cart:</span> To remember items you have placed in your shopping cart during your session. We currently use LocalStorage for this.</li>
                                </ul>
                                <p className="text-sm text-gray-700 mt-3">We will update this Cookie Policy accordingly when we implement these additional cookie functionalities.</p>
                            </div>
                        </div>

                        <div className="hidden sm:block border-t border-gray-200 my-8"></div>

                        <div className="bg-white overflow-hidden">
                            <p className="text-sm font-bold text-indigo-600 uppercase tracking-wider px-4 sm:px-6 pt-6 pb-1">4. Types of Cookies We Use</p>
                            <div className="px-4 sm:px-6 py-5 sm:py-6">
                                <p className="text-sm text-gray-700">We currently use the following types of cookies:</p>
                                <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700 mt-3">
                                    <li><span className="font-medium">Essential cookies:</span> These cookies are strictly necessary for the operation of our website. They enable core functionality such as security, network management, and account access. You can set your browser to block these cookies, but some parts of the site may not function properly.</li>
                                    <li><span className="font-medium">Functional cookies:</span> These cookies help us remember your preferences and settings to enhance your experience on our site, such as keeping track of products you've recently viewed.</li>
                                </ul>
                                <p className="text-sm text-gray-700 mt-3">In the future, we may also implement:</p>
                                <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700 mt-3">
                                    <li><span className="font-medium">Analytical/performance cookies:</span> These cookies collect information about how visitors use our website, such as which pages visitors go to most often and if they receive error messages. These cookies don't collect information that identifies a visitor.</li>
                                </ul>
                            </div>
                        </div>

                        <div className="hidden sm:block border-t border-gray-200 my-8"></div>

                        <div className="bg-white overflow-hidden">
                            <p className="text-sm font-bold text-indigo-600 uppercase tracking-wider px-4 sm:px-6 pt-6 pb-1">5. Specific Cookies We Use</p>
                            <div className="px-4 sm:px-6 py-5 sm:py-6">
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200 text-sm">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cookie Name</th>
                                                <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Purpose</th>
                                                <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                                                <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            <tr>
                                                <td className="px-3 py-3 whitespace-nowrap text-xs text-gray-700">token</td>
                                                <td className="px-3 py-3 whitespace-nowrap text-xs text-gray-700">Authentication (JWT storage)</td>
                                                <td className="px-3 py-3 whitespace-nowrap text-xs text-gray-700">Session / 24 hours</td>
                                                <td className="px-3 py-3 whitespace-nowrap text-xs text-gray-700">Essential</td>
                                            </tr>
                                            <tr>
                                                <td className="px-3 py-3 whitespace-nowrap text-xs text-gray-700">recently_viewed</td>
                                                <td className="px-3 py-3 whitespace-nowrap text-xs text-gray-700">Stores recently viewed products</td>
                                                <td className="px-3 py-3 whitespace-nowrap text-xs text-gray-700">30 days</td>
                                                <td className="px-3 py-3 whitespace-nowrap text-xs text-gray-700">Functional</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <p className="text-sm text-gray-700 mt-4">This table will be updated as we implement additional cookies in the future.</p>
                            </div>
                        </div>

                        <div className="hidden sm:block border-t border-gray-200 my-8"></div>

                        <div className="bg-white overflow-hidden">
                            <p className="text-sm font-bold text-indigo-600 uppercase tracking-wider px-4 sm:px-6 pt-6 pb-1">6. Third-Party Cookies</p>
                            <div className="px-4 sm:px-6 py-5 sm:py-6">
                                <p className="text-sm text-gray-700">Currently, we do not use third-party cookies on our website. All cookies are set by us (first-party cookies) and are used solely for authentication purposes and enhancing user experience.</p>
                                <p className="text-sm text-gray-700 mt-3">In the future, if we implement analytics or other functionality that involves third-party cookies, we will update this policy to provide detailed information about those cookies, including their purposes and providers.</p>
                            </div>
                        </div>

                        <div className="hidden sm:block border-t border-gray-200 my-8"></div>

                        <div className="bg-white overflow-hidden">
                            <p className="text-sm font-bold text-indigo-600 uppercase tracking-wider px-4 sm:px-6 pt-6 pb-1">7. Managing and Disabling Cookies</p>
                            <div className="px-4 sm:px-6 py-5 sm:py-6">
                                <p className="text-sm text-gray-700">You can control and manage cookies in various ways. Please keep in mind that removing or blocking cookies can impact your user experience and parts of our website may no longer be fully accessible.</p>
                                <p className="text-sm text-gray-700 mt-3">Most browsers automatically accept cookies, but you can choose to accept or decline cookies through your browser controls. For information on how to manage cookies on your specific browser, please refer to your browser's help menu or the following links:</p>
                                <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700 mt-3">
                                    <li>Google Chrome: <span className="text-indigo-600">chrome://settings/cookies</span></li>
                                    <li>Mozilla Firefox: <span className="text-indigo-600">about:preferences#privacy</span></li>
                                    <li>Safari: Preferences {'>'} Privacy</li>
                                    <li>Microsoft Edge: Settings {'>'} Cookies and site permissions</li>
                                    <li>Internet Explorer: Tools {'>'} Internet Options {'>'} Privacy</li>
                                </ul>
                                <p className="text-sm text-gray-700 mt-3">Please note that if you choose to disable the authentication cookie, you will be unable to log in to your account or access features that require authentication. Additionally, disabling the recently_viewed cookie will prevent the site from remembering which products you have previously viewed.</p>
                            </div>
                        </div>

                        <div className="hidden sm:block border-t border-gray-200 my-8"></div>

                        <div className="bg-white overflow-hidden">
                            <p className="text-sm font-bold text-indigo-600 uppercase tracking-wider px-4 sm:px-6 pt-6 pb-1">8. Cookie Banner</p>
                            <div className="px-4 sm:px-6 py-5 sm:py-6">
                                <p className="text-sm text-gray-700">When you first visit our website, you may see a cookie banner informing you about our use of cookies. You can accept all cookies by clicking "Accept All" or manage your preferences by clicking "Manage Preferences." Currently, we use essential cookies for authentication and functional cookies for remembering your recently viewed products.</p>
                                <p className="text-sm text-gray-700 mt-3">As we expand our cookie usage in the future, this banner will be updated to offer more granular control over different types of cookies.</p>
                            </div>
                        </div>

                        <div className="hidden sm:block border-t border-gray-200 my-8"></div>

                        <div className="bg-white overflow-hidden">
                            <p className="text-sm font-bold text-indigo-600 uppercase tracking-wider px-4 sm:px-6 pt-6 pb-1">9. Privacy and Additional Information</p>
                            <div className="px-4 sm:px-6 py-5 sm:py-6">
                                <p className="text-sm text-gray-700">For more information about how we protect your privacy and data, please review our <span onClick={() => window.open('/privacy-policy', '_blank')} className="text-indigo-600 hover:text-indigo-800 cursor-pointer">Privacy Policy</span>.</p>
                                <p className="text-sm text-gray-700 mt-3">If you have any questions about our Cookie Policy or how we use cookies, please contact us:</p>
                                <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700 mt-3">
                                    <li>Email: privacy@minifigstore.example.com</li>
                                </ul>
                            </div>
                        </div>

                        <div className="hidden sm:block border-t border-gray-200 my-8"></div>

                        <div className="bg-white overflow-hidden">
                            <p className="text-sm font-bold text-indigo-600 uppercase tracking-wider px-4 sm:px-6 pt-6 pb-1">10. Changes to Our Cookie Policy</p>
                            <div className="px-4 sm:px-6 py-5 sm:py-6">
                                <p className="text-sm text-gray-700">We may update this Cookie Policy from time to time to reflect changes in our cookie practices or for other operational, legal, or regulatory reasons. The revised policy will be effective immediately upon posting on this page. We encourage you to review this Cookie Policy periodically to stay informed about our use of cookies.</p>
                                <p className="text-sm text-gray-700 mt-3">Each time you use our website, the current version of the Cookie Policy will apply. When we make significant changes to this policy, we will update the "Last Updated" date at the bottom of this page and, where appropriate, notify you by email or place a prominent notice on our website.</p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-10 sm:mt-12 bg-indigo-50 p-6 sm:p-8 rounded-md border border-gray-200">
                        <h3 className="text-base sm:text-lg font-semibold text-indigo-900 mb-4">Cookie Policy Summary</h3>
                        <p className="mb-4 text-sm text-indigo-800">To summarize our current cookie usage:</p>
                        <ul className="space-y-3 text-sm text-indigo-800">
                            <li className="flex items-center">
                                <span className="font-medium mr-2">Current Usage:</span> Authentication (JWT storage) and User Preferences (recently viewed products)
                            </li>
                            <li className="flex items-center">
                                <span className="font-medium mr-2">Third-Party Cookies:</span> None currently used
                            </li>
                            <li className="flex items-center">
                                <span className="font-medium mr-2">Essential Cookies:</span> Yes (for authentication)
                            </li>
                            <li className="flex items-center">
                                <span className="font-medium mr-2">Functional Cookies:</span> Yes (for recently viewed products)
                            </li>
                            <li className="flex items-center">
                                <span className="font-medium mr-2">Analytics Cookies:</span> Not currently used
                            </li>
                        </ul>
                        <p className="mt-4 text-sm text-indigo-800">This policy will be updated as our cookie usage evolves.</p>
                    </div>

                    <div className="text-center pt-6 sm:pt-8">
                        <p className="text-sm text-gray-700">
                            If you have any questions about our cookie practices, please 
                            <span className="text-indigo-600 cursor-pointer hover:text-indigo-800 font-medium px-1">contact us</span> 
                            before using our services.
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

export default CookiesPage