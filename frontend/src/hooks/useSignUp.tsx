import { useState } from "react";
import {useAuthContext} from '../context/AuthContext';
import toast from "react-hot-toast";

type SignUpInputs = {
    username: string;
    // email: string;
    password: string;
    prefLang: string;
}

const useSignUp = ( ) => {

  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const signup = async (inputs: SignUpInputs) => {
    try {

      console.log("useSignUpInputs", inputs);
      setLoading(true);
      const success = handleInputErrors(inputs);
      console.log("success", success);
      if(!success) return;

      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputs),
      });
      console.log("useSignUp RES", res);
      const data = await res.json();

      if (!res.ok) throw new Error(data.error);

      setAuthUser(data);

    } catch (error: any) {
      toast.error(error.message);
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, signup };
};

function handleInputErrors({username, /*email,*/ password, prefLang}:SignUpInputs):boolean{

    if(!username || /*!email ||*/ !password || !prefLang){
        toast.error("Please make sure to fill all the fields");
        return false;
    }

    if (password.length < 8) {
      toast.error("Password must be at least 6 characters long");
      return false;
    }

    if (username.length < 8) {
      toast.error("Username must have at least 8 characters");
      return false;
    }

    return true
}
export default useSignUp;