import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState, } from 'react';
import toast from 'react-hot-toast';

// We create the Type here so we TS knows what to expect for authUser
type AuthUserType = {
    id: string;
    username: string;
    email: string;
    password: string;
    prefLang: string;
    profilePic: string;
}

const AuthContext = createContext<{
    authUser: AuthUserType | null;
    setAuthUser: Dispatch<SetStateAction<AuthUserType | null>>;
    isLoading: boolean;
}>({
    authUser: null,
    setAuthUser: () => {},
    isLoading : true,
});


// We create the hook to use Context right here so we don't have to import AuthContext AND useContext in other files
export const useAuthContext = () => {
    return useContext(AuthContext)
}

// Now we configure the Provider
export const AuthContextProvider = ({children}:{children:ReactNode}) =>{

    const [authUser, setAuthUser] = useState<AuthUserType | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // We create this useEffect so when the App is loaded, the first thing it does is check if we are already logged in
    useEffect(()=>{
        const fetchAuthUser = async () =>{

            try{
                // we try to get the user: ourselves, and we parse it
                const res = await fetch(null);
                const data = await res.json();

                // if there is an error, we throw it so it falls in the catch
                if(!res.ok){
                    throw new Error(data.error);
                }

                // Otherwise, we set the AuthUser
                setAuthUser(data)

            }catch(error:any){
                toast.error(error)
                console.error(error);
            }finally{
                setIsLoading(false);
            }
        }

        fetchAuthUser();
    },[]);


    return(
        <AuthContext.Provider value={{authUser,isLoading, setAuthUser}}>
            {children}
        </AuthContext.Provider>
    )
    
}