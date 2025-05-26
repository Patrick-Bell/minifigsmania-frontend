import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css'; // Import Swiper's styles
import 'swiper/css/navigation'; // Import Swiper's navigation styles
import 'swiper/css/pagination'; // If you're using pagination
import { Autoplay } from "swiper/modules"; // Import necessary Swiper modules
import { categories } from "../api/Categories";

const FeaturedCategories = () => {

  return (
    <div className="w-auto m-8 mb-16">
    <div> {/* Ensure the section takes full width */}
      <div className=""> {/* Remove horizontal padding to ensure full width */}
        {/* Title and custom navigation arrows */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Featured Categories</h2>
          <p onClick={() => window.open('/products', '_blank')} className='cursor-pointer font-bold flex'>View all
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 ml-2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
          </svg>
          </p>
        </div>

        {/* Swiper setup */}
        <Swiper
          style={{ width: '100%' }} // Ensure Swiper takes full width
          modules={[Autoplay]} // Adding necessary modules
          autoplay={{ delay: 3000 }} // Auto slide every 3 seconds
          slidesPerView={3} // Display 3 slides at a time (you can adjust)
          loop={true} // Infinite loop of slides
          spaceBetween={20} // Add space between the slides
          breakpoints={{
            480: {
              slidesPerView: 2, // For small screens
            },
            768: {
              slidesPerView: 3, // For medium screens
            },
            1024: {
              slidesPerView: 6, // For large screens
            }
          }}
          className="swiper-container w-full" // Make sure swiper is full width
        >
          {categories.map((category, index) => (
            <SwiperSlide key={index}>
              <div onClick={() => window.open(`/products?category=${category.link}`)} className="flex flex-col items-center border border-gray-100 ml-2 hover:border-indigo-300 transition-all rounded-md cursor-pointer">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-32 h-32 object-cover rounded-lg"
                />
                <p className="text-sm font-medium">{category.name}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
    </div>
  );
};

export default FeaturedCategories;
