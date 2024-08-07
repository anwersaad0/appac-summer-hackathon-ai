import { useState } from "react";
import { BsSend } from "react-icons/bs";
import useSendMessage from "../../hooks/useSendMessage";

const MessageInput = () =>{
    const [message, setMessage] = useState('');
    const {loading, sendMessage} = useSendMessage();

    const handleSubmit = async (e: React.FormEvent) =>{
        e.preventDefault();
        if(!message.trim()) return;

        await sendMessage(message);
        setMessage('')

    }

    return(
        <form className="px-4 my-3" onSubmit={handleSubmit}>
            <div className="w-full relative">
                <input type="text" className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 text-white" placeholder="Send a Message" 
                onChange={e => setMessage(e.target.value)}
                />
                <button type="submit" className="absolute inset-y-0 end-0 flex items-center pe-3 text-gray-300">
                    {loading ? (<span className="loading loading-spinner"/>) : (<BsSend className="w-6 h-6 text-white"/>)}
                </button>
            </div>
        </form>
    )
};

export default MessageInput;