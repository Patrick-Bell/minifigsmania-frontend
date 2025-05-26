import { useState, useEffect } from 'react'

const MobileModal = ({ isOpen, setIsOpen }) => {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        if (isOpen) {
            setIsVisible(true)
        }
    }, [isOpen])

    const handleClose = () => {
        setIsVisible(false)
        setTimeout(() => setIsOpen(false), 200)
    }

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            {/* Backdrop */}
            <div 
                className={`fixed inset-0 bg-black transition-opacity duration-300 ${
                    isVisible ? 'opacity-60' : 'opacity-0'
                }`}
                style={{ backdropFilter: 'blur(4px)' }}
                onClick={handleClose}
            />
            
            {/* Modal */}
            <div className="flex min-h-full items-center justify-center p-4">
                <div 
                    className={`relative w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-8 shadow-2xl transition-all duration-300 border border-gray-100 ${
                        isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                    }`}
                >
                    {/* Close Button */}
                    <button
                        onClick={handleClose}
                        className="absolute right-4 top-4 rounded-full p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
                    >
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    {/* Header */}
                    <div className="text-center mb-6">
                        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-indigo-600 mb-4">
                            <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
                            </svg>
                        </div>
                        
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">
                            Mobile Experience
                        </h3>
                        
                        <p className="text-gray-600 text-base leading-relaxed">
                            For the best mobile experience, please scan the QR code below with your phone's camera
                        </p>
                    </div>

                    {/* QR Code Section */}
                    <div className="flex justify-center mb-6">
                        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 border-2 border-dashed border-gray-300">
                            <div className="w-32 h-32 bg-white rounded-lg shadow-inner flex items-center justify-center border relative">
                                {/* QR Code Pattern */}
                                <div className="absolute inset-2 grid grid-cols-8 gap-px">
                                    {Array.from({ length: 64 }).map((_, i) => (
                                        <div
                                            key={i}
                                            className={`rounded-sm ${
                                                Math.random() > 0.5 ? 'bg-gray-900' : 'bg-transparent'
                                            }`}
                                        />
                                    ))}
                                </div>
                                {/* Corner squares */}
                                <div className="absolute top-1 left-1 w-6 h-6 border-2 border-gray-900 rounded">
                                    <div className="w-2 h-2 bg-gray-900 rounded absolute top-1 left-1" />
                                </div>
                                <div className="absolute top-1 right-1 w-6 h-6 border-2 border-gray-900 rounded">
                                    <div className="w-2 h-2 bg-gray-900 rounded absolute top-1 left-1" />
                                </div>
                                <div className="absolute bottom-1 left-1 w-6 h-6 border-2 border-gray-900 rounded">
                                    <div className="w-2 h-2 bg-gray-900 rounded absolute top-1 left-1" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Instructions */}
                    <div className="bg-blue-50 rounded-xl p-4 mb-6 border border-blue-100">
                        <div className="flex items-start space-x-3">
                            <div className="flex-shrink-0">
                                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                                    <span className="text-white text-xs font-bold">i</span>
                                </div>
                            </div>
                            <div className="text-sm text-blue-800">
                                <p className="font-medium mb-1">How to scan:</p>
                                <p>Open your phone's camera app and point it at the QR code. Tap the notification that appears to open the mobile site.</p>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col space-y-3">
                        <button
                            onClick={handleClose}
                            className="w-full rounded-xl bg-indigo-600 px-6 py-3 text-base font-semibold text-white shadow-lg cursor-pointer"
                        >
                            Continue on Desktop
                        </button>
                        
                        <button
                            onClick={handleClose}
                            className="w-full rounded-xl border-2 border-gray-200 px-6 py-3 text-base font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 focus:outline-none cursor-pointer"
                        >
                            Maybe Later
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MobileModal