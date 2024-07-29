import Conversation from "./Conversation";
import {DUMMY_CONVERSATIONS} from "../../dummy_data/dummy";

const Conversations = () =>{

    return(
        <div className="py-2 flex flex-col overflow-auto">
            {DUMMY_CONVERSATIONS.map((conversation: any) =>(
                <Conversation key={conversation.id} conversation={conversation} />
            ))}
        </div>
    );
};

export default Conversations;