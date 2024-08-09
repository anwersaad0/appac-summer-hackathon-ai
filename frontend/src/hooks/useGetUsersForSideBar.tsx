import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

// type ConversationType = {
//     id: string;
//     username: string;
//     profilePic: string;
// }

const useGetUsersForSideBar = () =>{

    const [loading, setLoading ] = useState(false);
    const [conversations, setConversations] = useState<ConversationType[]>([]);
    const {authUser} = useAuthContext();

    // This useEffect will run once whenever the component is loaded
    useEffect(() =>{

        const getUsers = async () =>{

            try{
                setLoading(true);
                // We try to get all the users
                const res = await fetch(`/api/messages/conversations`);
                const data = await res.json();
                //  If there's a problem, we throw an error to the catch block

                if(!res.ok){
                    console.log("INSIDE RES.OK", data)
                    throw new Error(data.error)
                }
                
                setConversations(data);


            }catch(error:any){
                // toast displays the error on the UI
                toast.error(error.message)
                // we also display the error on the console
                console.error("ERROR", error.message);
            }finally{
                setLoading(false);
            }
        };

        // We then call the function
        getUsers();

    },[]);

    return {loading, conversations}


}


export default useGetUsersForSideBar;