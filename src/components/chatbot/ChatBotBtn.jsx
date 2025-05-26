import { useState } from 'react';
import { Bot, BotOff } from 'lucide-react';
import ChatBotModal from './ChatBotModal';
const ChatBotBtn = () => {
    const [open, setOpen] = useState(false)

    const handleClick = () => {
        setOpen(!open)
    }

    return (

        <>
        <div onClick={() => handleClick()} className='fixed right-4 bottom-4 rounded-md p-3 bg-indigo-600 hover:bg-indigo-700 cursor-pointer z-50'>
            {open ? <BotOff className='text-white' /> : <Bot className='text-white' />}
        </div>
        
        {open && (
            <ChatBotModal isOpen={open} setIsOpen={setOpen} />
        )}
        </>
    )
}

export default ChatBotBtn