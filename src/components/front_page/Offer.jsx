import React, { useEffect, useState } from 'react';

const Offer = () => {
    const [animate, setAnimate] = useState(false);
    
    useEffect(() => {
        // Trigger animation after component mounts
        setAnimate(true);
        
        // Set up animation interval for continuous effect
        const interval = setInterval(() => {
            setAnimate(false);
            setTimeout(() => setAnimate(true), 100);
        }, 5000);
        
        return () => clearInterval(interval);
    }, []);
    
    // Generate random question marks for the background
    const questionMarks = Array(20).fill().map((_, i) => {
        const size = Math.floor(Math.random() * 30) + 10;
        const top = Math.floor(Math.random() * 100);
        const left = Math.floor(Math.random() * 100);
        const opacity = Math.random() * 0.3 + 0.1;
        const rotate = Math.floor(Math.random() * 360);
        
        return (
            <div 
                key={i} 
                className="absolute text-white pointer-events-none"
                style={{
                    top: `${top}%`,
                    left: `${left}%`,
                    opacity,
                    fontSize: `${size}px`,
                    transform: `rotate(${rotate}deg)`
                }}
            >
                ?
            </div>
        );
    });
    
    return (
        <div className="relative bg-gradient-to-r from-indigo-700 to-purple-700 text-white w-full h-48 flex flex-col items-center justify-center text-center overflow-hidden px-4 shadow-lg">
            {questionMarks}
            
            <div className={`z-10 transform ${animate ? 'scale-105' : 'scale-100'} transition-transform duration-300`}>
                <div className="flex items-center justify-center">
                    <span className="text-yellow-300 text-3xl mr-2">✦</span>
                    <h2 className="text-2xl font-bold uppercase tracking-wider">MYSTERY MINIFIGURE</h2>
                    <span className="text-yellow-300 text-3xl ml-2">✦</span>
                </div>
                
                <p className="mt-2 text-xl font-medium">
                    WHO WILL YOU DISCOVER FOR JUST <span className="text-yellow-300 font-bold">£2.49</span>?
                </p>
                
                <div className="mt-4 flex justify-center">
                    <a 
                        href="/products" 
                        className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-white p-1 text-indigo-600 shadow-md transition duration-300 ease-out hover:scale-105"
                    >
                        <span className="relative rounded-full bg-white px-8 py-2 text-base font-bold">
                            REVEAL YOURS NOW!
                        </span>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Offer;