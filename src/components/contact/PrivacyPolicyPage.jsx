import { useState } from 'react'
import Navbar from '../front_page/Navbar'
import Footer from '../front_page/Footer'

const PrivacyPolicyPage = () => {
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
                    <h2 className="text-3xl font-bold tracking-tight text-balance text-gray-900 sm:text-5xl">Privacy Policy</h2>
                </div>

                <div className="max-w-3xl mx-auto text-gray-700 space-y-8 sm:space-y-12">
                    <div className="hidden sm:block border-t border-gray-200 my-8"></div>

                    <div className="space-y-6 sm:space-y-8">
                        <div className="bg-white overflow-hidden">
                            <p className="text-sm font-bold text-indigo-600 uppercase tracking-wider px-4 sm:px-6 pt-6 pb-1">1. Introduction</p>
                            <div className="px-4 sm:px-6 py-5 sm:py-6">
                                <p className="text-sm text-gray-700">This Privacy Policy outlines how MinifigsMania ("we", "our", or "us") collects, uses, and protects your information when you use our services, visit our website, or interact with our mobile applications. By accessing or using our services, you agree to the terms of this Privacy Policy.</p>
                            </div>
                        </div>

                        <div className="hidden sm:block border-t border-gray-200 my-8"></div>

                        <div className="bg-white overflow-hidden">
                            <p className="text-sm font-bold text-indigo-600 uppercase tracking-wider px-4 sm:px-6 pt-6 pb-1">2. Data Collection</p>
                            <div className="px-4 sm:px-6 py-5 sm:py-6">
                                <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
                                    <li>We collect information you provide when placing an order, creating an account, or contacting support.</li>
                                    <li>Information collected includes your name, email, address, payment details, and purchase history.</li>
                                </ul>
                            </div>
                        </div>

                        <div className="hidden sm:block border-t border-gray-200 my-8"></div>

                        <div className="bg-white overflow-hidden">
                            <p className="text-sm font-bold text-indigo-600 uppercase tracking-wider px-4 sm:px-6 pt-6 pb-1">3. Use of Information</p>
                            <div className="px-4 sm:px-6 py-5 sm:py-6">
                                <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
                                    <li>To process and fulfill your orders.</li>
                                    <li>To communicate order status, promotional offers, and updates.</li>
                                    <li>To improve user experience and site functionality.</li>
                                    <li>To prevent fraud and ensure the security of our platform.</li>
                                    <li>To personalize your shopping experience and provide relevant recommendations.</li>
                                    <li>To comply with legal obligations and enforce our terms of service.</li>
                                </ul>
                            </div>
                        </div>

                        <div className="hidden sm:block border-t border-gray-200 my-8"></div>

                        <div className="bg-white overflow-hidden">
                            <p className="text-sm font-bold text-indigo-600 uppercase tracking-wider px-4 sm:px-6 pt-6 pb-1">4. Legal Basis for Processing</p>
                            <div className="px-4 sm:px-6 py-5 sm:py-6">
                                <p className="text-sm text-gray-700">We process your personal data based on the following legal grounds:</p>
                                <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700 mt-3">
                                    <li><span className="font-medium">Contract:</span> Processing necessary for the performance of our contract with you.</li>
                                    <li><span className="font-medium">Consent:</span> Processing based on your explicit consent.</li>
                                    <li><span className="font-medium">Legitimate Interest:</span> Processing necessary for our legitimate business interests.</li>
                                    <li><span className="font-medium">Legal Obligation:</span> Processing necessary to comply with our legal obligations.</li>
                                </ul>
                            </div>
                        </div>

                        <div className="hidden sm:block border-t border-gray-200 my-8"></div>

                        <div className="bg-white overflow-hidden">
                            <p className="text-sm font-bold text-indigo-600 uppercase tracking-wider px-4 sm:px-6 pt-6 pb-1">5. Cookie Policy</p>
                            <div className="px-4 sm:px-6 py-5 sm:py-6">
                                <p className="text-sm text-gray-700">We may use cookies and similar technologies to enhance your browsing experience. These include:</p>
                                <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700 mt-3">
                                    <li><span className="font-medium">Essential Cookies:</span> Required for core website functionality.</li>
                                    <li><span className="font-medium">Analytical Cookies:</span> Help us understand how users interact with our website.</li>
                                    <li><span className="font-medium">Functional Cookies:</span> Remember your preferences to provide enhanced functionality.</li>
                                    <li><span className="font-medium">Targeting Cookies:</span> Used to deliver relevant advertisements and marketing communications.</li>
                                </ul>
                                <p className="text-sm text-gray-700 mt-3">You can manage cookie preferences through your browser settings.</p>
                            </div>
                        </div>

                        <div className="hidden sm:block border-t border-gray-200 my-8"></div>

                        <div className="bg-white overflow-hidden">
                            <p className="text-sm font-bold text-indigo-600 uppercase tracking-wider px-4 sm:px-6 pt-6 pb-1">6. Data Sharing</p>
                            <div className="px-4 sm:px-6 py-5 sm:py-6">
                                <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
                                    <li>We do not sell your data.</li>
                                    <li>We only share information with trusted third-party services like:</li>
                                    <ul className="list-circle pl-5 space-y-1 text-sm text-gray-700 mt-2">
                                        <li>Payment processors (Stripe) for transaction processing</li>
                                        <li>Shipping providers (Royal Mail) for order fulfillment</li>
                                        <li>Email service providers for communications</li>
                                    </ul>
                                    <li className="mt-2">We may also disclose information when required by law or to protect our rights and safety.</li>
                                </ul>
                            </div>
                        </div>

                        <div className="hidden sm:block border-t border-gray-200 my-8"></div>

                        <div className="bg-white overflow-hidden">
                            <p className="text-sm font-bold text-indigo-600 uppercase tracking-wider px-4 sm:px-6 pt-6 pb-1">7. International Data Transfers</p>
                            <div className="px-4 sm:px-6 py-5 sm:py-6">
                                <p className="text-sm text-gray-700">We do not operate outside of the United Kingdom.</p>
                            </div>
                        </div>

                        <div className="hidden sm:block border-t border-gray-200 my-8"></div>

                        <div className="bg-white overflow-hidden">
                            <p className="text-sm font-bold text-indigo-600 uppercase tracking-wider px-4 sm:px-6 pt-6 pb-1">8. Data Security</p>
                            <div className="px-4 sm:px-6 py-5 sm:py-6">
                                <p className="text-sm text-gray-700">We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet or electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your personal data, we cannot guarantee its absolute security.</p>
                            </div>
                        </div>

                        <div className="hidden sm:block border-t border-gray-200 my-8"></div>

                        <div className="bg-white overflow-hidden">
                            <p className="text-sm font-bold text-indigo-600 uppercase tracking-wider px-4 sm:px-6 pt-6 pb-1">9. Data Retention</p>
                            <div className="px-4 sm:px-6 py-5 sm:py-6">
                                <p className="text-sm text-gray-700">We retain your personal data for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law. For tax and accounting purposes, we may retain certain information for up to 7 years. You may request deletion of your data at any time, and we will comply unless we have a legitimate reason to retain it.</p>
                            </div>
                        </div>

                        <div className="hidden sm:block border-t border-gray-200 my-8"></div>

                        <div className="bg-white overflow-hidden">
                            <p className="text-sm font-bold text-indigo-600 uppercase tracking-wider px-4 sm:px-6 pt-6 pb-1">10. Children's Privacy</p>
                            <div className="px-4 sm:px-6 py-5 sm:py-6">
                                <p className="text-sm text-gray-700">Our services are not directed to individuals under the age of 16. We do not knowingly collect personal information from children. If we become aware that we have collected personal data from a child without verification of parental consent, we will take steps to remove that information from our servers. If you believe we might have any information from or about a child, please contact us.</p>
                            </div>
                        </div>

                        <div className="hidden sm:block border-t border-gray-200 my-8"></div>

                        <div className="bg-white overflow-hidden">
                            <p className="text-sm font-bold text-indigo-600 uppercase tracking-wider px-4 sm:px-6 pt-6 pb-1">11. Your Rights</p>
                            <div className="px-4 sm:px-6 py-5 sm:py-6">
                                <p className="text-sm text-gray-700">Depending on your location, you may have the following rights regarding your personal data:</p>
                                <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700 mt-3">
                                    <li><span className="font-medium">Right to Access:</span> You can request information about the personal data we hold about you.</li>
                                    <li><span className="font-medium">Right to Rectification:</span> You can request correction of inaccurate data.</li>
                                    <li><span className="font-medium">Right to Deletion:</span> You can request deletion of your personal data.</li>
                                    <li><span className="font-medium">Right to Restriction:</span> You can request restriction of processing your data.</li>
                                    <li><span className="font-medium">Right to Data Portability:</span> You can request transfer of your data to another service.</li>
                                    <li><span className="font-medium">Right to Object:</span> You can object to processing of your data.</li>
                                    <li><span className="font-medium">Right to Withdraw Consent:</span> You can withdraw consent at any time.</li>
                                </ul>
                                <p className="text-sm text-gray-700 mt-3">Contact us at privacy@minifigstore.example.com to exercise these rights. We may need to verify your identity before responding to your request.</p>
                            </div>
                        </div>

                        <div className="hidden sm:block border-t border-gray-200 my-8"></div>

                        <div className="bg-white overflow-hidden">
                            <p className="text-sm font-bold text-indigo-600 uppercase tracking-wider px-4 sm:px-6 pt-6 pb-1">12. Changes to Policy</p>
                            <div className="px-4 sm:px-6 py-5">
                                <p className="text-sm text-gray-700">We may update this Privacy Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. The revised policy will be effective immediately upon posting on this page. We encourage you to review this Privacy Policy periodically to stay informed about how we collect, use, and protect your information. Your continued use of our services after changes to this policy constitutes acceptance of the updated terms.</p>
                            </div>
                        </div>

                        <div className="hidden sm:block border-t border-gray-200 my-8"></div>

                        <div className="bg-white overflow-hidden">
                            <p className="text-sm font-bold text-indigo-600 uppercase tracking-wider px-4 sm:px-6 pt-6 pb-1">13. Contact</p>
                            <div className="px-4 sm:px-6 py-5">
                                <p className="text-sm text-gray-700">If you have any questions or concerns regarding our Privacy Policy or our data practices, please contact our Privacy Officer at privacy@minifigstore.example.com.</p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-10 sm:mt-12 bg-indigo-50 p-6 sm:p-8 rounded-md border border-gray-200">
                        <h3 className="text-base sm:text-lg font-semibold text-indigo-900 mb-4">Contact Information</h3>
                        <p className="mb-4 text-sm text-indigo-800">For privacy-related inquiries, contact us:</p>
                        <ul className="space-y-3 text-sm text-indigo-800">
                            <li className="flex items-center">
                                <span className="font-medium mr-2">Email:</span> privacy@minifigstore.example.com
                            </li>
                            <li className="flex items-center">
                                <span className="font-medium mr-2">Postal Address:</span> MinifigsMania, 123 Brick Street, Toy City, TC 12345
                            </li>
                            <li className="flex items-center">
                                <span className="font-medium mr-2">Support Hours:</span> Monday-Friday, 9:00 AM - 5:00 PM EST
                            </li>
                        </ul>
                        <p className="mt-4 text-sm text-indigo-800">We aim to respond to all privacy-related inquiries within 48 hours.</p>
                    </div>

                    <div className="text-center pt-6 sm:pt-8">
                        <p className="text-sm text-gray-700">
                            If you have any questions about our privacy practices, please 
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

export default PrivacyPolicyPage