import { useState } from 'react';
import { Bot, BotOff, HelpCircle } from 'lucide-react';
import FeedbackModal from './FeedbackModal';
const FeedbackBtn = () => {
    const [open, setOpen] = useState(false)

    const handleClick = () => {
        setOpen(!open)
    }

    return (

        <>
        <div onClick={() => handleClick()} className='fixed left-4 bottom-4 rounded-md p-3 bg-indigo-600 hover:bg-indigo-700 cursor-pointer z-40'>
            <HelpCircle className='text-white'/>
        </div>
        
        {open && (
            <FeedbackModal isOpen={open} setIsOpen={setOpen} />
        )}
        </>
    )
}

export default FeedbackBtn