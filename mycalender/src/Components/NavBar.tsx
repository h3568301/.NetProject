import React from "react";
import { useAuth } from "../Context/useAuth";
import { Link } from "react-router-dom";
type Props = {

}

const NavBar = (props: Props) => {
    const {isLoggedIn, user, logout} = useAuth();
    return (
        <nav className="flex justify-between items-center fixed top-0 z-50 w-full h-16 bg-white border-b border-gray-200 px-6 shadow-lg">
            <Link className="text-2xl font-bold text-blue-600" to={"/home"}>
                Personal Calendar
            </Link>
            
            <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-medium">
                            {user?.userName?.charAt(0).toUpperCase()}
                        </span>
                    </div>
                    <Link className="text-gray-700 font-medium" to={"/home"}>
                        {user?.userName}
                    </Link>
                </div>
                
                <button 
                    onClick={logout} 
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors duration-200"
                >
                    Logout
                </button>
            </div>
        </nav>
    )
}

export default NavBar;