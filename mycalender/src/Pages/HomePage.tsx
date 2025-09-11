import React from "react";
import { useAuth } from "../Context/useAuth";

type Props = {}

const HomePage = (props: Props) => {
    const {isLoggedIn, user, logout} = useAuth();

    return (<div>
        <div>Home</div>
        <div>
            <a onClick={logout}>
                Logout
            </a>
        </div>
    </div>)
}

export default HomePage;