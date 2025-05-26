import Footer from "../front_page/Footer"
import Navbar from "../front_page/Navbar"
import Logo from '../assets/logo.png'
import { Star, Clock, Gift, Truck, CreditCard, PiggyBank,  } from 'lucide-react'
import CountdownPromotion from "./CountdownPromotion"


const AboutPage = () => {
  // Customer testimonials
  const testimonials = [
    {
      content: "The custom Marvel figure I ordered exceeded my expectations. The attention to detail is incredible!",
      author: "Michael T.",
      rating: 5
    },
    {
      content: "Fast shipping and the Disney figures look even better in person. Will definitely order again!",
      author: "Sarah L.",
      rating: 5
    },
    {
      content: "My son loves his Sonic figure. Great quality and excellent customer service.",
      author: "David K.",
      rating: 4
    }
  ]

  const features = [
    {
      icon: <Gift className="h-8 w-8 text-indigo-600" />,
      title: "Regular Promotions",
      description: "Enjoy exclusive deals and special offers on your favourite figures."
    },
    {
      icon: <Clock className="h-8 w-8 text-indigo-600" />,
      title: "24-Hour Support",
      description: "Our dedicated team is always available to answer your questions and provide assistance."
    },
    {
      icon: <Truck className="h-8 w-8 text-indigo-600" />,
      title: "Fast Shipping",
      description: "Quick delivery in the UK using Royal Mail with secure packaging for your collectibles."
    },
    {
      icon: <CreditCard className="h-8 w-8 text-indigo-600" />,
      title: "Secure Payment",
      description: "Multiple payment options (via Stripe) with advanced security to protect your information."
    },
    {
      icon: <PiggyBank className="h-8 w-8 text-indigo-600" />,
      title: "Product Range",
      description: "Choose from over 100 products from over 10 categories."
    },
    {
      icon: <Star className="h-8 w-8 text-indigo-600" />,
      title: "Quality Guarantee",
      description: "Every figure is thoroughly inspected to ensure the highest quality standards."
    }
  ]

  return (
    <>
      <Navbar />

      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="py-16 px-4 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <div>
              <p className="font-bold text-indigo-600 text-xs sm:text-sm tracking-widest mb-2 sm:mb-3">WHO WE ARE</p>
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">About Us</h2>
              </div>
            <div className="mt-8">
              <p className="text-gray-600 mb-6 text-lg">
                Welcome to our custom figure store! We specialize in unique, hand-crafted figures
                from your favorite universes — Disney, Marvel, Squid Game, Sonic, and more.  
                Every piece is carefully selected and perfect for dedicated collectors or as thoughtful gifts.
              </p>
              <p className="text-gray-600 mb-6 text-lg">
                Founded in 2024, our mission is to bring affordable, high-quality custom figures
                to fans around the world. What started as a passion project has quickly grown into a
                global community of collectors and enthusiasts.
              </p>
              <p className="text-gray-600 text-lg">
                We pride ourselves on exceptional craftsmanship, attention to detail, and outstanding
                customer service. Each figure in our collection is chosen to bring joy and nostalgia
                to our customers.
              </p>
            </div>
          </div>
          <div className="flex justify-center">
            <img src={Logo} alt="Logo" className="w-100 h-auto rounded-lg border border-gray-200" />
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-gray-50 py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:max-w-none">
              <div className="text-center space-y-4">
              <p className="font-bold text-indigo-600 text-xs sm:text-sm tracking-widest mb-2 sm:mb-3">ACHIEVEMENTS</p>
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Trusted by our customers</h2>
                <p className="text-lg leading-8 text-gray-600">Quality products with exceptional customer service</p>
              </div>
              <dl className="mt-16 grid grid-cols-1 gap-0.5 overflow-hidden rounded-2xl text-center sm:grid-cols-2 lg:grid-cols-4">
                <div className="flex flex-col bg-indigo-600 p-8">
                  <dt className="text-sm font-semibold leading-6 text-white">orders in our first month</dt>
                  <dd className="order-first text-3xl font-semibold tracking-tight text-white">10+</dd>
                </div>
                <div className="flex flex-col bg-indigo-600 p-8">
                  <dt className="text-sm font-semibold leading-6 text-white">products to choose from</dt>
                  <dd className="order-first text-3xl font-semibold tracking-tight text-white">50+</dd>
                </div>
                <div className="flex flex-col bg-indigo-600 p-8">
                  <dt className="text-sm font-semibold leading-6 text-white">5 star reviews</dt>
                  <dd className="order-first text-3xl font-semibold tracking-tight text-white">10+</dd>
                </div>
                <div className="flex flex-col bg-indigo-600 p-8">
                  <dt className="text-sm font-semibold leading-6 text-white">new collection coming soon...</dt>
                  <dd className="order-first text-3xl font-semibold tracking-tight text-white">1</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-2xl text-center mb-16">
              <p className="font-bold text-indigo-600 text-xs sm:text-sm tracking-widest mb-2 sm:mb-3">TESTIMONIALS</p>
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                What Our Customers Say
              </h2>
              <p className="mt-6 text-lg text-gray-600">
                Don't just take our word for it - here's what collectors think about our figures.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="bg-gray-50 p-8 rounded-lg border border-gray-200">
                  <div className="flex mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} size={20} fill="#ffd700" color="#ffd700" />
                    ))}
                  </div>
                  <p className="text-gray-700 italic mb-6 text-lg">"{testimonial.content}"</p>
                  <p className="text-gray-900 font-medium">{testimonial.author}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <CountdownPromotion />
  
    
        <div className="py-24 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-2xl text-center mb-16">
              <p className="font-bold text-indigo-600 text-xs sm:text-sm tracking-widest mb-2 sm:mb-3">FEATURES</p>
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Why Choose Us
              </h2>
              <p className="mt-6 text-lg text-gray-600">
                We're committed to providing the best experience for collectors and figure enthusiasts.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
              {features.map((feature, index) => (
                <div key={index} className="flex flex-col items-start">
                  <div className="rounded-md bg-indigo-50 p-3 mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>



        {/* eBay Shop Section */}
        <div className="bg-indigo-600 py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <p className="font-bold text-indigo-200 text-xs sm:text-sm tracking-widest mb-2 sm:mb-3">SHOP NOW</p>
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Visit Our eBay Store
            </h2>
            <p className="mt-6 text-lg text-indigo-100 max-w-2xl mx-auto">
              Can't find what you're looking for? Check out our eBay shop for exclusive figures and special deals!
            </p>
            <div className="mt-10">
              <a
                href="https://www.ebay.com/usr/yourstore" 
                target="_blank" 
                rel="noopener noreferrer"
                className="rounded-md bg-white px-8 py-4 text-lg font-semibold text-indigo-600 shadow-md hover:bg-indigo-50 transition-colors"
              >
                Shop on eBay
              </a>
            </div>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <p className="font-bold text-indigo-600 text-xs sm:text-sm tracking-widest mb-2 sm:mb-3">GET IN TOUCH</p>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Have Questions?
            </h2>
            <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
              We're here to help! Whether you're looking for a specific figure or have questions about shipping, our team is ready to assist.
            </p>
            <div className="mt-10">
              <a
                href="/contact" 
                className="rounded-md bg-indigo-600 px-8 py-4 text-lg font-semibold text-white shadow-md hover:bg-indigo-700 transition-colors"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}

export default AboutPage