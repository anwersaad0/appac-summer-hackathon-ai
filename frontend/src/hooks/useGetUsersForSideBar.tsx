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
                const res = await fetch(`/api/users/`);
                const data = await res.json();
                //  If there's a problem, we throw an error to the catch block
                const arr: any = [];
                if(!res.ok){
                    console.log("INSIDE RES.OK", data)
                    throw new Error(data.error)
                }

                console.log("USERS.DATA", data.users);
                for(let i = 0; i < data.users.length; i++){
                    let user = data.users[i];
                    console.log(`THIS IS USER ${i}: ${user}`);

                    let conversation: ConversationType = {
                      id: user.id,
                      username: user.username,
                      profilePic: user.profilePic,
                    };

                    if(authUser?.id !== user.id){
                        arr.push(conversation)
                    }

                }
                await setConversations(arr);


                console.log("THIS IS THE CONVERSATIONS VARIABLE", conversations);

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