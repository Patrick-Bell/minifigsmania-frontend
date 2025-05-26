import { useState } from 'react'
import { 
    MessageCircle, 
    ArrowRight, 
    X, 
    Send,
    Package,
    Search,
    HelpCircle,
    Phone
} from 'lucide-react';
import FindProductComponent from './FindProductComponent';
import TrackOrderComponent from './TrackOrderComponent';
import GetHelpComponent from './GetHelpComponent';
import { useAuth } from '../context/AuthContext';



const ChatBotModal = ({ isOpen, setIsOpen }) => {
    const { user } = useAuth()
    const [selectedOption, setSelectedOption] = useState(null);
    const [chatHistory, setChatHistory] = useState([]);
    const [userInput, setUserInput] = useState('');

    const options = [
        { 
            name: 'Track Order', 
            description: 'Check the status of your recent purchase',
            action: () => handleOptionSelect('Track Order'),
            icon: Package
        },
        { 
            name: 'Find Product', 
            description: 'Browse our product catalog',
            action: () => handleOptionSelect('Find Product'),
            icon: Search
        },
        { 
            name: 'Get Help', 
            description: 'Troubleshooting and support resources',
            action: () => handleOptionSelect('Get Help'),
            icon: HelpCircle
        },
    ];

    const handleOptionSelect = (option) => {
        setSelectedOption(option);
        
        // Add bot response to chat history
    };

    const handleSendMessage = () => {
        if (userInput.trim()) {
            // Add user message to chat history
            setChatHistory(prev => [
                ...prev,
                { type: 'user', text: userInput }
            ]);
            // Clear input
            setUserInput('');
        }
    };

    const closeChat = () => {
        setIsOpen(false);
    };

    const resetChat = () => {
        setSelectedOption(null);
        setChatHistory([]);
    };

    // Render the correct component based on selected option
    const renderOptionComponent = () => {
        switch(selectedOption) {
            case 'Track Order':
                return <TrackOrderComponent setChatHistory={setChatHistory} />;
            case 'Find Product':
                return <FindProductComponent setChatHistory={setChatHistory} />;
            case 'Get Help':
                return <GetHelpComponent />;
            default:
                return null;
        }
    };

    if (!isOpen) return null;

    return (
        <div onClick={() => closeChat()} className="fixed inset-0 bg-neutral-800/30 duration-500 ease-in-out data-closed:opacity-0 flex justify-center items-start pt-10 z-80 transition-all">
             <div onClick={(e) => e.stopPropagation()} className="fixed z-70 bottom-0 left-0 right-0 md:bottom-20 md:right-12 md:left-auto md:w-full md:max-w-md px-0 md:px-0">
                <div className="bg-white w-full max-h-[90vh] md:max-h-[60vh] rounded-xl shadow-2xl flex flex-col overflow-hidden border border-gray-200">
                {/* Header */}
                <div className="bg-indigo-600 text-white p-4 flex justify-between items-center">
                    <div className="flex items-center">
                        <h2 className="text-lg font-semibold">MinifigBot</h2>
                        {selectedOption && (
                            <button 
                                onClick={resetChat}
                                className="ml-3 text-xs bg-indigo-500 hover:bg-indigo-400 px-2 py-1 rounded transition-colors cursor-pointer"
                            >
                                Back to menu
                            </button>
                        )}
                    </div>
                    <button 
                        onClick={closeChat}
                        className="hover:bg-indigo-700 rounded-full p-1 transition-colors cursor-pointer"
                        aria-label="Close chat"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Content Area */}
                <div className="flex-grow overflow-y-auto p-4">
                    {!selectedOption ? (
                        <div className="space-y-4">
                            <p className="text-gray-600 text-center">How can we help you today?</p>
                            {options.map((option) => (
                                <button
                                    key={option.name}
                                    onClick={option.action}
                                    className="w-full text-left p-4 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors group cursor-pointer"
                                >
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <div className="flex items-center space-x-3">
                                                <option.icon size={20} className="text-indigo-600" />
                                                <span className="font-semibold">{option.name}</span>
                                            </div>
                                            <p className="text-sm text-gray-500 mt-1">{option.description}</p>
                                        </div>
                                        <ArrowRight 
                                            size={20} 
                                            className="text-gray-400 group-hover:translate-x-1 transition-transform" 
                                        />
                                    </div>
                                </button>
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col h-full">
                            {/* Option-specific component */}
                            {renderOptionComponent()}
                            
                            {/* Chat History */}
                            {chatHistory.length > 0 && (
                                <div className="flex-grow overflow-y-auto space-y-3 my-4 pr-2">
                                    {chatHistory.map((message, index) => (
                                        <div 
                                            key={index} 
                                            className={`flex text-sm ${
                                                message.type === 'user' 
                                                ? 'justify-end' 
                                                : 'justify-start'
                                            }`}
                                        >
                                            <div 
                                                className={`max-w-[80%] text-sm p-3 rounded-lg ${
                                                    message.type === 'user' 
                                                    ? 'bg-indigo-100 text-indigo-800' 
                                                    : 'bg-gray-100 text-gray-800'
                                                }`}
                                            >
                                                {message.text}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </div>
                
                {/* Message Input - Only show when an option is selected */}
                
            </div>
        </div>
        </div>
    );
};

export default ChatBotModal;