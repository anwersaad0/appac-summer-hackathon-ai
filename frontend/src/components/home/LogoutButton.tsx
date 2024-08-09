import { ReactEventHandler } from "react";
import { BiLogOut } from "react-icons/bi";
import useLogOut from "../../hooks/useLogOut";

const LogoutButton = () =>{

    const {logout} = useLogOut();

    const handleLogOut = () =>{
        logout();
    }

    return(
        <div className="mt-auto">
            <BiLogOut className="w-6 h-6 text-white cursor-pointer" onClick={handleLogOut} />
        </div>
    )
}

export default LogoutButton;