import Conversation from "./Conversation";
import {DUMMY_CONVERSATIONS} from "../../dummy_data/dummy";
import useGetUsersForSideBar from "../../hooks/useGetUsersForSideBar";

const Conversations = () =>{


    // Here we are getting the conversations from out hooks, right now we do not have them
    const {conversations, loading} = useGetUsersForSideBar();
    
    console.log("CONVERSATIONS in conversations", conversations);
    return(
        <div className="py-2 flex flex-col overflow-auto">
            {conversations.map((conversation: any) =>(
                <Conversation key={conversation.id} conversation={conversation} />
            ))}
            {loading ? (
                <span className="loading loading-spinner mx-auto" />
            ) : null}
        </div>
    );
};

export default Conversations;