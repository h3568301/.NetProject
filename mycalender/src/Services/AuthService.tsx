import axios from "axios";
import { UserProfileToken } from "../Models/User";
import { toast } from "react-toastify";

const api = "http://localhost:5070/api/"

export const loginAPI = async (username: string, password: string) => {
    try {
        const data = await axios.post<UserProfileToken>(api + "account/login", {
            userName: username,
            password: password,
        });
        return data; 
    } catch (error: any) {
        error.response.data[0].description ? toast.warning(error.response.data[0].description) : toast.warning("Please retry!");
    }
}

export const registerAPI = async (email:string, username: string, password: string) => {
    try {
        const data = await axios.post<UserProfileToken>(api + "account/register", {
            email: email,
            userName: username,
            password: password,
        });
        return data; 
    } catch (error: any) {
        if (error.response.data[0].description) {
            toast.warning(error.response.data[0].description);
        }
        error.response.data[0].description ? toast.warning(error.response.data[0].description) : toast.warning("Please retry!");
    }
} 