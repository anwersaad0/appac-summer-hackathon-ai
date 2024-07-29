const Message =() =>{

    return(
        <div className="chat chat-end">

            {/* Avatar image */}
            <div className="chat-image-avatar">
                <div className="w-10 rounded-full">
                    <img alt="Tailwind CSS chat bubble component" src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                </div>
            </div>

            {/* Message */}
            <div className="chat-bubble text-white bg-blue-500">Hi, What's up?</div>
            <div className="chat-footer opacity-50 text-xs flex gap-1 items-center text-gray-300">12:30</div>
        </div>
    )
}

export default Message;