import { useAuthContext } from "../../context/AuthContext";
import useConversation from "../../store/useConversation";

const Message =({message}:{message:any}) =>{

    const {authUser} = useAuthContext();
    const {selectedConversation} = useConversation();


    const fromMe = message?.user_id === authUser?.id;
    const img = fromMe ? authUser?.profilePic : selectedConversation?.profilePic;
    const chatClass = fromMe ? "chat-end" : "chat-start";
    const bubbleBg = fromMe ? "bg-blue-500" : "";

    

    return (
      <div className={`chat ${chatClass}`}>
        {/* Avatar image */}
        <div className="hidden md:block *:chat-image-avatar">
          <div className="w-6 md:w-10 rounded-full">
            <img
              alt="Tailwind CSS chat bubble component"
              src={
                img || `https://avatar.iran.liara.run/public/${selectedConversation?.id}`
              }
            />
          </div>
        </div>

        {/* Message */}
        <p className={`chat-bubble text-white ${bubbleBg}`}>{message.body}</p>
        <span className="chat-footer opacity-50 text-xs flex gap-1 items-center text-gray-300">
          12:30
        </span>
        <span>From me: {`${fromMe}`}</span>
      </div>
    );
}

export default Message;