import { useState } from "react";
import {useAuthContext} from '../context/AuthContext';

type SignUpInputs = {
    username: string;
    email: string;
    password: string;
    prefLang: string;
}

const useSignUp = () =>{
    const [loading, setLoading] = useState(false);
    const {setAuthUser} = useAuthContext();


    const signup = async(inputs:SignUpInputs) =>{

        try{
            setLoading(true);
            const res = await fetch("SIGNUP", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(inputs),
            });

            const data = await res.json();

            if(!res.ok) throw new Error(data.error)
            setAuthUser(data);

        }catch(error: any){

            console.error(error.message);

        }finally{
            setLoading(false)
        }
    };


    return {loading, signup}
};

export default useSignUp;