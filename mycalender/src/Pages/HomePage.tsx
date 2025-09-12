import React from "react";
import { useAuth } from "../Context/useAuth";
import NavBar from "../Components/NavBar";
import HomeComponents from "../Components/HomeComponents";

type Props = {}

const HomePage = (props: Props) => {
    return (
        <div>
            <NavBar/>
            <HomeComponents/>
        </div>
    )
}

export default HomePage;