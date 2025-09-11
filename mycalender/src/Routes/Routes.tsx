import { createBrowserRouter } from "react-router";
import App from "../App";
import LoginPage from "../Pages/LoginPage";
import RegisterPage from "../Pages/RegisterPage";
import HomePage from "../Pages/HomePage";
import ProtectedRoute from "./ProtectedRoute";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children: [
            {path: "home", element:<ProtectedRoute><HomePage/></ProtectedRoute>},
            {path: "login", element:<LoginPage/>},
            {path: "register", element: <RegisterPage/>}
        ]
    }
]);