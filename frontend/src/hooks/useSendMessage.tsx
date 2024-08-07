import toast from "react-hot-toast";
import useConversation from "../store/useConversation";
import { useState } from "react";

const useSendMessage = () =>{

    const [loading, setLoading] = useState(false);
    const {messages, setMessages, selectedConversation} = useConversation();

    const sendMessage = async(message: string) =>{
        
        if(!selectedConversation) return;

        try {
            setLoading(true)
            const res = await fetch(`/api/convos/${conversationId}/message/new`, {
                method: "POST",
                headers: {
                    "Content-Type" : "application/json",
                },
                body: JSON.stringify({message})
            });

            const data = await res.json();

            if(!res.ok){
                throw new Error(data.error)
            }
            setMessages([...messages, data])

        } catch (error: any) {
          toast.error(error.message);
          console.error(error.message);
        }finally{
            setLoading(false)
        }
    }


    return{loading, sendMessage}



}


export default useSendMessage;