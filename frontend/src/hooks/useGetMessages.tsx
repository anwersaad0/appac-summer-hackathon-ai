import { useEffect, useState } from "react";
import useConversation from "../store/useConversation";
import toast from "react-hot-toast";


const useGetMessages = () =>{

    const [loading, setLoading] = useState(false);
    const {messages, setMessages, selectedConversation} = useConversation();

    useEffect(() =>{

        const getMessages = async () => {
          // If no conversation has been selected, we do not get the messages
          if (!selectedConversation) return;

          try {
            setLoading(true);
            // We cleared the messages
            setMessages([]);
            // We try to get the messages
            const res = await fetch(`api/convos/`);
            // console.log(`THIS IS THE RES FROM USEGETMESSAGES`,res);
            const data = await res.json();

            // console.log(`THIS IS THE DATA FROM USEGETMESSAGES`, data);
            if (!res.ok) {
              throw new Error(data.error);
            }
            // If there are no errors, we set the messages in our store
            setMessages(data);

          } catch (error: any) {
            console.error(error.message);
            toast.error(error.message);
          } finally {
            setLoading(false);
          }
        };

        getMessages();


    },[selectedConversation])

    return {loading, messages}

}

export default useGetMessages;