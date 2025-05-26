import React, { useState } from "react";
import { Search, ChevronDown, ChevronRight, ShoppingBag, CreditCard, Truck, Tag, Package, RefreshCw, Phone, Mail, MessageSquare, Contact } from "lucide-react";
import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline";

const HelpCenter = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedCategory, setExpandedCategory] = useState("orders");
  const [expandedQuestion, setExpandedQuestion] = useState(null);

  // FAQ categories and questions
  const faqCategories = [
    {
      id: "orders",
      title: "Orders & Shipping",
      icon: <ShoppingBag className="w-5 h-5" />,
      questions: [
        {
          id: "order-status",
          question: "How do I track my order?",
          answer: "You can track your order by logging into your account and navigating to the 'Orders' section. There you'll find a list of all your orders with their current status and tracking information when available. Alternatively, you can use the tracking number provided in your shipping confirmation email."
        },
        {
          id: "order-cancel",
          question: "Can I cancel my order?",
          answer: "Orders can be cancelled within 1 hour of placement. To cancel an order, go to the 'Orders' section in your account and select the order you wish to cancel. If the cancel button is not available, it means your order is already being processed and cannot be cancelled. In this case, you'll need to wait for delivery and then initiate a return."
        },
        {
          id: "shipping-time",
          question: "How long does shipping take?",
          answer: "Standard shipping typically takes 3-5 business days within the continental US. Express shipping delivers within 2 business days. International shipping can take 7-14 business days depending on the destination country and customs processing."
        }
      ]
    },
    {
      id: "payments",
      title: "Payments & Billing",
      icon: <CreditCard className="w-5 h-5" />,
      questions: [
        {
          id: "payment-methods",
          question: "What payment methods do you accept?",
          answer: "We accept all major credit cards (Visa, Mastercard, American Express, Discover), PayPal, Apple Pay, and Google Pay. We also offer buy-now-pay-later options through Affirm and Klarna on eligible purchases."
        },
        {
          id: "charge-timing",
          question: "When will my card be charged?",
          answer: "Your card will be authorized when you place your order, but you won't be charged until your order ships. For pre-order items, you'll be charged when the item is ready to ship, not at the time of placing the order."
        }
      ]
    },
    {
      id: "returns",
      title: "Returns & Refunds",
      icon: <RefreshCw className="w-5 h-5" />,
      questions: [
        {
          id: "return-policy",
          question: "What is your return policy?",
          answer: "We offer a 30-day return policy for most items. Products must be in their original condition and packaging. Some items like personalized products or final sale items cannot be returned. To initiate a return, go to the 'Orders' section in your account and select 'Return' for the appropriate item."
        },
        {
          id: "refund-timing",
          question: "How long do refunds take?",
          answer: "Once we receive your returned item, it takes 1-2 business days to process. After processing, refunds typically appear on your account within 5-7 business days, depending on your payment method and financial institution."
        }
      ]
    },
    {
      id: "products",
      title: "Products & Inventory",
      icon: <Package className="w-5 h-5" />,
      questions: [
        {
          id: "out-of-stock",
          question: "Can I order an out-of-stock item?",
          answer: "Yes, for many popular items you can place a backorder when they're out of stock. The product page will indicate if backorders are available and provide an estimated restock date. You won't be charged until the item ships."
        },
        {
          id: "product-warranty",
          question: "Do your products come with a warranty?",
          answer: "Many of our products come with a manufacturer's warranty. Warranty information is listed on the product page and included with your purchase. Our own brand products typically come with a 1-year warranty against defects in materials and workmanship."
        }
      ]
    },
    {
      id: "promotions",
      title: "Discounts & Promotions",
      icon: <Tag className="w-5 h-5" />,
      questions: [
        {
          id: "promo-code",
          question: "How do I use a promo code?",
          answer: "You can enter your promo code in the designated field during checkout, just before payment. After entering a valid code, you'll see the discount applied to your order immediately. Please note that some promo codes cannot be combined with other offers."
        },
        {
          id: "loyalty-program",
          question: "How does your loyalty program work?",
          answer: "Our loyalty program rewards you with points for every purchase. You earn 1 point for every $1 spent. Points can be redeemed for discounts on future purchases (100 points = $5 off). You also get special perks like free shipping, early access to sales, and a birthday discount."
        }
      ]
    }
  ];

  // Toggle FAQ category expansion
  const toggleCategory = (categoryId) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
    setExpandedQuestion(null); // Close any open question when changing categories
  };

  // Toggle FAQ question expansion
  const toggleQuestion = (questionId) => {
    setExpandedQuestion(expandedQuestion === questionId ? null : questionId);
  };

  // Filter questions based on search query
  const filteredQuestions = searchQuery.trim() ? 
    faqCategories.flatMap(category => 
      category.questions.filter(q => 
        q.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
        q.answer.toLowerCase().includes(searchQuery.toLowerCase())
      ).map(q => ({ ...q, category }))
    ) : [];

  return (
    <div className="bg-white rounded-xl border border-gray-200">
      {/* Help Center Header */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-t-xl p-8 text-white">
        <h2 className="text-2xl font-bold mb-2 text-center">How can we help you?</h2>
        <p className="text-indigo-100 mb-6 text-center">
          Find answers to frequently asked questions or get in touch with our support team
        </p>
        
        {/* Search Bar */}
        <div className="max-w-lg mx-auto relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-white" />
          </div>
          <input
            type="text"
            placeholder="Search for answers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="block w-full pl-10 pr-3 py-3 border border rounded-lg focus:outline-none focus:ring-2 focus:white focus:border-transparent"
          />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="p-6">
        {/* Search Results (if any) */}
        {searchQuery.trim() && (
          <div className="mb-8">
            <h3 className="text-lg font-bold text-gray-800 mb-4">
              {filteredQuestions.length} {filteredQuestions.length === 1 ? 'result' : 'results'} for "{searchQuery}"
            </h3>
            
            {filteredQuestions.length > 0 ? (
              <div className="space-y-3">
                {filteredQuestions.map((question) => (
                  <div key={question.id} className="border border-gray-200 rounded-lg overflow-hidden">
                    <button
                      className="w-full text-left px-4 py-3 flex justify-between items-center focus:outline-none bg-gray-50"
                      onClick={() => toggleQuestion(question.id)}
                    >
                      <span className="font-medium">{question.question}</span>
                      {expandedQuestion === question.id ? 
                        <ChevronDown className="w-5 h-5 text-gray-400" /> : 
                        <ChevronRight className="w-5 h-5 text-gray-400" />
                      }
                    </button>
                    
                    {expandedQuestion === question.id && (
                      <div className="px-4 py-3 bg-white">
                        <p className="text-gray-600">{question.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">No results found. Please try a different search term or browse our FAQ categories below.</p>
              </div>
            )}
          </div>
        )}

        {/* Quick Contact Options */}
        {!searchQuery.trim() && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-gray-50 p-5 rounded-lg text-center hover:bg-gray-100 transition">
              <div className="bg-indigo-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                <QuestionMarkCircleIcon className="h-5 w-5 text-indigo-600" />
              </div>
              <h4 className="font-bold text-gray-800 mb-1">Contact Us</h4>
              <p className="text-gray-600 text-sm mb-2">24/7 Support</p>
              <p className="font-medium text-indigo-600">Click here</p>
            </div>
            
            <div className="bg-gray-50 p-5 rounded-lg text-center hover:bg-gray-100 transition">
              <div className="bg-indigo-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                <Mail className="h-5 w-5 text-indigo-600" />
              </div>
              <h4 className="font-bold text-gray-800 mb-1">Email Support</h4>
              <p className="text-gray-600 text-sm mb-2">24/7 Response Time</p>
              <p className="font-medium text-indigo-600">support@example.com</p>
            </div>
            
            <div className="bg-gray-50 p-5 rounded-lg text-center hover:bg-gray-100 transition">
              <div className="bg-indigo-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                <MessageSquare className="h-5 w-5 text-indigo-600" />
              </div>
              <h4 className="font-bold text-gray-800 mb-1">Live Chat</h4>
              <p className="text-gray-600 text-sm mb-2">Available 24/7</p>
              <button className="font-medium text-indigo-600">Coming Soon...</button>
            </div>
          </div>
        )}

        {/* FAQ Categories */}
        <div>
          <h3 className="text-lg font-bold text-gray-800 mb-4">
            Frequently Asked Questions
          </h3>
          
          <div className="space-y-4">
            {faqCategories.map((category) => (
              <div key={category.id} className="border border-gray-200 rounded-lg overflow-hidden">
                <button
                  className={`w-full text-left px-4 py-3 flex justify-between items-center focus:outline-none cursor-pointer ${
                    expandedCategory === category.id ? "bg-indigo-50" : "bg-gray-50"
                  }`}
                  onClick={() => toggleCategory(category.id)}
                >
                  <div className="flex items-center">
                    <div className={`mr-3 ${expandedCategory === category.id ? "text-indigo-600" : "text-gray-500"}`}>
                      {category.icon}
                    </div>
                    <span className={`font-medium ${expandedCategory === category.id ? "text-indigo-600" : "text-gray-800"}`}>
                      {category.title}
                    </span>
                  </div>
                  {expandedCategory === category.id ? 
                    <ChevronDown className={`w-5 h-5 ${expandedCategory === category.id ? "text-indigo-600" : "text-gray-400"}`} /> : 
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  }
                </button>
                
                {expandedCategory === category.id && (
                  <div className="border-t border-gray-200">
                    {category.questions.map((question) => (
                      <div key={question.id} className="border-b border-gray-200 last:border-b-0">
                        <button
                          className="w-full text-left px-6 py-3 flex justify-between items-center focus:outline-none hover:bg-gray-50 cursor-pointer"
                          onClick={() => toggleQuestion(question.id)}
                        >
                          <span className="font-medium">{question.question}</span>
                          {expandedQuestion === question.id ? 
                            <ChevronDown className="w-5 h-5 text-gray-400" /> : 
                            <ChevronRight className="w-5 h-5 text-gray-400" />
                          }
                        </button>
                        
                        {expandedQuestion === question.id && (
                          <div className="px-6 py-3 bg-gray-50">
                            <p className="text-gray-600">{question.answer}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Still Need Help */}
        <div className="mt-10 bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
          <h3 className="text-lg font-bold text-gray-800 mb-2">Still Need Help?</h3>
          <p className="text-gray-600 mb-4">
            If you couldn't find the answer you're looking for, please reach out to our customer support team.
          </p>
          <div className="flex justify-center space-x-4">
            <a 
              href="/contact" 
              target="_blank"
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Contact Support
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpCenter;