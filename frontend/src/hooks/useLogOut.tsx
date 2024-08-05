import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";


const useLogOut = () =>{

    const [loading, setLoading] = useState(false);
    const {setAuthUser} = useAuthContext();


    const logout = async () =>{

        try{

            setLoading(true)
            console.log("BEFORE RES");
            const res = await fetch("api/auth/logout");
            console.log("THIS IS RES", res);
            const data = await res.json();
            console.log("DATA", data);
    

            if(!res.ok){
                throw new Error(data.error);
            }

            setAuthUser(null)

        }catch(error:any){
            console.log("THIS ERROR IS HIT");
            // toast.error(error.message)
            console.error(error)
        }finally{
            setLoading(false)
        }


    }


    return {loading, logout}


}

export default useLogOut