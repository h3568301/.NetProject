import { createBrowserRouter } from "react-router";
import App from "../App";
import LoginPage from "../Pages/LoginPage";
import RegisterPage from "../Pages/RegisterPage";
import HomePage from "../Pages/HomePage";
import ProtectedRoute from "./ProtectedRoute";
import EventPage from "../Pages/EventPage";
import CreateEvenetPage from "../Pages/CreateEvenetPage";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children: [
            {path: "home", element:<ProtectedRoute><HomePage/></ProtectedRoute>},
            {path: "login", element:<LoginPage/>},
            {path: "register", element: <RegisterPage/>},
            {path: "event", element: <EventPage/>},
            {path: "createEvent", element: <CreateEvenetPage/>},
        ]
    }
]);