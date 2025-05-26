import React, { useState } from 'react';
import LoginPage from '../modals/LoginPage';
import Register from '../modals/Register';
import { ToyBrick, PackageOpen, Star } from 'lucide-react';

const SignInPromo = () => {
    const [isHovered, setIsHovered] = useState(false);
    const [openLoginModal, setOpenLoginModal] = useState(false);
    const [openRegisterModal, setOpenRegisterModal] = useState(false);
    
    return (
        <>
        <LoginPage isOpen={openLoginModal} setIsOpen={setOpenLoginModal} setRegisterModalOpen={setOpenRegisterModal}/>
        <Register isOpen={openRegisterModal} setIsOpen={setOpenRegisterModal} setOpenLogin={setOpenLoginModal} />

        <div className="bg-gradient-to-r from-indigo-700 to-purple-700 overflow-hidden max-w-7xl mx-auto my-8">
            <div className="flex flex-col md:flex-row">
                {/* Left side: Image/Graphic */}
                <div className="w-full md:w-2/5 relative overflow-hidden">
                    <div className="absolute inset-0 bg-blue-900 opacity-30 z-10"></div>
                    <div className="absolute inset-0 flex items-center justify-center z-20">
                        <div className="w-32 h-32 rounded-full bg-white flex items-center justify-center shadow-lg">
                            <span className="text-6xl"><ToyBrick className='text-indigo-600 h-24 w-24' /></span>
                        </div>
                    </div>
                    <div className="h-full min-h-48">
                        {/* Decorative elements */}
                        {Array(6).fill().map((_, i) => (
                            <div 
                                key={i}
                                className="absolute rounded-full bg-white opacity-10"
                                style={{
                                    width: `${Math.random() * 60 + 20}px`,
                                    height: `${Math.random() * 60 + 20}px`,
                                    top: `${Math.random() * 100}%`,
                                    left: `${Math.random() * 100}%`,
                                    animation: `float ${Math.random() * 8 + 5}s infinite ease-in-out`
                                }}
                            ></div>
                        ))}
                    </div>
                </div>
                
                {/* Right side: Content */}
                <div className="w-full md:w-3/5 p-6 md:p-8">
                    <h2 className="text-2xl md:text-3xl font-bold text-white">Join Our Community!</h2>
                    
                    <div className="mt-4 space-y-3">
                        <div className="flex items-center">
                            <div className="flex-shrink-0 w-6 h-6 mt-1 text-yellow-300">✓</div>
                            <p className="ml-1 text-white">Be first to know for new minifigure releases</p>
                        </div>
                        <div className="flex items-center">
                            <div className="flex-shrink-0 w-6 h-6 mt-1 text-yellow-300">✓</div>
                            <p className="ml-1 text-white">Special member-only discounts and offers</p>
                        </div>
                        <div className="flex items-center">
                            <div className="flex-shrink-0 w-6 h-6 mt-1 text-yellow-300">✓</div>
                            <p className="ml-1 text-white">Track your wishlist and previous orders</p>
                        </div>
                    </div>
                    
                    <div className="mt-6 flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                        <button 
                            className={`px-6 py-3 rounded-full bg-yellow-400 text-indigo-600 font-bold shadow-lg transition-all duration-300 cursor-pointer ${isHovered ? 'scale-105' : ''}`}
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                            onClick={() => setOpenRegisterModal(true)}
                        >
                            SIGN UP NOW
                        </button>
                        
                        <button onClick={() => setOpenLoginModal(true)} className="cursor-pointer px-6 py-3 rounded-full bg-transparent border-2 border-white text-white font-medium transition-colors hover:bg-white hover:text-indigo-600">
                            LOG IN
                        </button>
                    </div>
                    
                    <div className='flex mt-6 items-center'>
                        <PackageOpen className='text-white h-5 w-5' />
                        <p className="text-sm text-white ml-2">100+ orders</p>
                        <div className='h-5 w-0.5 mx-4 bg-white'></div>
                        <Star className='text-white h-5 w-5' />
                        <p className="text-sm text-white ml-2">50+ five-star reviews</p>
                        <div className='h-5 w-0.5 mx-4 bg-white'></div>
                        <ToyBrick className='text-white h-5 w-5' />
                        <p className="text-sm text-white ml-2">200+ products</p>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
};

export default SignInPromo;

// Need to add this CSS somewhere in your global styles
const globalStyles = `
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
}
`;