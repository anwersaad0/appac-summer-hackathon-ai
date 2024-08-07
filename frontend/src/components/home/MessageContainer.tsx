import { useAuthContext } from "../../context/AuthContext";
import useConversation from "../../store/useConversation";
import MessageInput from "../messages/MessageInput";
import Messages from "../messages/Messages";
import { MessageCircle } from "lucide-react";

const MessageContainer = () => {
  
  const { selectedConversation } = useConversation();


  return (
    <div className="md:min-w-[450px] flex flex-col">
      {!selectedConversation ? (
        <NoChatSelected />
      ) : (
        <>
          <div className="bg-orange-500 px-4 py-2 mb-2">
            <span className="label-text">To:</span>{" "}
            <span className="text-gray-50 font-bold">{selectedConversation.username}</span>
          </div>

          <Messages />
          <MessageInput />
        </>
      )}
    </div>
  );
};

export default MessageContainer;

const NoChatSelected = () => {

  const {authUser} = useAuthContext();


  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2">
        <p>Welcome 👋🏼, {authUser?.username}!!!🌤️</p>
        <p>Select a chat to start messaging 👾</p>
        <MessageCircle className="text-3xl md:text-6xl text-center" />
      </div>
    </div>
  );
};
