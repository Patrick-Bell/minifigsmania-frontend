import { useState, useEffect } from 'react';
import { Calendar, Gift } from 'lucide-react';

const CountdownPromotion = () => {
  // Set the promotion end date (1 week from now for example)
  const [timeRemaining, setTimeRemaining] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  // Calculate end date (7 days from now)
  const endDate = new Date();
  endDate.setDate(endDate.getDate() + 7);
  
  useEffect(() => {
    const calculateTimeRemaining = () => {
      const now = new Date();
      const difference = endDate - now;
      
      if (difference <= 0) {
        // Promotion has ended
        setTimeRemaining({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);
      
      setTimeRemaining({ days, hours, minutes, seconds });
    };
    
    // Initial calculation
    calculateTimeRemaining();
    
    // Update the countdown every second
    const timer = setInterval(calculateTimeRemaining, 1000);
    
    // Clean up the interval on component unmount
    return () => clearInterval(timer);
  }, []);
  
  return (
    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <div className="flex justify-center items-center mb-4">
            <Gift className="h-12 w-12 text-white mr-3" />
            <h2 className="text-3xl font-bold text-white">Marvel Collection Launch</h2>
          </div>
          <p className="text-xl text-indigo-100 mb-8">
            Our new exclusive Marvel figures are coming soon! Pre-order now for 20% off.
          </p>
          
          <div className="flex justify-center gap-4 mb-8">
            <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-lg p-4 w-24 text-center">
              <div className="text-4xl font-bold">{timeRemaining.days}</div>
              <div className="text-xs uppercase tracking-wide text-indigo-600">Days</div>
            </div>
            <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-lg p-4 w-24 text-center">
              <div className="text-4xl font-bold">{timeRemaining.hours}</div>
              <div className="text-xs uppercase tracking-wide text-indigo-600">Hours</div>
            </div>
            <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-lg p-4 w-24 text-center">
              <div className="text-4xl font-bold">{timeRemaining.minutes}</div>
              <div className="text-xs uppercase tracking-wide text-indigo-600">Minutes</div>
            </div>
            <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-lg p-4 w-24 text-center">
              <div className="text-4xl font-bold">{timeRemaining.seconds}</div>
              <div className="text-xs uppercase tracking-wide text-indigo-600">Seconds</div>
            </div>
          </div>
          
          <div className="flex justify-center">
            <button className="px-8 py-4 bg-white text-indigo-600 rounded-md font-semibold shadow-lg hover:bg-indigo-50 transition-colors">
              Pre-order Now
            </button>
          </div>
          
          <div className="mt-6 flex justify-center items-center text-indigo-100">
            <Calendar className="h-5 w-5 mr-2" />
            <span>Launching {endDate.toLocaleDateString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountdownPromotion;