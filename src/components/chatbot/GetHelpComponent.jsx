const GetHelpComponent = () => {
    const helpLinks = [
      { title: "Shipping & Delivery", url: "/shipping" },
      { title: "Returns & Refunds", url: "/refund" },
      { title: "Payment Methods", url: "/payment-types" },
      { title: "FAQs", url: "/frequently-asked-questions" },
      { title: "Contact Us", url: "/contact" },
      { title: "Privacy Policy", url: "/privacy-policy" },
      { title: 'Cookie Policy', url: '/cookies-policy' },
      { title: 'About Us', url: '/about' },
      { title: "View Products", url: "/products" },
      { title: "View Cart", url: "/cart" },
    ];
    
    return (
      <div className="space-y-4">
        <div>
        <h3 className="text-xl font-semibold text-gray-800">Get Help</h3>
        <p className="text-sm text-gray-500">Find links to popular queries.</p>
      </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {helpLinks.map((link, index) => (
            <a 
              key={index}
              href={link.url}
              target="_blank"
              className="block p-3 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors text-indigo-600 hover:text-indigo-800"
            >
              {link.title}
            </a>
          ))}
        </div>
      </div>
    );
  };

  export default GetHelpComponent;