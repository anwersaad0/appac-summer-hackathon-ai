import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";


const useLogin = () =>{

    const [loading, setLoading] = useState(false);

    const {setAuthUser} = useAuthContext();

    const login = async (username: string, password: string) =>{

        try{

            setLoading(true)

            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type" : "application/json",
                },
                body: JSON.stringify({username, password})
        })

        const data = await res.json();
        if(!res.ok){
            throw new Error(data.error);
        }

        setAuthUser(data);

    }catch(error:any){
        console.error(error.message)
        // toast.error(error)

    }finally{
        setLoading(false)
    }

    }

    return {login, loading}
}


export default useLogin;